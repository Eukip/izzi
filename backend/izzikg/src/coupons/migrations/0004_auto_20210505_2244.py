# Generated by Django 3.1.8 on 2021-05-05 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0003_auto_20210428_1730'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='position',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Позиция'),
        ),
        migrations.AlterField(
            model_name='coupon',
            name='position',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Позиция'),
        ),
        migrations.AlterField(
            model_name='couponimage',
            name='position',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Позиция'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='position',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Позиция'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='position',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Позиция'),
        ),
    ]