# Generated by Django 3.2 on 2021-07-01 08:54

from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_2gis_maps.fields
import django_2gis_maps.mixins


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0009_auto_20210623_1256'),
    ]

    operations = [
        migrations.CreateModel(
            name='CouponMapLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', django_2gis_maps.fields.AddressField(help_text='Для филиала компании', max_length=200, verbose_name='Адрес')),
                ('geolocation', django_2gis_maps.fields.GeoLocationField(verbose_name='Координаты')),
            ],
            options={
                'verbose_name': 'Координаты адреса для купонов',
                'verbose_name_plural': 'Координаты адреса для купонов',
            },
            bases=(django_2gis_maps.mixins.DoubleGisMixin, models.Model),
        ),
        migrations.RemoveField(
            model_name='coupon',
            name='addresses',
        ),
        migrations.AddField(
            model_name='coupon',
            name='price_for_coupon',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))], verbose_name='Цена за купон'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='coupon',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, related_name='coupons', to='coupons.Tag', verbose_name='Тэги'),
        ),
        migrations.CreateModel(
            name='MapLocationPhoneNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(help_text='Для филиала компании', max_length=255, verbose_name='Номер телефона')),
                ('map_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phone_numbers', to='coupons.couponmaplocation', verbose_name='Адрес')),
            ],
            options={
                'verbose_name': 'Номер телефона филиала',
                'verbose_name_plural': 'Номера телефонов филиала',
            },
            bases=(django_2gis_maps.mixins.DoubleGisMixin, models.Model),
        ),
        migrations.AddField(
            model_name='couponmaplocation',
            name='coupon',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='map_locations', to='coupons.coupon', verbose_name='Купон'),
        ),
    ]
