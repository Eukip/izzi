# Generated by Django 3.1.8 on 2021-05-07 08:05

import coupons.utils
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('coupons', '0004_auto_20210505_2244'),
    ]

    operations = [
        migrations.CreateModel(
            name='BuyerCoupon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_activated', models.BooleanField(default=False, verbose_name='Активировали?')),
                ('qr_code_image', models.ImageField(upload_to=coupons.utils.generate_file_path, verbose_name='QR код')),
                ('bought_at', models.DateTimeField(auto_now_add=True, verbose_name='Куплено в')),
                ('activated_at', models.DateTimeField(null=True, verbose_name='Активировано в')),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='bought_coupons', to=settings.AUTH_USER_MODEL, verbose_name='Покупатель')),
                ('coupon', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='bought_coupons', to='coupons.coupon', verbose_name='Купон')),
            ],
            options={
                'verbose_name': 'Купленные купоны',
                'verbose_name_plural': 'Покупатели купонов',
            },
        ),
        migrations.AddIndex(
            model_name='buyercoupon',
            index=models.Index(fields=['buyer', 'coupon'], name='coupons_buy_buyer_i_608eb2_idx'),
        ),
        migrations.AlterIndexTogether(
            name='buyercoupon',
            index_together={('buyer', 'coupon')},
        ),
    ]
