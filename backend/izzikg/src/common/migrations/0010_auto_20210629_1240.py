# Generated by Django 3.2 on 2021-06-29 06:40

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0009_privacypolicy_publicoffer_requisites'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privacypolicy',
            name='description',
            field=ckeditor.fields.RichTextField(verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='publicoffer',
            name='description',
            field=ckeditor.fields.RichTextField(verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='requisites',
            name='description',
            field=ckeditor.fields.RichTextField(verbose_name='Описание'),
        ),
    ]
