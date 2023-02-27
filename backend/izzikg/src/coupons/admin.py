from django.contrib import admin

from adminsortable2.admin import SortableAdminMixin
from django_2gis_maps.admin import DoubleGisAdmin

from .models import (
    Category, Subcategory, Tag, Coupon, CouponImage, BuyerCoupon,
    CouponMapLocation, MapLocationPhoneNumber, SubSubcategory
)


@admin.register(Category)
class CategoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Subcategory)
class SubcategoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('title', 'category',)
    list_filter = ('category',)
    search_fields = ('title', 'category',)


@admin.register(SubSubcategory)
class SubcategoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('title', 'category',)
    list_filter = ('category',)
    search_fields = ('title', 'category',)


@admin.register(Tag)
class TagAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('title',)


class CouponImageInlineAdmin(admin.TabularInline):
    model = CouponImage
    extra = 2


class MapLocationPhoneNumberInlineAdmin(admin.StackedInline):
    model = MapLocationPhoneNumber
    extra = 2


@admin.register(CouponMapLocation)
class CouponMapLocationInlineAdmin(DoubleGisAdmin, admin.ModelAdmin):
    list_display = ('address', 'geolocation')
    inlines = (MapLocationPhoneNumberInlineAdmin, )


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'subcategory', 'price',)
    list_filter = ('company', 'subcategory', 'tags',)
    search_fields = ('title',)
    exclude = ('order',)
    inlines = (CouponImageInlineAdmin,)


@admin.register(BuyerCoupon)
class BuyerCouponAdmin(admin.ModelAdmin):
    list_display = ('buyer', 'coupon', 'bought', 'is_activated',)
    list_filter = ('buyer', 'coupon', 'bought', 'is_activated',)
    readonly_fields = ('is_activated', 'activated_at', 'qr_code_image',)
