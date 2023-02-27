from typing import Tuple


DJANGO_APPS: Tuple[str, ...] = (
    'jet',  # lib for customize admin
    'django_2gis_maps',
    'django.contrib.admin', 'django.contrib.staticfiles',
    'django.contrib.contenttypes', 'django.contrib.auth',
    'django.contrib.messages', 'django.contrib.sessions',
)
SIDE_APPS: Tuple[str, ...] = (
    'corsheaders', 'rest_framework.authtoken', 'rest_framework',
    'django_extensions', 'django_filters', 'django_fsm', 'silk',
    'ckeditor', 'ckeditor_uploader',
    'adminsortable2',
    'drf_yasg',
    'solo',
)
PROJECT_APPS: Tuple[str, ...] = ('common', 'users', 'coupons',)
message: str = 'no more than 5 apps per django project'
assert len(PROJECT_APPS) <= 5, message  # recommendation
DEFAULT_APPS: Tuple[str, ...] = DJANGO_APPS + SIDE_APPS + PROJECT_APPS
