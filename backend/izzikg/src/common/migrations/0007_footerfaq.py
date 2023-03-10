# Generated by Django 3.2 on 2021-05-18 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0006_auto_20210514_0929'),
    ]

    operations = [
        migrations.CreateModel(
            name='FooterFAQ',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=128, verbose_name='Название')),
                ('description', models.TextField(default='', verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Вопрос в футере',
                'verbose_name_plural': 'Вопросы в футере',
            },
        ),
    ]
