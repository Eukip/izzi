# Generated by Django 3.2 on 2021-05-26 09:03

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0006_auto_20210514_0929'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coupon',
            name='description',
            field=ckeditor.fields.RichTextField(max_length=128, verbose_name='Описание'),
        ),
    ]
