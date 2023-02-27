from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken

from .exceptions import DuplicateUserPhoneException, NotFoundUserPhoneException
from .models import PartnerCompany
from .service import (
    UserAuthService, PhoneConfirmationService, ChangeOldPhoneService,
)
from .utils import regex_validator_for_phone


User = get_user_model()


class PhoneAuthSerializer(serializers.Serializer):
    """Сериалайзер для валидации и создания пользователя """
    phone = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)

    def validate(self, data):
        try:
            user = User.objects.get(phone=data.get('phone'))
            if user.is_registration_finish:
                raise DuplicateUserPhoneException
        except User.DoesNotExist:
            pass
        self.user, self.created = (
            UserAuthService.get_or_create_user_instance(data)
        )
        if not self.created:
            self.confirm_login_allowed(self.user)
        return data

    def validate_phone(self, value):
        UserAuthService.check_format_user_phone(value)
        return value

    @staticmethod
    def confirm_login_allowed(user):
        if not user.is_active:
            raise serializers.ValidationError({'phone': 'Этот номер не активен.'})


class NewePhoneAuthSerializer(serializers.Serializer):
    """Сериалайзер для валидации и создания пользователя """
    phone = serializers.CharField(required=True)

    def validate(self, data):
        try:
            user = User.objects.get(phone=data.get('phone'))
            if user.is_registration_finish:
                raise DuplicateUserPhoneException
        except User.DoesNotExist:
            pass
        self.user, self.created = (
            UserAuthService.get_or_create_user_instance(data)
        )
        if not self.created:
            self.confirm_login_allowed(self.user)
        return data

    def validate_phone(self, value):
        UserAuthService.check_format_user_phone(value)
        return value

    @staticmethod
    def confirm_login_allowed(user):
        if not user.is_active:
            raise serializers.ValidationError({'phone': 'Этот номер не активен.'})


class ConfirmationCodeSerializer(serializers.Serializer):
    """Serializer for phone code confirmation"""
    confirmation_code = serializers.CharField(max_length=6, required=True)


class ConfirmationNeweCodeSerializer(serializers.Serializer):
    """Serializer for phone code confirmation"""
    confirmation_code = serializers.CharField(max_length=6, required=True)
    phone = serializers.CharField(required=True)


class LoginConfirmationCodeSerializer(PhoneAuthSerializer, ConfirmationCodeSerializer):
    """ Сериалайзер для login код подтверждения """

    def validate(self, data):
        PhoneConfirmationService.check_is_user_exists(data.get('phone'))
        self.confirm_login_allowed(data.get('phone'))
        return data

    def validate_phone(self, value):
        super(LoginConfirmationCodeSerializer, self).validate_phone(value)
        PhoneConfirmationService.check_is_user_exists(value)
        return value

    @staticmethod
    def confirm_login_allowed(phone: str) -> None:
        if not User.objects.filter(phone=phone, is_active=True).exists():
            raise serializers.ValidationError({'phone': 'Этот номер не активен.'})


class UserRegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(
        required=True,
        validators=[regex_validator_for_phone]
    )
    password = serializers.CharField(write_only=True, required=True,
                                     validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    access_token = serializers.SerializerMethodField(source='get_access_token')

    class Meta:
        model = User
        fields = (
            'phone',
            'password',
            'password2',
            'first_name',
            'last_name',
            'access_token',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        try:
            user = User.objects.create(
                phone=validated_data['phone'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
        except IntegrityError:
            raise DuplicateUserPhoneException

        user.set_password(validated_data['password'])
        user.save()
        return user

    def get_access_token(self, obj: User):
        token = AccessToken.for_user(obj)
        return str(token)


class TokenObtainPairWithoutRefreshSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': _('Неверный логин или пароль.')
    }

    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_registration_finish:
            raise NotFoundUserPhoneException

        if 'refresh' in data:
            del data['refresh']

        data.update({
            'phone': self.user.phone,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        })
        return data


class ChageOldPhoneSerializer(NewePhoneAuthSerializer):
    """ Сериалайзер для login код подтверждения """

    def validate(self, data):
        request = self.context['request']
        self.user = (
            ChangeOldPhoneService.set_tmp_phone_number(
                phone_number=data.get('phone'),
                user=request.user,
            )
        )
        return data

    def validate_phone(self, value):
        return ChangeOldPhoneService.check_format_user_phone(value)


class ConfirmOldPhoneSerializer(serializers.ModelSerializer):
    """ Сериалайзер для login код подтверждения """
    phone = serializers.CharField(
        required=True, validators=[regex_validator_for_phone]
    )

    class Meta:
        model = User
        fields = (
            'phone',
        )


class ResetPasswordSerializer(serializers.ModelSerializer):
    """
    Serializer for password change endpoint.
    """
    phone = serializers.CharField(
        required=True, validators=[regex_validator_for_phone]
    )
    new_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = (
            'phone',
            'new_password',
        )


class PartnerCompanyModelSerializer(WritableNestedModelSerializer,
                                    serializers.ModelSerializer):

    class Meta:
        model = PartnerCompany
        fields = (
            'logo',
            'address',
            'email',
            'company_name',
            'description',
            'phone1',
            'phone2',
            'phone3',
        )


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password_repeat = serializers.CharField(required=True)


class RecoveryPasswordSerializer(serializers.Serializer):
    """
    Serializer for password recovery endpoint.
    """
    phone = serializers.CharField(
        required=True, validators=[regex_validator_for_phone]
    )
    confirmation_code = serializers.CharField(max_length=6, required=True)
    new_password = serializers.CharField(required=True)
    new_password_repeat = serializers.CharField(required=True)
