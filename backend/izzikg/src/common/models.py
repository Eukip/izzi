from django.core.validators import RegexValidator
from django.db import models

from solo.models import SingletonModel
from ckeditor.fields import RichTextField

from coupons.utils import generate_file_path


class DateTimeStampModel(models.Model):
    """Model for tracking additions and changes"""

    created_at = models.DateTimeField(
        'Создано', auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        'Обновлено', auto_now=True,
    )

    class Meta:
        abstract = True


class ImageSlider(models.Model):
    """
    Image slider on the home page
    """

    image = models.ImageField(
        'Изображение', upload_to=generate_file_path,
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Слайдер изображений на главной странице'
        verbose_name = 'Слайдер изображений'
        ordering = ('position',)


class ImageBlock(models.Model):
    """
    Image block on the home page
    """

    image = models.ImageField(
        'Изображение', upload_to=generate_file_path,
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Блок изображений'
        verbose_name = 'Изображение'
        ordering = ('position',)


# About us block

class SocialNetwork(SingletonModel):
    """
    Social network links in footer
    """

    vkontakte = models.URLField('Вконтакте', blank=True)
    instagram = models.URLField(blank=True)
    odnoklassniki = models.URLField('Одноклассники', blank=True)
    facebook = models.URLField(blank=True)
    whatsapp = models.CharField('WhatsApp', max_length=20, blank=True,)
    email = models.EmailField(blank=True)
    phone = models.CharField(
        'Номер телефона', max_length=20, blank=True,
        help_text='формат: +996 555 55 55 55\n'
                  'появляется в шапке сайта и в подвале'
    )
    address = models.CharField(
        'Адрес', max_length=255, blank=True
    )
    phone1 = models.CharField('Номер телефона 1', max_length=20, blank=True,)
    phone2 = models.CharField('Номер телефона 2', max_length=20, blank=True,)
    phone3 = models.CharField('Номер телефона 3', max_length=20, blank=True,)
    description = models.TextField(verbose_name='Описание', blank=True)

    class Meta:
        verbose_name_plural = 'Социальные сети/Контакты'
        verbose_name = 'Социальные сети/Контакты'


class FAQ(models.Model):
    """
    Questions & Answers
    """

    question = models.TextField(
        'Вопрос', max_length=500,
    )
    answer = models.TextField(
        'Ответ', max_length=1500,
    )
    position = models.PositiveSmallIntegerField(
        'Позиция', default=0,
    )

    class Meta:
        verbose_name_plural = 'Вопросы и ответы'
        verbose_name = 'Вопрос и ответ'
        ordering = ('position',)


class AboutUs(SingletonModel):
    """
    About us block
    """

    description = models.TextField(
        'Описание', max_length=10000,
    )

    class Meta:
        verbose_name_plural = 'О нас'
        verbose_name = 'О нас'


class OurMapLocation(models.Model):
    """
    Map coordinates for our map locations
    """

    coordinates = models.CharField(
        'Координаты', max_length=50, help_text='например: 42.876913, 74.600025',
        validators=[RegexValidator(
            regex='[1234567890,. ]',
            message='Разрешены символы 0-9,. ',
            code='invalid_username'
        )],
    )
    address = models.CharField(
        'Адрес', blank=True, max_length=100,
    )

    class Meta:
        verbose_name_plural = 'Координаты на карте'
        verbose_name = 'Координаты на карте'

    def __str__(self):
        return f"{self.address if self.address else f'адрес №{self.id}'} " \
               f"{self.coordinates}"


class FooterFAQ(models.Model):
    """
    Questions and answers for footer
    """

    title = models.CharField(
        verbose_name='Название', max_length=128, default=''
    )
    description = models.TextField(
        verbose_name='Описание', default=''
    )

    class Meta:
        verbose_name = 'Вопрос в футере'
        verbose_name_plural = 'Вопросы в футере'

    def __str__(self):
        return self.title


class HowToMakeOrder(SingletonModel):
    """
    how to make an order block
    """

    description = models.TextField(
        'Описание', max_length=10000,
    )

    class Meta:
        verbose_name_plural = 'Как сделать заказ'
        verbose_name = 'Как сделать заказ'


class PaymentMethod(SingletonModel):
    """
    Payment method block
    """

    description = models.TextField(
        'Описание', max_length=10000,
    )

    class Meta:
        verbose_name_plural = 'Способ оплаты'
        verbose_name = 'Способ оплаты'


class AbstractStaticClass(SingletonModel):
    """Abstract static class for static classes"""

    class Meta:
        abstract = True

    title = models.CharField(
        'Название', max_length=255,
    )
    description = RichTextField('Описание')

    def __str__(self):
        return self.title


class PrivacyPolicy(AbstractStaticClass):
    """Get Privacy policy"""

    class Meta:
        verbose_name_plural = 'Политика конфиденциальности'
        verbose_name = 'Политика конфиденциальности'


class PublicOffer(AbstractStaticClass):
    """Public offer"""

    class Meta:
        verbose_name_plural = 'Публичная оферта'
        verbose_name = 'Публичная оферта'


class Requisites(AbstractStaticClass):
    """Requisites"""

    class Meta:
        verbose_name_plural = 'Реквизиты'
        verbose_name = 'Реквизиты'
