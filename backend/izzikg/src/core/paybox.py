"""
Paybox configurations and confidential data.

Export all this constants to settings/base.py

For the full list of settings and their values, see
https://paybox.money/docs/
"""

import environ


env = environ.Env()

PAYBOX_URL = 'https://api.paybox.money/payment.php'
PAYBOX_PROJECT_ID = env.str('PAYBOX_PROJECT_ID')
PAYBOX_SECRET_KEY = env.str('PAYBOX_SECRET_KEY')

PAYBOX_SALT = env.str('PAYBOX_SALT')
PAYBOX_SUCCESS_URL_METHOD = 'GET'
PAYBOX_CURRENCY = 'KGS'
PAYBOX_LANGUAGE = 'ru'
PAYBOX_SUCCESS_URL = env.str('PAYBOX_SUCCESS_URL')
PAYBOX_RESULT_URL = env.str('PAYBOX_RESULT_URL')
PG_SITE_URL = env.str('PG_SITE_URL')
