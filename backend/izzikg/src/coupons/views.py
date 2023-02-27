from datetime import datetime

from cryptography.fernet import InvalidToken
from django.http import Http404
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status, views
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter

from coupons.mixins import CouponQueryParamsMixin, UserCouponsQueryParamsMixin
from coupons.models import Category, Coupon, Tag, BuyerCoupon
from coupons.pagination import CouponPageNumberPagination
from coupons.serializers import (
    CategorySerializer, CouponSerializer, TagSerializer, CouponDetailSerializer,
    PartnerCompanySerializer, BuyerCouponSerializer, MyStocksSerializer,
    CouponNameSerializer, AllCouponSerializer, CouponDetailIsSerializer,
    PartnerCompanyAnonymUserSerializer, CheckPurchaseSerializer,
)
from users.exceptions import (
    MissingQueryParamsException, NotValidQRToken,
    MissingParameterInRequestBodyException
)
from users.models import PartnerCompany
from .custom_openapi import (
    tags_query_params, qr_token, user_coupons_query_params
)
from .encrypt_decrypt import decrypt
from .paybox_services import PayboxRedirectService


class TrendCouponListAPIView(CouponQueryParamsMixin, generics.ListAPIView):
    """
    Trend List coupons
    """
    permission_classes = (AllowAny,)
    pagination_class = CouponPageNumberPagination

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        else:
            self.serializer_class = AllCouponSerializer
            return self.serializer_class

    def get_queryset(self):
        coupon_qs = Coupon.objects.filter(
            is_trend=True,
            released_quantity__gt=0
        ).select_related('company').order_by('order')

        coupon_qs = self.update_coupon_qs(coupon_qs)
        return coupon_qs.distinct()

    @swagger_auto_schema(manual_parameters=tags_query_params)
    def get(self, request, *args, **kwargs):
        return super(TrendCouponListAPIView, self).get(request, *args, **kwargs)


class CouponListAPIView(CouponQueryParamsMixin, generics.ListAPIView):
    """
    List coupons
    """
    permission_classes = (AllowAny,)
    pagination_class = CouponPageNumberPagination

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        else:
            self.serializer_class = AllCouponSerializer
            return self.serializer_class

    def get_queryset(self):
        coupon_qs = Coupon.objects.filter(
            released_quantity__gt=0
        ).select_related('company').order_by('-is_trend', '-id')
        coupon_qs = self.update_coupon_qs(coupon_qs)
        return coupon_qs.distinct()

    @swagger_auto_schema(manual_parameters=tags_query_params)
    def get(self, request, *args, **kwargs):
        return super(CouponListAPIView, self).get(request, *args, **kwargs)


class UserCouponListAPIView(UserCouponsQueryParamsMixin, generics.ListAPIView):
    """
    List coupons
    used query param `status`:
        example: ?status=active
        example: ?status=activated
        example: ?status=expired
    """
    serializer_class = CouponSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CouponPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        coupon_qs = Coupon.objects.filter(
            bought_coupons__buyer=user, is_active=True, bought_coupons__bought=True
        )
        coupon_qs = self.update_coupons_qs(coupon_qs)
        return coupon_qs

    @swagger_auto_schema(manual_parameters=user_coupons_query_params)
    def get(self, request, *args, **kwargs):
        return super(UserCouponListAPIView, self).get(request, *args, **kwargs)


class CouponCategoryListAPIView(CouponQueryParamsMixin, generics.ListAPIView):
    """
    List of coupons of category list
    used query param `tags`:
        example: ?tags=<tag_id>,<tag_id>
    used query param `sort_by`:
        example: ?sort_by=price or -price or -created_at
    """
    permission_classes = (AllowAny,)
    pagination_class = CouponPageNumberPagination

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        self.serializer_class = AllCouponSerializer
        return self.serializer_class

    def get_queryset(self):
        coupon_qs = (
            Coupon.objects
            .filter(subcategory__category_id=self.kwargs['cat_pk'])
            .exclude(released_quantity=0)
            .select_related('company')
        )
        coupon_qs = self.update_coupon_qs(coupon_qs)
        return coupon_qs.distinct()

    @swagger_auto_schema(manual_parameters=tags_query_params)
    def get(self, request, *args, **kwargs):
        return super(CouponCategoryListAPIView, self).get(request, *args, **kwargs)


class CouponSubcategoryListAPIView(CouponQueryParamsMixin, generics.ListAPIView):
    """
    List of coupons of subcategory
    used query param `tags`:
        example: ?tags=<tag_id>,<tag_id>
    used query param `sort_by`:
        example: ?sort_by=price or -price or -created_at
    """
    permission_classes = (AllowAny,)
    pagination_class = CouponPageNumberPagination

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        self.serializer_class = AllCouponSerializer
        return self.serializer_class

    def get_queryset(self):
        coupon_qs = (
            Coupon.objects
            .filter(subcategory_id=self.kwargs['subcat_pk'])
            .exclude(released_quantity=0)
            .select_related('company')
        )
        coupon_qs = self.update_coupon_qs(coupon_qs)
        return coupon_qs.distinct()

    @swagger_auto_schema(manual_parameters=tags_query_params)
    def get(self, request, *args, **kwargs):
        return super(CouponSubcategoryListAPIView, self).get(request, *args, **kwargs)


