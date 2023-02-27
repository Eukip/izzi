# Generated by Django 3.2 on 2021-05-14 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0005_auto_20210510_1859'),
    ]

    operations = [
        migrations.AddField(
            model_name='socialnetwork',
            name='description',
            field=models.TextField(blank=True, verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='socialnetwork',
            name='whatsapp',
            field=models.CharField(blank=True, max_length=20, verbose_name='WhatsApp'),
        ),
        migrations.AlterField(
            model_name='socialnetwork',
            name='address',
            field=models.CharField(blank=True, max_length=255, verbose_name='Адрес'),
        ),
    ]
