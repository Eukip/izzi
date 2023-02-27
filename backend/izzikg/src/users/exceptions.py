from rest_framework.exceptions import APIException


class NotFoundUserPhoneException(APIException):
    status_code = 400

    default_detail = 'Не существует активного пользователя ' \
                     'с таким номером телефона'
    default_code = 'not_found_user'


class DuplicateUserPhoneException(APIException):
    status_code = 400
    default_code = 'duplicate_phone'
    default_detail = 'Уже существует пользователь с таким номером телефона'


class NotValidQueryParamException(APIException):
    status_code = 400
    default_code = 'not_valid_query_param'
    default_detail = 'Неправильный формат query param'


class MissingParameterInRequestBodyException(APIException):
    status_code = 400
    default_code = 'missing_parameters'
    default_detail = 'Отсутсвует параметры/параметр в теле запроса'


class MissingQueryParamsException(APIException):
    status_code = 400
    default_code = 'missing_query_params'
    default_detail = 'Отсутвует параметры/параметр в query params'


class NotValidQRToken(APIException):
    status_code = 400
    default_code = 'not_valid_qr_token'
    default_detail = 'Не валидный QR токен'


class NotFoundUserException(APIException):
    status_code = 406
    default_code = 'not_valid_phone_number'
    default_detail = 'Пользователя с таким номером не существует!'
