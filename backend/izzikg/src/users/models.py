from typing import Dict, Union

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Manager

from django_2gis_maps.mixins import DoubleGisMixin
from django_2gis_maps import fields as map_fields


from common.models import DateTimeStampModel
from .managers import UserCustomManager, PartnerManager
from coupons.utils import generate_file_path


class User(AbstractUser):
    """
    User who login via phone and password. Users can buy coupons,
    and users who connected partner company can sell coupons
    """
    username = None

    phone = models.CharField(
        verbose_name='номер телефона', max_length=20, null=True,
        db_index=True, unique=True,
        help_text='формат: +999999999999',
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{10,20}$',
                message='Номер телефона должен быть введен в формате: '
                        '"+999999999999". Допускается от 10 до 20 цифр.')]
    )
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []
    is_partner = models.BooleanField(
        'Является партнером?', default=False,
    )
    is_registration_finish = models.BooleanField(
        default=False, verbose_name='is_registration_finish',
    )
    confirmation_code = models.CharField(
        verbose_name='confirmation code', max_length=6, null=True, blank=True,
    )
    confirmation_date = models.DateTimeField(
        verbose_name='confirmation date', null=True, blank=True,
    )
    objects: Manager = UserCustomManager()
    partners: Manager = PartnerManager()

    class Meta:
        verbose_name_plural = 'Пользователи'
        verbose_name = 'Пользователь'

    def __str__(self):
        return f'Пользователь {self.phone}'


class PartnerCompany(DateTimeStampModel):
    """
    Partner company of user.
    Via this company user can sell coupons
    """

    PARTNER_COMPANY_STATUS: Dict[Union[None, bool], str] = (
        (None, 'На рассмотрении'), (True, 'Подтверждён'), (False, 'Отклонён')
    )
    user = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, verbose_name='Пользователь',
        related_name='partner',
    )
    confirmed = models.BooleanField(
        'Подтвержден?', choices=PARTNER_COMPANY_STATUS,
        default=None, null=True, blank=True,
        help_text='модератор подтверждает компанию пользователя, '
                  'далее пользователь становится партнёром'
    )
    logo = models.FileField(
        'Логотип', help_text=(
            'поддерживаемые форматы svg, png, jpg, jpeg. '
            'Размер изображения: 200x200',
        ),
        upload_to=generate_file_path,
        validators=[FileExtensionValidator(['svg', 'png', 'jpg', 'jpeg', 'web', 'webp'])]
    )
    address = models.CharField(
        'Адрес', max_length=255, blank=True, null=True,
    )
    email = models.EmailField(
        'E-mail',
    )
    phone1 = models.CharField(
        'Номер телефона 1', max_length=20,
    )
    phone2 = models.CharField(
        'Номер телефона 2', max_length=20, blank=True,
    )
    phone3 = models.CharField(
        'Номер телефона 3', max_length=20, blank=True,
    )
    company_name = models.CharField(
        'Название вашей компании', max_length=150,
    )
    description = models.TextField(
        'Описание', max_length=1000,
    )

    class Meta:
        verbose_name = 'Компания партнера'
        verbose_name_plural = 'Компании партнеров'

    def __str__(self):
        return f'{self.company_name}'


class PartnerNetwork(models.Model):
    """Social networks of PartnerCompany"""

    partner = models.OneToOneField(
        PartnerCompany, on_delete=models.CASCADE,
        related_name='network', verbose_name='Комания партнера',
    )
    instagram = models.URLField(blank=True,)
    facebook = models.URLField(blank=True,)
    whatsapp = models.URLField(blank=True,)
    telegram = models.URLField(blank=True,)
    vkontakte = models.URLField(blank=True, verbose_name='Вконтакте',)
    odnoklassniki = models.URLField(blank=True, verbose_name='Одноклассники',)

    class Meta:
        verbose_name = 'Социальные сети партнера'
        verbose_name_plural = 'Социальные сети партнеров'

    def __str__(self):
        return f'Соц. сети партнера {self.partner.company_name}'


class PartnerCompanyMapLocation(DoubleGisMixin, models.Model):
    """Map coordinates"""

    partner = models.ForeignKey(
        PartnerCompany, on_delete=models.CASCADE, verbose_name='Партнер компании',
        related_name='coordinates',
    )
    phone = models.CharField(
        'Номер телефона', max_length=50, blank=True,
        help_text='например: +996 000 000 000',
    )
    address = map_fields.AddressField('Адрес', max_length=200)
    geolocation = map_fields.GeoLocationField('Координаты')

    class Meta:
        verbose_name_plural = 'Координаты адреса для компании партнеров'
        verbose_name = 'Координаты адреса для компании партнера'

    def __str__(self):
        return f'Координаты {self.address} {self.geolocation}'

    def clean(self):
        if not self.partner.confirmed:  # can be None or False
            raise ValidationError(
                'Для неподтвержденных или не расмотренных компании '
                'нельзя добавлять координаты на карте. '
                'Измените статус подтверждения.'
            )


class UserFavoriteCoupon(DateTimeStampModel):
    """Favorite coupons of users"""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name='Пользователь',
        related_name='favorite_coupons',
    )
    coupon = models.ForeignKey(
        'coupons.Coupon', on_delete=models.CASCADE, verbose_name='Купон',
        related_name='favorite_users',
    )

    class Meta:
        verbose_name_plural = 'Избранные купоны пользователей'
        verbose_name = 'Избранный купон пользователя'

    def __str__(self):
        return f'Избранный купон {self.user}'


# class UserBoughtCoupon(DateTimeStampModel):
#     """Bought coupon of user"""
#
#     user = models.ForeignKey(
#         User, on_delete=models.PROTECT, verbose_name='Пользователь',
#         related_name='bought_coupons',
#     )
#     coupon = models.ForeignKey(
#         'Coupon', on_delete=models.PROTECT, verbose_name='Купон',
#         related_name='bought_users',
#     )
#
#     class Meta:
#         verbose_name_plural = 'Купленные купоны пользователей'
#         verbose_name = 'Купленный купон пользователя'
#
#     def __str__(self):
#         return f'Купленный купон {self.user}'
