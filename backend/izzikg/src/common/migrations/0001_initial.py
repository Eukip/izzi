# Generated by Django 3.1.8 on 2021-05-03 10:02

import coupons.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutUs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=10000, verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'О нас',
                'verbose_name_plural': 'О нас',
            },
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(max_length=500, verbose_name='Вопрос')),
                ('answer', models.TextField(max_length=1500, verbose_name='Ответ')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
            ],
            options={
                'verbose_name': 'Вопрос и ответ',
                'verbose_name_plural': 'Вопросы и ответы',
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='ImageBlock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=coupons.utils.generate_file_path, verbose_name='Изображение')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
            ],
            options={
                'verbose_name': 'Изображение',
                'verbose_name_plural': 'Блок изображений',
            },
        ),
        migrations.CreateModel(
            name='ImageSlider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=coupons.utils.generate_file_path, verbose_name='Изображение')),
                ('position', models.PositiveSmallIntegerField(default=1, verbose_name='Позиция')),
            ],
            options={
                'verbose_name': 'Слайдер изображений',
                'verbose_name_plural': 'Слайдер изображений на главной странице',
            },
        ),
        migrations.CreateModel(
            name='SocialNetwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vkontakte', models.URLField(blank=True, verbose_name='Вконтакте')),
                ('instagram', models.URLField(blank=True)),
                ('odnoklassniki', models.URLField(blank=True, verbose_name='Одноклассники')),
                ('facebook', models.URLField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, help_text='формат: +996 555 55 55 55\nпоявляется в шапке сайта и в подвале', max_length=20, verbose_name='Номер телефона')),
                ('play_market', models.URLField(blank=True)),
                ('app_store', models.URLField(blank=True)),
                ('phone1', models.CharField(blank=True, max_length=20, verbose_name='Номер телефона 1')),
                ('phone2', models.CharField(blank=True, max_length=20, verbose_name='Номер телефона 2')),
                ('phone3', models.CharField(blank=True, max_length=20, verbose_name='Номер телефона 3')),
            ],
            options={
                'verbose_name': 'Социальные сети/Контакты',
                'verbose_name_plural': 'Социальные сети/Контакты',
            },
        ),
    ]