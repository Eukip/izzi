# TODO: always check for "python manage.py check --deploy"
from os.path import dirname, abspath, join
from types import MappingProxyType
from typing import Tuple, Dict, List

from corsheaders.defaults import default_methods, default_headers
from environ import Env

from .helpers import (
    DEFAULT_APPS, DEFAULT_LOCALE_PATHS, DEFAULT_LANGUAGES,
    DEFAULT_MIDDLEWARE, REST_FRAMEWORK_SETTINGS, STORAGES,
    DEFAULT_STORAGE, DEFAULT_TEMPLATES, DEFAULT_VALIDATORS,
    SIMPLE_JWT, SWAGGER_SETTINGS, CKEDITOR_CONFIGS,
)
from .paybox import *

BASE_DIR: str = dirname(dirname(abspath(__file__)))
# Environment variables
env: Env = Env()
Env.read_env()
# Sentry
SENTRY_DSN: str = env.str(var='SENTRY_DSN')
# Django
DEBUG: bool = env.bool(var='DEBUG')
SECRET_KEY: str = env.str(var='SECRET_KEY')
APPEND_SLASH: bool = True
ALLOWED_HOSTS: Tuple = ('*',)
INSTALLED_APPS: Tuple = DEFAULT_APPS
AUTH_USER_MODEL: str = "users.User"
MIDDLEWARE: Tuple = DEFAULT_MIDDLEWARE
ROOT_URLCONF: str = 'core.urls'
TEMPLATES: Tuple = DEFAULT_TEMPLATES
WSGI_APPLICATION: str = 'core.wsgi.application'
DATABASES: MappingProxyType = MappingProxyType({'default': env.db('DATABASE_URL')})
CONN_MAX_AGE: int = env.int(var='CONN_MAX_AGE')
AUTH_PASSWORD_VALIDATORS: Tuple = DEFAULT_VALIDATORS
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
# ASGI
ASGI_APPLICATION: str = 'core.asgi.application'
# Security
SECURE_BROWSER_XSS_FILTER: bool = True
SESSION_COOKIE_SECURE: bool = False
X_FRAME_OPTIONS: str = 'DENY'
SECURE_CONTENT_TYPE_NOSNIFF: bool = True
CSRF_COOKIE_SECURE: bool = False
# Localization
LOCALE_PATHS: List = DEFAULT_LOCALE_PATHS
LANGUAGES: Tuple = DEFAULT_LANGUAGES
LANGUAGE_CODE: str = 'en'
USE_I18N: bool = True
USE_L10N: bool = True
TIME_ZONE: str = env.str(var='TIME_ZONE')
USE_TZ: bool = True
STATIC_URL: str = '/static/'
STATIC_ROOT: str = join(BASE_DIR, 'staticfiles')
MEDIA_URL: str = '/media/'
MEDIA_ROOT: str = join(BASE_DIR, 'media')
CKEDITOR_UPLOAD_PATH: str = "ckeditor_uploads/"
# CorsHeaders
CORS_ORIGIN_ALLOW_ALL: bool = True
CORS_ALLOW_METHODS: Tuple = default_methods
CORS_ALLOW_HEADERS: Tuple = default_headers
CORS_ALLOW_CREDENTIALS: bool = True
# Nikita
NIKITA_LOGIN = env.str(var='NIKITA_LOGIN')
NIKITA_PASSWORD = env.str(var='NIKITA_PASSWORD')
NIKITA_SENDER = env.str(var='NIKITA_SENDER')
NIKITA_TEST = env.int(var='NIKITA_TEST', default=1)
# Rest framework
REST_FRAMEWORK: MappingProxyType = REST_FRAMEWORK_SETTINGS
# Storage
DEFAULT_FILE_STORAGE: str = STORAGES.get(
    env.str(var='WHERE_TO_KEEP_MEDIA'), DEFAULT_STORAGE
)
# TODO: will be used in future
# Silk
# SILKY_PYTHON_PROFILER: bool = True
# SILKY_META: bool = True
# SILKY_INTERCEPT_PERCENT: int = env.int(var='SILKY_INTERCEPT_PERCENT')
# SILKY_MAX_RECORDED_REQUESTS: int = 8192
# SILKY_AUTHENTICATION: bool = True
# SILKY_AUTHORISATION: bool = True
# SILKY_PERMISSIONS: Callable[[Any], Any] = lambda user: user.is_superuser

# for sending request for activate QR code in post_save signal
CURRENT_HOST: str = env.str('CURRENT_HOST')  # For example: http://izzi.kg

# Debug toolbar
if DEBUG:
    from .helpers.debug_settings import (
        DEFAULT_DEBUG_MIDDLEWARE, DEFAULT_DEBUG_INTERNAL_IPS,
        DEFAULT_DEBUG_TOOLBAR_PANELS, DEFAULT_DEBUG_APPS,
        DEFAULT_DEBUG_TOOLBAR_CONFIG,
    )

    # Debug
    INSTALLED_APPS += DEFAULT_DEBUG_APPS
    MIDDLEWARE += DEFAULT_DEBUG_MIDDLEWARE
    INTERNAL_IPS: Tuple = DEFAULT_DEBUG_INTERNAL_IPS
    DEBUG_TOOLBAR_PANELS: Tuple = DEFAULT_DEBUG_TOOLBAR_PANELS
    DEBUG_TOOLBAR_CONFIG: Dict = DEFAULT_DEBUG_TOOLBAR_CONFIG
