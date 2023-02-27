from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin

from django_2gis_maps.admin import DoubleGisAdmin

from .models import (
    User, PartnerNetwork, PartnerCompany, PartnerCompanyMapLocation,
    UserFavoriteCoupon
)


class UserCustomCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ("phone",)


@admin.register(User)
class UserCustomAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('phone', 'password', 'is_partner')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email',
            'is_registration_finish', 'confirmation_code')}
         ),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups',
                       'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_form = UserCustomCreationForm
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'password1', 'password2'),
        }),
    )
    list_display = ('phone', 'email', 'first_name', 'last_name')
    list_filter = []
    search_fields = ('phone', 'first_name', 'last_name')
    ordering = ['phone']

    def get_queryset(self, request):
        return self.model.objects.filter(is_superuser=False)


class PartnerNetworkInlineAdmin(admin.StackedInline):
    model = PartnerNetwork


@admin.register(PartnerCompany)
class PartnerCompanyAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'user', 'confirmed')
    list_filter = ('confirmed',)
    inlines = (PartnerNetworkInlineAdmin,)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'owner':
            kwargs['queryset'] = User.objects.filter(
                Q(is_partner=True) | Q(is_superuser=True))
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(PartnerCompanyMapLocation)
class PartnerCompanyMapLocationAdmin(DoubleGisAdmin, admin.ModelAdmin):
    pass


@admin.register(UserFavoriteCoupon)
class UserFavouriteCouponAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserFavoriteCoupon._meta.fields]