class CouponSubSubcategoryListAPIView(CouponQueryParamsMixin, generics.ListAPIView):
    """
    List of coupons of sub - subcategory
    used query param `tags`:
        example: ?tags=<tag_id>,<tag_id>
    used query param `sort_by`:
        example: ?sort_by=price or -price or -created_at
    """
    permission_classes = (AllowAny,)
    pagination_class = CouponPageNumberPagination

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        self.serializer_class = AllCouponSerializer
        return self.serializer_class

    def get_queryset(self):
        coupon_qs = (
            Coupon.objects
            .filter(sub_subcategory_id=self.kwargs['subcat_pk'])
            .exclude(released_quantity=0)
            .select_related('company')
        )
        coupon_qs = self.update_coupon_qs(coupon_qs)
        return coupon_qs.distinct()

    @swagger_auto_schema(manual_parameters=tags_query_params)
    def get(self, request, *args, **kwargs):
        return super(CouponSubSubcategoryListAPIView, self).get(request, *args, **kwargs)


class CategoryListAPIView(generics.ListAPIView):
    """
    List of coupons categories
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)
    pagination_class = None


class TagListAPIView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    pagination_class = None


class TagCategoryListAPIView(generics.ListAPIView):
    """List of specific category tags"""

    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return Tag.objects.filter(
            coupons__subcategory__category_id=self.kwargs['cat_pk'],
        ).distinct()


class TagSubcategoryListAPIView(generics.ListAPIView):
    """List of specific subcategory tags"""

    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return Tag.objects.filter(
            coupons__subcategory_id=self.kwargs['subcat_pk'],
        ).distinct()


class CouponRetrieveAPIView(generics.RetrieveAPIView):
    """Detail about coupon"""

    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponDetailSerializer
            return self.serializer_class
        self.serializer_class = CouponDetailIsSerializer
        return self.serializer_class

    @swagger_auto_schema(
        responses={
            200: CouponDetailSerializer(),
            400: 'It will return error type',
            403: '{"message": "Неверный код"}',
            404: '{"detail": "user not found"}',
        }
    )
    def get_object(self):
        try:
            coupon = (
                Coupon.objects
                .prefetch_related('images', 'map_locations__phone_numbers')
                .get(id=self.kwargs['pk'])
            )
        except Coupon.DoesNotExist:
            raise Http404
        return coupon


class CouponQRCodeRetrieveAPIView(generics.RetrieveAPIView):
    """
    Detail about QR code
    """

    serializer_class = BuyerCouponSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        buyer_coupon = (
            BuyerCoupon.objects.filter(
                buyer=self.request.user, coupon=self.kwargs['pk'], bought=True
            ).first()
            )
        if not buyer_coupon:
            raise Http404

        if buyer_coupon.is_activated:
            raise Http404
        else:
            return buyer_coupon


class CompanyRetrieveAPIView(generics.RetrieveAPIView):
    """
    Detail about partner company
    """

    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = PartnerCompanySerializer
            return self.serializer_class
        self.serializer_class = PartnerCompanyAnonymUserSerializer
        return self.serializer_class

    def get_object(self):
        try:
            partner_company = (
                PartnerCompany.objects
                .select_related('network')
                .prefetch_related('coupons', 'coordinates')
                .get(confirmed=True, id=self.kwargs['pk'])
            )
        except PartnerCompany.DoesNotExist:
            raise Http404
        return partner_company


class CouponQRCodeActivateAPIView(APIView):
    """
    Activate coupon
    """

    permission_classes = (AllowAny,)

    def get_object(self):
        qr_token: str = self.request.query_params.get('qr_token')
        if not hasattr(self.request.user, 'partner'):
            raise PermissionDenied({'detail': 'Вы не являетесь партнером.'})

        if not qr_token:
            raise MissingQueryParamsException
        else:
            try:
                buyer_coupon: bytes = decrypt(
                    bytes(qr_token, encoding='utf-8'),
                    self.request.user.partner.id)
            except InvalidToken:
                raise NotValidQRToken
            buyer_coupon_id: int = int(buyer_coupon.decode('utf-8'))
            try:
                buyer_coupon = (
                    BuyerCoupon.objects
                    .select_related('coupon__company__user')
                    .get(id=buyer_coupon_id)
                )
            except BuyerCoupon.DoesNotExist:
                raise Http404

            return buyer_coupon

    @swagger_auto_schema(manual_parameters=[qr_token])
    def get(self, request, **kwargs):
        buyer_coupon = self.get_object()
        if buyer_coupon.coupon.company.user != self.request.user:
            return Response({'detail': 'Только издатели купона '
                                       'могут активировать купон.'})
        if buyer_coupon.is_activated:
            return Response({'detail': 'Купон уже был успешно активирован.'},
                            status=status.HTTP_400_BAD_REQUEST)

        buyer_coupon.is_activated = True
        buyer_coupon.bought = False
        buyer_coupon.activated_at = datetime.now()
        buyer_coupon.save(
            update_fields=['is_activated', 'activated_at', 'bought']
        )
        coupon = Coupon.objects.get(id=buyer_coupon.coupon_id)
        coupon.activated_quantity += 1
        coupon.save(
            update_fields=['activated_quantity']
        )

        return Response({'detail': 'Успешно активировано.'},
                        status=status.HTTP_200_OK)


class CouponSearchListAPIView(generics.ListAPIView):
    """
    Coupons search by title, company name or subcategory name
    /coupons/search/?search=text_to_search_by (coupon, company, subcategory)
    used query param `search`:
        example: ?search=sport+coupon+for+children
    """

    queryset = Coupon.objects.filter(is_active=True)
    filter_backends = [SearchFilter, ]
    search_fields = ['title', 'company__company_name', 'subcategory__title']

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            self.serializer_class = CouponSerializer
            return self.serializer_class
        self.serializer_class = AllCouponSerializer
        return self.serializer_class

    def get_queryset(self):
        import datetime
        today = datetime.date.today()
        coupons = (
            Coupon.objects
            .filter(is_active=True)
            .filter(
                Q(end_active_date__gte=today) | Q(start_active_date__lte=today)
            )
        )
        return coupons


class MyStocksListAPIView(UserCouponsQueryParamsMixin, generics.ListAPIView):
    """
    Endpoint to get list of my stocks
    used query param `status`:
        example: ?status=active
        example: ?status=activated
        example: ?status=expired
    """

    serializer_class = MyStocksSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CouponPageNumberPagination

    def get_queryset(self):
        coupons = Coupon.objects.filter(
            company__user_id=self.request.user.id, is_active=True
        )
        coupons = self.update_coupons_qs(coupons)
        return coupons.distinct()

    @swagger_auto_schema(manual_parameters=user_coupons_query_params)
    def get(self, request, *args, **kwargs):
        return super(MyStocksListAPIView, self).get(request, *args, **kwargs)


class BuyCouponAPIView(views.APIView):
    """
    Endpoint for coupon buying by user
    POST: buy coupon via `coupon_id`
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        coupon = self._get_coupon(request)
        bought_coupon = request.user.bought_coupons.create(
            buyer=request.user,
            coupon=coupon
        )
        paybox_redirect = PayboxRedirectService.generate_paybox_url(coupon, bought_coupon)
        return Response(
                   data={'detail': paybox_redirect},
                   status=status.HTTP_200_OK)

    @staticmethod
    def _get_coupon(request) -> Coupon:
        if coupon_id := request.data.get('coupon_id'):
            try:
                coupon = Coupon.objects.get(id=coupon_id)
            except Coupon.DoesNotExist:
                raise Http404
            else:
                if coupon.released_quantity == 0:
                    raise Http404
                return coupon
        else:
            raise MissingParameterInRequestBodyException


