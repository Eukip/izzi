import json

from django.contrib.auth import get_user_model
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import views
from rest_framework import generics, status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from drf_yasg.utils import swagger_auto_schema

from coupons.models import Coupon
from coupons.serializers import CouponSerializer
from .exceptions import (
    NotFoundUserPhoneException, MissingParameterInRequestBodyException,
    NotFoundUserException
)
from .models import PartnerCompany, PartnerNetwork, UserFavoriteCoupon
from .serializers import (
    TokenObtainPairWithoutRefreshSerializer,
    ChangePasswordSerializer, PartnerCompanyModelSerializer,
    UserProfileSerializer,
    ResetPasswordSerializer, PhoneAuthSerializer,
    LoginConfirmationCodeSerializer, ChageOldPhoneSerializer,
    ConfirmationNeweCodeSerializer, RecoveryPasswordSerializer,
    ConfirmOldPhoneSerializer,
)
from .service import (
    UserAuthService, PhoneConfirmationService, ChangeOldPhoneService
)

User = get_user_model()


class AuthAPIView(generics.GenericAPIView):
    """ Эндпоинт для login или создания пользователя и отсылки SMS """
    serializer_class = PhoneAuthSerializer

    @swagger_auto_schema(
        responses={
            200: '{"message": "Сообщение отправлено"}',
            201: '{"message": "User создан! Сообщение отправлено"}',
            400: "It will return error type",
            429: '{"message": "Вы слишком часто отправляете сообщение."}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return UserAuthService.get_response(serializer)


class LoginConfirmAPIView(generics.GenericAPIView):
    """ Endpoint для подтверждения номера """
    serializer_class = LoginConfirmationCodeSerializer

    @swagger_auto_schema(
        responses={
            200: 'User активен',
            400: 'It will return error type',
            403: '{"message": "Неверный код"}',
            404: '{"detail": "user not found"}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return PhoneConfirmationService.get_response(serializer)


class TokenObtainPairCheckView(TokenObtainPairView):
    """
        Return JWT tokens (access and refresh) for specific user based on
        username and password.
        Check User type, if user type is OPERATOR, then will not open access
    """
    serializer_class = TokenObtainPairWithoutRefreshSerializer


class CheckUserPhoneNumberAPIView(generics.GenericAPIView):
    """Endpoint для проверки номера """
    permission_classes = (AllowAny,)
    serializer_class = ConfirmOldPhoneSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        get_object_or_404(User, phone=serializer.data['phone'])
        response_data = {
            'message': {'message': 'Такой номер телефона существует'},
            'status': status.HTTP_200_OK,
        }
        return Response(response_data['message'], response_data['status'])


class ChangeOldPhoneAPIView(generics.GenericAPIView):
    """ Endpoint для смены old phone number """
    permission_classes = (IsAuthenticated,)
    serializer_class = ChageOldPhoneSerializer

    @swagger_auto_schema(
        responses={
            200: '{"message": "Сообщение отправлено"}',
            400: "It will return error type",
            406: "{'message': 'Такой номер телефона уже существует'}",
            429: '{"message": "Вы слишком часто отправляете сообщение."}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        return ChangeOldPhoneService.get_response(serializer)


class NewPhoneConfirmAPIView(generics.GenericAPIView):
    """ Endpoint для подтверждения new phone number """
    permission_classes = (IsAuthenticated,)
    serializer_class = ConfirmationNeweCodeSerializer

    @swagger_auto_schema(
        responses={
            200: '{"message": "New phone is confirmed"}',
            400: 'It will return error type',
            403: '{"message": "Неверный код"}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        return ChangeOldPhoneService.get_response_for_new_phone_confirmation(user, serializer)


class ResetPasswordView(generics.UpdateAPIView):
    """
    Change password.
    """
    serializer_class = ResetPasswordSerializer
    model = User
    permission_classes = (AllowAny,)

    def get_object(self, queryset=None):
        try:
            user = self.model.objects.get(phone=self.request.data['phone'])
        except self.model.DoesNotExist:
            raise NotFoundUserPhoneException

        return user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user.set_password(serializer.data.get('new_password'))
            user.save(update_fields=['password'])

            return Response({'msg': 'Пароль успешнен сменен'},
                            status=status.HTTP_200_OK)

        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class PartnerCompanyBidCreateAPIView(generics.CreateAPIView):
    queryset = PartnerCompany
    permission_classes = (IsAuthenticated,)
    serializer_class = PartnerCompanyModelSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                partner_company = serializer.save(user=request.user)
                networks = json.loads(request.data['network'])
                networks['partner_id'] = partner_company.id
                PartnerNetwork.objects.create(
                    **networks
                )
                return Response(
                    data={'detail': 'Вы успешно стали партнером'},
                    status=status.HTTP_200_OK
                )
            except:
                return Response(
                    {'detail': 'Вы уже являетесь партнером'},
                    status=status.HTTP_424_FAILED_DEPENDENCY)
        except PartnerCompany.DoesNotExist:
            pass
        else:
            return Response(
                {'detail': f'Пользователь {self.request.user} уже отправлял'
                           f' заявку на партнерство'},
                status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserProfileAPIView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self, queryset=None):
        user = self.request.user
        return user

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(
            user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FavoriteCouponAPIView(views.APIView):
    """
    GET: get user favorite coupons list
    POST: add coupon to favorite coupons via `coupon_id`
    DELETE: remove coupon from favorite coupons via `coupon_id`
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        coupons = self._get_favorite_coupons(request)
        serializer = CouponSerializer(
            coupons, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        coupon = self._get_coupon(request)
        coupons = self._get_favorite_coupons(request)
        if coupon in coupons:
            return Response(
                data={'detail': 'Купон уже добавлен в "избранное"'},
                status=status.HTTP_412_PRECONDITION_FAILED)
        request.user.favorite_coupons.create(
            user=request.user,
            coupon=coupon
        )
        return Response(
            data={'detail': 'Добавлено в избранное'},
            status=status.HTTP_200_OK)

    def delete(self, request):
        coupon = self._get_coupon(request)
        UserFavoriteCoupon.objects.filter(coupon=coupon).delete()
        return Response(
            data={'detail': 'Удалено из "избранное"'},
            status=status.HTTP_200_OK)

    @staticmethod
    def _get_favorite_coupons(request):
        user = request.user
        coupons = Coupon.objects.filter(
            favorite_users__user_id=user.id
        )
        return coupons

    @staticmethod
    def _get_coupon(request) -> Coupon:
        coupon_id = request.GET.get('coupon_id')
        if coupon_id:
            try:
                coupon = Coupon.objects.get(id=coupon_id)
            except Coupon.DoesNotExist:
                raise Http404
            else:
                return coupon
        else:
            raise MissingParameterInRequestBodyException


class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(
                    serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_403_FORBIDDEN)
            # set_password also hashes the password that the user will get
            if serializer.data.get("new_password") == serializer.data.get("new_password_repeat"):
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }
                return Response(response)
            return Response({"old_password": ["The new passports don't match"]},
                         status=status.HTTP_403_FORBIDDEN)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendSMSToOldPhoneNumberAPIView(generics.GenericAPIView):
    """Endpoint для отправки сообщение на свой номер телефона """
    permission_classes = (AllowAny,)
    serializer_class = ConfirmOldPhoneSerializer

    @swagger_auto_schema(
        responses={
            200: '{"message": "Сообщение отправлено"}',
            400: "It will return error type",
            406: "{'message': 'Пользователя с таким номером не существует!'}",
            429: '{"message": "Вы слишком часто отправляете сообщение."}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(User, phone=serializer.data['phone'])
        return ChangeOldPhoneService.get_response_for_confirm_phone(user)


class RecoveryPasswordAPIView(UpdateAPIView):
    """Endpoint для изменения пароля"""
    serializer_class = RecoveryPasswordSerializer
    permission_classes = (AllowAny,)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(User, phone=serializer.data['phone'])
        return ChangeOldPhoneService.get_response_update_password(
            serializer, user
        )


class ConfirmationYoursPhoneNumberAPIView(generics.GenericAPIView):
    """ Endpoint для подтверждении своего номера """

    permission_classes = (AllowAny,)
    serializer_class = ConfirmationNeweCodeSerializer

    @swagger_auto_schema(
        responses={
            200: '{"message": "Номер подтвержден"}',
            400: 'It will return error type',
            403: '{"message": "Неверный код"}',
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(User, phone=serializer.data['phone'])
        return ChangeOldPhoneService.get_response_for_check_confirmation_code(user, serializer)
