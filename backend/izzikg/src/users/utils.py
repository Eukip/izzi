from django.core.validators import RegexValidator


regex_validator_for_phone = RegexValidator(
                regex=r'^\+?1?\d{10,20}$',
                message='Номер телефона должен быть введен в формате: '
                        '"+999999999999". Допускается от 10 до 20 цифр.'
            )
