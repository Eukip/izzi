from typing import Tuple

from django.urls import path, include

from .views import (
    TokenObtainPairCheckView, ChangePasswordView,
    FavoriteCouponAPIView, PartnerCompanyBidCreateAPIView,
    UserProfileAPIView, ResetPasswordView, AuthAPIView,
    LoginConfirmAPIView, ChangeOldPhoneAPIView, NewPhoneConfirmAPIView,
    RecoveryPasswordAPIView, SendSMSToOldPhoneNumberAPIView,
    ConfirmationYoursPhoneNumberAPIView, CheckUserPhoneNumberAPIView,
)


urlpatterns: Tuple = (
    path('rest-auth', include('rest_framework.urls')),
    path('auth/', AuthAPIView.as_view(), name='auth'),
    path('check-user/', CheckUserPhoneNumberAPIView.as_view(), name='check-user'),
    path('login-confirm/', LoginConfirmAPIView.as_view(), name='login-confirm'),
    path('login/', TokenObtainPairCheckView.as_view(), name='login'),
    path('change-old-phone/', ChangeOldPhoneAPIView.as_view(), name='change_old_phone'),
    path(
        'recovery-password-send-sms/',
        SendSMSToOldPhoneNumberAPIView.as_view(), name='recovery-send-sms'
    ),
    path('new-phone-confirm/', NewPhoneConfirmAPIView.as_view(), name='new_phone_confirm'),
    path(
        'recovery-password-confirm/', ConfirmationYoursPhoneNumberAPIView.as_view(),
        name='recovery-password-confirm'
    ),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('recovery-password/', RecoveryPasswordAPIView.as_view(), name='recovery-password'),
    # path('change-phone/', ChangePhoneView.as_view(), name='change-phone'),
    path('partner-bid/', PartnerCompanyBidCreateAPIView.as_view()),
    path('favourite-coupons/', FavoriteCouponAPIView.as_view()),
)
