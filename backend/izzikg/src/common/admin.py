from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from django.utils.safestring import mark_safe
from solo.admin import SingletonModelAdmin

from .models import (
    FAQ, AboutUs, SocialNetwork, ImageSlider, ImageBlock, OurMapLocation,
    FooterFAQ, HowToMakeOrder, PaymentMethod, PrivacyPolicy, PublicOffer,
    Requisites
)


@admin.register(FAQ)
class FAQAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('question',)


@admin.register(FooterFAQ)
class FooterFAQAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(AboutUs)
class AboutUsAdmin(SingletonModelAdmin):
    pass


@admin.register(HowToMakeOrder)
class HowToMakeOrderAdmin(SingletonModelAdmin):
    pass


@admin.register(PaymentMethod)
class PaymentMethodAdmin(SingletonModelAdmin):
    pass


@admin.register(SocialNetwork)
class SocialNetworkAdmin(SingletonModelAdmin):
    pass


@admin.register(ImageSlider)
class ImageSliderAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('get_image',)

    def get_image(self, obj: ImageSlider):
        return mark_safe(f'<img src={obj.image.url} height="50">')

    get_image.short_description = 'изображение'


@admin.register(ImageBlock)
class ImageBlockAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('get_image',)

    def get_image(self, obj: ImageSlider):
        return mark_safe(f'<img src={obj.image.url} height="50">')

    get_image.short_description = 'изображение'


@admin.register(OurMapLocation)
class OurMapLocationAdmin(admin.ModelAdmin):
    list_display = ('__str__',)


@admin.register(PrivacyPolicy)
class PrivacyPolicyAdmin(SingletonModelAdmin):
    pass


@admin.register(PublicOffer)
class PublicOfferAdmin(SingletonModelAdmin):
    pass


@admin.register(Requisites)
class RequisitesAdmin(SingletonModelAdmin):
    pass
