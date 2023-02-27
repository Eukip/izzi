import qrcode

from decimal import Decimal
from io import BytesIO

from PIL import ImageDraw, Image
from ckeditor.fields import RichTextField
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.files import File
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django_resized import ResizedImageField

from solo.models import SingletonModel
from django_2gis_maps import fields as map_fields
from django_2gis_maps.mixins import DoubleGisMixin

from common.models import DateTimeStampModel
from coupons.encrypt_decrypt import encrypt
from coupons.utils import generate_file_path
from users.models import PartnerCompany


User = get_user_model()


class Category(models.Model):
    """Category of coupons"""

    title = models.CharField(
        'Название', max_length=100, unique=True,
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Категория'
        verbose_name = 'Категория'
        ordering = ('position',)

    def __str__(self):
        return self.title


class Subcategory(models.Model):
    """Subcategory of coupons"""

    title = models.CharField(
        'Название', max_length=100, unique=True,
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name='Категория',
        related_name='subcategories',
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )
    icon = models.ImageField(verbose_name='Иконка', blank=True)

    class Meta:
        verbose_name_plural = 'Подкатегории'
        verbose_name = 'Подкатегория'
        ordering = ('position',)

    def __str__(self):
        return f'{self.category} - {self.title}'


class SubSubcategory(models.Model):
    """SubSubcategory of coupons"""

    title = models.CharField(
        'Название', max_length=100,
    )
    category = models.ForeignKey(
        Subcategory, on_delete=models.CASCADE,
        verbose_name='Категория в подкатегории',
        related_name='sub_subcategories',
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Подкатегории в подкатегории'
        verbose_name = 'Подкатегория в подкатегории'
        ordering = ('position',)

    def __str__(self):
        return f'{self.category} - {self.title}'


class Tag(models.Model):
    """Tags for coupons"""

    title = models.CharField(
        'Название', max_length=100, unique=True,
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Тэги'
        verbose_name = 'Тэг'
        ordering = ('position',)

    def __str__(self):
        return self.title


class Coupon(DateTimeStampModel):
    """Coupon of partner company"""

    company = models.ForeignKey(
        PartnerCompany, on_delete=models.CASCADE, verbose_name='Владелец',
        related_name='coupons',
    )
    subcategory = models.ForeignKey(
        Subcategory, on_delete=models.SET_NULL, null=True,
        related_name='coupons', verbose_name='Подкатегория',
    )
    sub_subcategory = models.ForeignKey(
        SubSubcategory, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='subcategory_coupons',
        verbose_name='Подкатегория в подкатегории',
    )
    tags = models.ManyToManyField(
        Tag, verbose_name='Тэги',
        related_name='coupons', blank=True
    )
    title = models.CharField(
        'Название купона', max_length=255,
    )
    conditions = RichTextField(
        'Условия', blank=True, null=True
    )
    description = RichTextField(
        'Описание'
    )
    preview_image = models.ImageField(
        'Превью изображение', upload_to=generate_file_path,
        null=True, blank=True,
        help_text='появляет на превью купона, и в слайдере стоит первым',
    )
    discount_percent = models.PositiveSmallIntegerField(
        'Процент скидки', validators=[MaxValueValidator(100)]
    )
    start_active_date = models.DateField(
        'Начало активного периода',
    )
    end_active_date = models.DateField(
        'Конец активного периода',
    )
    released_quantity = models.PositiveSmallIntegerField(
        'Количество выпущенных',
    )
    bought_quantity = models.PositiveSmallIntegerField(
        'Количество купленных', default=0, blank=True,
        editable=False,
    )
    activated_quantity = models.PositiveSmallIntegerField(
        'Количество активированных купонов', default=0, blank=True,
        editable=False,
    )
    price = models.DecimalField(
        'Цена', decimal_places=2, max_digits=10,
        validators=[MinValueValidator(Decimal('0.00'))],
    )
    price_for_coupon = models.DecimalField(
        'Цена за купон', decimal_places=2, max_digits=10,
        validators=[MinValueValidator(Decimal('0.00'))],
    )
    old_price = models.DecimalField(
        'Старая цена', null=True, blank=True, decimal_places=2, max_digits=10,
        validators=[MinValueValidator(Decimal('0.00'))],
    )
    is_active = models.BooleanField(
        'Активно?', default=True,
    )
    is_trend = models.BooleanField(
        'Добавить в топовые купоны?', default=False,
    )
    order = models.IntegerField(
        'Порядок', default=0,
    )

    class Meta:
        verbose_name_plural = 'Купоны'
        verbose_name = 'Купон'

    def __str__(self):
        return self.title

    def clean(self):
        errors = {}
        if self.activated_quantity > self.released_quantity:
            errors['activated_quantity'] = ValidationError(
                'Количество активированных не может быть '
                'больше количества выпущенных')
        if self.start_active_date > self.end_active_date:
            errors['start_active_date'] = ValidationError(
                'Начало активного периода не может быть больше конца периода'
            )
        if self.company.confirmed != True:
            errors['company'] = ValidationError(
                'Не подверженные компании не может создать купоны!'
            )
        if errors:
            raise ValidationError(errors)

    @property
    def get_company_name(self):
        return self.company.company_name

    def get_similar_products(self):
        return (
            Coupon.objects
            .filter(subcategory=self.subcategory)
            .exclude(id=self.id)
            .order_by('?')[:4]
        )


class CouponMapLocation(DoubleGisMixin, models.Model):
    """Map coordinates for coupon"""
    coupon = models.ForeignKey(
        Coupon, on_delete=models.CASCADE, verbose_name='Купон',
        related_name='map_locations',
    )
    address = map_fields.AddressField(
        'Адрес', max_length=200, help_text='Для филиала компании')
    geolocation = map_fields.GeoLocationField('Координаты')

    class Meta:
        verbose_name_plural = 'Координаты адреса для купонов'
        verbose_name = 'Координаты адреса для купонов'

    def __str__(self):
        return f'Координаты {self.address} {self.geolocation}'


class MapLocationPhoneNumber(DoubleGisMixin, models.Model):
    """Phone number for map coordinates"""
    map_location = models.ForeignKey(
        CouponMapLocation, on_delete=models.CASCADE, verbose_name='Адрес',
        related_name='phone_numbers',
    )
    phone_number = models.CharField(
        'Номер телефона', max_length=255, help_text='Для филиала компании'
    )

    class Meta:
        verbose_name_plural = 'Номера телефонов филиала'
        verbose_name = 'Номер телефона филиала'

    def __str__(self):
        return f'Номер телефона филиала {self.phone_number}'


class CouponImage(models.Model):
    """
    Additional images for coupons
    """

    coupon = models.ForeignKey(
        Coupon, on_delete=models.CASCADE, verbose_name='Купон',
        related_name='images',
    )
    image = models.ImageField(
        'Изображение', upload_to=generate_file_path,
        null=True, blank=True
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Изображения для купонов'
        verbose_name = 'Изобрежение для купона'
        ordering = ('position',)

    def __str__(self):
        return f'изображение для {self.coupon.title}'


class BuyerCoupon(models.Model):
    """
    Buyer coupons
    """

    buyer = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name='Покупатель',
        related_name='bought_coupons',
    )
    coupon = models.ForeignKey(
        Coupon, on_delete=models.PROTECT, verbose_name='Купон',
        related_name='bought_coupons',
    )
    is_activated = models.BooleanField(
        'Активировали?', default=False,
    )
    qr_code_image = models.ImageField(
        'QR код', upload_to=generate_file_path,
    )
    bought = models.BooleanField(
        'Куплено', default=False
    )
    bought_at = models.DateTimeField(
        'Куплено в', auto_now_add=True,
    )
    activated_at = models.DateTimeField(
        'Активировано в', null=True,
    )

    class Meta:
        verbose_name_plural = 'Покупатели купонов'
        verbose_name = 'Купленные купоны'
        indexes = (
            models.Index(fields=('buyer', 'coupon',)),
        )
        index_together = (
            ('buyer', 'coupon'),
        )

    def __str__(self):
        return f'{self.buyer} купил {self.coupon}'


@receiver(post_save, sender=BuyerCoupon)
def create_qr_code_image(instance: BuyerCoupon, **kwargs) -> None:
    if not instance.qr_code_image:
        from django.urls import reverse

        host = settings.CURRENT_HOST
        encrypted_info: bytes = encrypt(
            bytes(str(instance.id), encoding='utf-8'),
            instance.coupon.company.id)
        encrypted_info: str = encrypted_info.decode('utf-8')
        qrcode_image = qrcode.make(
            f"{host}{reverse('qr-code-activate')}?qr_token={encrypted_info}"
        )
        canvas = Image.new('RGB', (qrcode_image.pixel_size, qrcode_image.pixel_size), 'white')
        ImageDraw.Draw(canvas)
        canvas.paste(qrcode_image)
        file_name = f'qr-code-{instance.id}.png'
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        instance.qr_code_image.save(file_name, File(buffer), save=False)
        canvas.close()
        instance.save()
