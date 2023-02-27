from typing import Tuple

from django.urls import path, include

from .views import (
    AboutUsRetrieveAPIView, ImageBlockListAPIView, ImageSliderListAPIView,
    FAQListAPIView, SocialNetworkRetrieveAPIView, OurMapLocationAPIView,
    FooterFAQListAPIView, HowToMakeOrderRetrieveAPIView,
    PaymentMethodRetrieveAPIView, PrivacyPolicyAPIView, PublicOfferAPIView,
    RequisitesAPIView
)

urlpatterns: Tuple = (
    path('users/', include('users.urls')),
    path('info/', include([
        path('about-us/', AboutUsRetrieveAPIView.as_view(),
             name='some-namealkjdlf_ad'),
        path('image-slider/', ImageSliderListAPIView.as_view()),
        path('image-block/', ImageBlockListAPIView.as_view()),
        path('faq/', FAQListAPIView.as_view()),
        path('footer-faq/', FooterFAQListAPIView.as_view()),
        path('how-to-order/', HowToMakeOrderRetrieveAPIView.as_view()),
        path('payment-method/', PaymentMethodRetrieveAPIView.as_view()),
        path('networks/', SocialNetworkRetrieveAPIView.as_view()),
        path('our-map-coordinates/', OurMapLocationAPIView.as_view()),
        path('privacy-policy/', PrivacyPolicyAPIView.as_view()),
        path('public-offer/', PublicOfferAPIView.as_view()),
        path('requisites/', RequisitesAPIView.as_view()),
    ])),
    path('', include('coupons.urls')),
)
