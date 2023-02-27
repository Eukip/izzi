from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

from coupons.views import (
    CategoryListAPIView, TagListAPIView, CouponListAPIView,
    CouponCategoryListAPIView, CouponSubcategoryListAPIView,
    TagCategoryListAPIView, TagSubcategoryListAPIView, CouponRetrieveAPIView,
    CompanyRetrieveAPIView, CouponQRCodeRetrieveAPIView, MyStocksListAPIView,
    CouponQRCodeActivateAPIView, CouponSearchListAPIView, UserCouponListAPIView,
    BuyCouponAPIView, SearchListAPIView, ProcessBayCouponAPIView,
    CouponSubSubcategoryListAPIView, CheckPurchaseRetrieveAPIView,
    TrendCouponListAPIView
)


urlpatterns: tuple = (
    path('categories/', CategoryListAPIView.as_view()),
    path('company/<int:pk>/', CompanyRetrieveAPIView.as_view()),
    path('coupons/', include([
        path('', CouponListAPIView.as_view()),
        path('trends/', TrendCouponListAPIView.as_view()),
        path('me/', UserCouponListAPIView.as_view()),
        path('category/<int:cat_pk>/', CouponCategoryListAPIView.as_view()),
        path('subcategory/<int:subcat_pk>/', CouponSubcategoryListAPIView.as_view()),
        path('sub-subcategory/<int:subcat_pk>/', CouponSubSubcategoryListAPIView.as_view()),
        path('<int:pk>/', CouponRetrieveAPIView.as_view()),
        path('qr-code/<int:pk>/', CouponQRCodeRetrieveAPIView.as_view()),
        path('qr-code/activate/', CouponQRCodeActivateAPIView.as_view(),
             name='qr-code-activate'),
        path('search/', CouponSearchListAPIView.as_view()),
        path('search-text/', SearchListAPIView.as_view()),
        path('my-stocks/', MyStocksListAPIView.as_view()),
        path('buy/', csrf_exempt(BuyCouponAPIView.as_view())),
        path('process-buy/', ProcessBayCouponAPIView.as_view()),
        path('check-order/<int:pk>', CheckPurchaseRetrieveAPIView.as_view()),
    ])),
    path('tags/', include([
        path('', TagListAPIView.as_view()),
        path('category/<int:cat_pk>/', TagCategoryListAPIView.as_view()),
        path('subcategory/<int:subcat_pk>/', TagSubcategoryListAPIView.as_view()),
    ])
    )

)