class ProcessBayCouponAPIView(views.APIView):
    """
        PAY SUCCESS
    """

    permission_classes = (AllowAny,)

    def post(self, request):
        pg_order_id = request.data.get('pg_order_id')
        result = request.data.get('pg_result')
        if int(result):
            order = BuyerCoupon.objects.get(id=pg_order_id)
            order.bought = True
            order.save(update_fields=['bought'])
            coupon = Coupon.objects.get(id=order.coupon_id)
            coupon.released_quantity -= 1
            coupon.bought_quantity += 1
            coupon.save(update_fields=['bought_quantity', 'released_quantity'])
            return Response(
                data={'detail': 'Купон успешно куплен.'},
                status=status.HTTP_200_OK
            )
        return Response(
            data={
                'detail': 'Не успешная покупка купона!'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class SearchListAPIView(generics.ListAPIView):
    """
    Coupons search by title
    /coupons/search-text/?name=text_to_search_by (coupon name)
    used query param `search`:
        example: ?name=sport+coupon+for+children
    """
    pagination_class = None
    permission_classes = []
    serializer_class = CouponNameSerializer

    def get_queryset(self):
        query = self.request.query_params.get('name')
        coupons = Coupon.objects.filter(title__icontains=query).values()
        return coupons


class CheckPurchaseRetrieveAPIView(generics.RetrieveAPIView):
    """Class to check the purchase"""
    permission_classes = (IsAuthenticated,)
    serializer_class = CheckPurchaseSerializer

    def get_object(self):
        bayer_coupon = BuyerCoupon.objects.filter(
                buyer=self.request.user, id=self.kwargs['pk']
            ).first()
        if not bayer_coupon:
            raise NotFound(
                detail='Нет такого пользователя с купоном',
            )
        return bayer_coupon
