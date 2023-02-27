# Generated by Django 3.2 on 2021-06-25 07:34

from django.db import migrations
import django_2gis_maps.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_partnercompany_logo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='partnercompanymaplocation',
            name='coordinates',
        ),
        migrations.AddField(
            model_name='partnercompanymaplocation',
            name='geolocation',
            field=django_2gis_maps.fields.GeoLocationField(default=123, verbose_name='Координаты'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='partnercompanymaplocation',
            name='address',
            field=django_2gis_maps.fields.AddressField(max_length=200, verbose_name='Адрес'),
        ),
    ]
