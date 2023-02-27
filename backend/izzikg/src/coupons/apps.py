from django.apps import AppConfig


class CouponsConfig(AppConfig):
    default_auto_field: str = 'django.db.models.BigAutoField'
    name: str = 'coupons'
    verbose_name: str = 'Купоны'
