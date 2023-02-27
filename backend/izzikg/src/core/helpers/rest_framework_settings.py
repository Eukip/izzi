import datetime

from types import MappingProxyType


VERSIONING = 'rest_framework.versioning.AcceptHeaderVersioning'
PAGINATION = 'rest_framework.pagination.PageNumberPagination'

REST_FRAMEWORK_SETTINGS = MappingProxyType(
    mapping={
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.AllowAny',
        ],
        'DEFAULT_AUTHENTICATION_CLASSES': [                               # new
            "rest_framework.authentication.SessionAuthentication",        # new
            "rest_framework_simplejwt.authentication.JWTAuthentication",  # new
        ],
        'DEFAULT_VERSIONING_CLASS': VERSIONING,
        'DEFAULT_VERSION': '1.0',
        'ALLOWED_VERSIONS': ('1.0',),
        'DEFAULT_PAGINATION_CLASS': PAGINATION,
        'PAGE_SIZE': 20,
    },
)

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(weeks=1000),
}
