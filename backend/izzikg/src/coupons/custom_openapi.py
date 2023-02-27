from drf_yasg import openapi


tags = openapi.Parameter(
    'tags', openapi.IN_QUERY,
    description="ID tags are transmitted separated by commas", type=openapi.TYPE_STRING
)
sort_by = openapi.Parameter(
    'sort_by', openapi.IN_QUERY,
    description='Accepted values: price or -price or -created_at', type=openapi.TYPE_STRING,
)
qr_token = openapi.Parameter(
    'qr_token', openapi.IN_QUERY,
    description='QR token will be give after scanning qr code image;\n'
                'After only coupon released user can activate this coupon',
    type=openapi.TYPE_STRING,
)
status = openapi.Parameter(
    'status', openapi.IN_QUERY,
    description="Accepted values: active, activated, expired",
    type=openapi.TYPE_STRING
)

tags_query_params = [tags, sort_by]
user_coupons_query_params = [status, ]
