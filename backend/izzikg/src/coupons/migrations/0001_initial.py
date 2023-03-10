# Generated by Django 3.1.8 on 2021-04-28 05:42

import ckeditor.fields
import coupons.utils
from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_auto_20210427_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True, verbose_name='Название')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категория',
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создано')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Обновлено')),
                ('title', models.CharField(max_length=255, verbose_name='Название купона')),
                ('description', ckeditor.fields.RichTextField(verbose_name='Описание')),
                ('preview_image', models.ImageField(help_text='появляет на превью купона, и в слайдере стоит первым', upload_to=coupons.utils.generate_file_path, verbose_name='Превью изображение')),
                ('discount_percent', models.PositiveSmallIntegerField(validators=[django.core.validators.MaxValueValidator(100)], verbose_name='Процент скидки')),
                ('start_active_date', models.DateField(verbose_name='Начало активного периода')),
                ('end_active_date', models.DateField(verbose_name='Конец активного периода')),
                ('released_quantity', models.PositiveSmallIntegerField(verbose_name='Количество выпущенных')),
                ('activated_quantity', models.PositiveSmallIntegerField(verbose_name='Количество активированных купонов')),
                ('price', models.DecimalField(decimal_places=2, editable=False, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))], verbose_name='Цена')),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))], verbose_name='Старая цена')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активно?')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coupons', to='users.partnercompany', verbose_name='Владелец')),
            ],
            options={
                'verbose_name': 'Купон',
                'verbose_name_plural': 'Купоны',
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True, verbose_name='Название')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
            ],
            options={
                'verbose_name': 'Тэг',
                'verbose_name_plural': 'Тэги',
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True, verbose_name='Название')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcategories', to='coupons.category', verbose_name='Категория')),
            ],
            options={
                'verbose_name': 'Подкатегория',
                'verbose_name_plural': 'Подкатегории',
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='CouponImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=coupons.utils.generate_file_path, verbose_name='Изображение')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
                ('coupon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='coupons.coupon', verbose_name='Купон')),
            ],
            options={
                'verbose_name': 'Изобрежение для купона',
                'verbose_name_plural': 'Изображения для купонов',
                'ordering': ('position',),
            },
        ),
        migrations.AddField(
            model_name='coupon',
            name='subcategory',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coupons', to='coupons.subcategory', verbose_name='Подкатегория'),
        ),
        migrations.AddField(
            model_name='coupon',
            name='tags',
            field=models.ManyToManyField(related_name='coupons', to='coupons.Tag', verbose_name='Тэги'),
        ),
    ]
