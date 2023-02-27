from rest_framework import serializers as srz

from common.models import (
    SocialNetwork, FAQ, AboutUs, ImageSlider, ImageBlock, OurMapLocation,
    FooterFAQ, HowToMakeOrder, PaymentMethod, PrivacyPolicy, PublicOffer,
    Requisites
)


class SocialNetworkSerializer(srz.ModelSerializer):
    class Meta:
        model = SocialNetwork
        fields = (
            'vkontakte',
            'instagram',
            'odnoklassniki',
            'facebook',
            'whatsapp',
            'email',
            'phone',
            'address',
            'phone1',
            'phone2',
            'phone3',
            'description'
        )


class FAQSerializer(srz.ModelSerializer):

    class Meta:
        model = FAQ
        fields = (
            'question',
            'answer',
        )


class AboutUsSerializer(srz.ModelSerializer):

    class Meta:
        model = AboutUs
        fields = (
            'description',
        )


class HowToMakeOrderSerializer(srz.ModelSerializer):

    class Meta:
        model = HowToMakeOrder
        fields = (
            'description',
        )


class PaymentMethodSerializer(srz.ModelSerializer):

    class Meta:
        model = PaymentMethod
        fields = (
            'description',
        )


class OurMapLocationSerializer(srz.ModelSerializer):

    class Meta:
        model = OurMapLocation
        fields = (
            'address',
            'coordinates',
        )


class ImageSliderSerializer(srz.ModelSerializer):

    class Meta:
        model = ImageSlider
        fields = (
            'image',
        )


class ImageBlockSerializer(srz.ModelSerializer):

    class Meta:
        model = ImageBlock
        fields = (
            'image',
        )


class FooterFAQSerializer(srz.ModelSerializer):

    class Meta:
        model = FooterFAQ
        fields = (
            'title',
            'description',
        )


class PrivacyPolicySerializer(srz.ModelSerializer):

    class Meta:
        model = PrivacyPolicy
        fields = (
            'title',
            'description',
        )


class PublicOfferSerializer(srz.ModelSerializer):

    class Meta:
        model = PublicOffer
        fields = (
            'title',
            'description',
        )


class RequisitesSerializer(srz.ModelSerializer):

    class Meta:
        model = Requisites
        fields = (
            'title',
            'description',
        )
