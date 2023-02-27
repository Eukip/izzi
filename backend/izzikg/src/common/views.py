from django.http import Http404
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny

from .models import (
    SocialNetwork, FAQ, AboutUs, ImageSlider, ImageBlock, OurMapLocation,
    FooterFAQ, HowToMakeOrder, PaymentMethod, PrivacyPolicy, PublicOffer,
    Requisites
)
from .serializers import (
    SocialNetworkSerializer, FAQSerializer, AboutUsSerializer,
    ImageSliderSerializer, ImageBlockSerializer, OurMapLocationSerializer,
    FooterFAQSerializer, HowToMakeOrderSerializer, PaymentMethodSerializer,
    PrivacyPolicySerializer, PublicOfferSerializer, RequisitesSerializer
)


class SocialNetworkRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = SocialNetworkSerializer

    def get_object(self):
        social = SocialNetwork.objects.first()
        if not social:
            raise Http404

        return social


class FAQListAPIView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    pagination_class = None


class AboutUsRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = AboutUsSerializer

    def get_object(self):
        about_us = AboutUs.objects.first()
        if not about_us:
            raise Http404

        return about_us


class HowToMakeOrderRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = HowToMakeOrderSerializer

    def get_object(self):
        how_to_make_order = HowToMakeOrder.objects.first()
        if not how_to_make_order:
            raise Http404

        return how_to_make_order


class PaymentMethodRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = PaymentMethodSerializer

    def get_object(self):
        payment_method = PaymentMethod.objects.first()
        if not payment_method:
            raise Http404

        return payment_method


class OurMapLocationAPIView(generics.ListAPIView):
    queryset = OurMapLocation.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OurMapLocationSerializer
    pagination_class = None


class ImageSliderListAPIView(generics.ListAPIView):
    queryset = ImageSlider.objects.all()
    serializer_class = ImageSliderSerializer
    pagination_class = None


class ImageBlockListAPIView(generics.ListAPIView):
    queryset = ImageBlock.objects.all()
    serializer_class = ImageBlockSerializer
    pagination_class = None


class FooterFAQListAPIView(generics.ListAPIView):
    queryset = FooterFAQ.objects.all()
    serializer_class = FooterFAQSerializer
    pagination_class = None


class PrivacyPolicyAPIView(generics.RetrieveAPIView):
    """get privacy policy"""
    serializer_class = PrivacyPolicySerializer

    def get_object(self):
        privacy_policy = PrivacyPolicy.objects.first()
        if not privacy_policy:
            raise Http404
        return privacy_policy


class PublicOfferAPIView(generics.RetrieveAPIView):
    """get Public offer"""
    serializer_class = PublicOfferSerializer

    def get_object(self):
        privacy_policy = PublicOffer.objects.first()
        if not privacy_policy:
            raise Http404
        return privacy_policy


class RequisitesAPIView(generics.RetrieveAPIView):
    """get Requisites"""
    serializer_class = RequisitesSerializer

    def get_object(self):
        privacy_policy = Requisites.objects.first()
        if not privacy_policy:
            raise Http404
        return privacy_policy
