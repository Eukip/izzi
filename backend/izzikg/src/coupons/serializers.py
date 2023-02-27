from rest_framework import serializers as srz

from coupons.models import (
    Coupon, Category, Subcategory, Tag, CouponImage, BuyerCoupon,
    CouponMapLocation, MapLocationPhoneNumber, SubSubcategory
)
from users.models import (
    PartnerCompany, PartnerNetwork, PartnerCompanyMapLocation,
)


class AllCouponSerializer(srz.ModelSerializer):
    company_name = srz.CharField(source='get_company_name')
    company_logo = srz.SerializerMethodField(source='get_company_logo')
    price = srz.DecimalField(max_digits=10, decimal_places=0)
    old_price = srz.DecimalField(max_digits=10, decimal_places=0)

    class Meta:
        model = Coupon
        fields = (
            'id',
            'title',
            'preview_image',
            'discount_percent',
            'price',
            'old_price',
            'is_active',
            'conditions',
            'description',
            'company_name',
            'company_logo',
            'order',
            'price_for_coupon',
        )

    def get_company_logo(self, obj: Coupon):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.company.logo.url)


class CouponSerializer(srz.ModelSerializer):
    company_name = srz.CharField(source='get_company_name')
    company_logo = srz.SerializerMethodField(source='get_company_logo')
    is_favorite = srz.SerializerMethodField(source='get_is_favorite')
    is_bought = srz.SerializerMethodField(source='get_is_bought')
    price = srz.DecimalField(max_digits=10, decimal_places=0)
    old_price = srz.DecimalField(max_digits=10, decimal_places=0)

    class Meta:
        model = Coupon
        fields = (
            'id',
            'title',
            'preview_image',
            'discount_percent',
            'price',
            'old_price',
            'company_name',
            'company_logo',
            'is_favorite',
            'is_bought',
            'is_active',
            'conditions',
            'description',
            'order',
            'price_for_coupon',
        )

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        coupons = request.user.favorite_coupons.filter(coupon=obj)
        for coupon in coupons:
            if coupon.coupon == obj:
                return True
        return False

    def get_is_bought(self, obj):
        request = self.context.get('request')
        coupons = request.user.bought_coupons.filter(bought=True)
        for coupon in coupons:
            if coupon.coupon == obj:
                return True
        return False

    def get_company_logo(self, obj: Coupon):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.company.logo.url)


class CouponNameSerializer(srz.ModelSerializer):

    class Meta:
        model = Coupon
        fields = ['title']


class MyStocksSerializer(srz.ModelSerializer):
    total_stocks = srz.SerializerMethodField()

    class Meta:
        model = Coupon
        fields = ['id', 'title', 'total_stocks', 'company']

    @staticmethod
    def get_total_stocks(instance):
        return instance.released_quantity


class SubSubcategorySerializer(srz.ModelSerializer):

    class Meta:
        model = SubSubcategory
        fields = (
            'id',
            'title',
        )


class SubcategorySerializer(srz.ModelSerializer):
    sub_subcategories = SubSubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = Subcategory
        fields = (
            'id',
            'title',
            'icon',
            'sub_subcategories',
        )


class CategorySerializer(srz.ModelSerializer):
    subcategories = SubcategorySerializer(many=True,)

    class Meta:
        model = Category
        fields = (
            'id',
            'title',
            'subcategories',
        )


class TagSerializer(srz.ModelSerializer):

    class Meta:
        model = Tag
        fields = (
            'id',
            'title',
        )


class CouponImageSerializer(srz.ModelSerializer):
    class Meta:
        model = CouponImage
        fields = (
            'id',
            'image',
        )


class MapLocationPhonNumberSerializer(srz.ModelSerializer):
    class Meta:
        model = MapLocationPhoneNumber
        fields = (
            'id',
            'phone_number',
        )


class MapLocationSerializer(srz.ModelSerializer):
    phone_numbers = MapLocationPhonNumberSerializer(many=True)

    class Meta:
        model = CouponMapLocation
        fields = (
            'id',
            'address',
            'geolocation',
            'phone_numbers',
        )


class BuyerCouponSerializer(srz.ModelSerializer):

    sold_count = srz.IntegerField(source='coupon.bought_quantity')
    discount_percent = srz.IntegerField(source='coupon.discount_percent')
    coupon_title = srz.CharField(source='coupon.title')

    class Meta:
        model = BuyerCoupon
        fields = (
            'id',
            'qr_code_image',
            'coupon_title',
            'sold_count',
            'discount_percent',
        )


class CheckPurchaseSerializer(srz.ModelSerializer):
    """Class to check the purchase"""

    class Meta:
        model = BuyerCoupon
        fields = (
            'bought',
        )


class CouponDetailSerializer(CouponSerializer):
    """User is authenticated"""

    images = CouponImageSerializer(many=True)
    similar_products = CouponSerializer(source='get_similar_products', many=True)
    qr_coupon = srz.SerializerMethodField()
    map_locations = MapLocationSerializer(many=True)
    start_active_date = srz.DateField(format="%d-%m-%Y")
    end_active_date = srz.DateField(format="%d-%m-%Y")

    class Meta:
        model = Coupon
        fields = (
            'id',
            'title',
            'description',
            'conditions',
            'preview_image',
            'discount_percent',
            'price_for_coupon',
            'price',
            'old_price',
            'company_id',
            'company_name',
            'company_logo',
            'is_favorite',
            'is_bought',
            'start_active_date',
            'end_active_date',
            'bought_quantity',
            'images',
            'similar_products',
            'qr_coupon',
            'map_locations',
        )

    def get_qr_coupon(self, obj: Coupon):
        if user := self.context['request'].user.is_authenticated:
            buyer_coupon = (
                BuyerCoupon.objects
                .filter(buyer=user, coupon=obj, is_activated=False)
                .first()
            )
            if buyer_coupon:
                return BuyerCouponSerializer(buyer_coupon).data


class CouponDetailIsSerializer(AllCouponSerializer):
    """User not is authenticated"""
    images = CouponImageSerializer(many=True)
    similar_products = AllCouponSerializer(source='get_similar_products', many=True)
    qr_coupon = srz.SerializerMethodField()
    map_locations = MapLocationSerializer(many=True)
    start_active_date = srz.DateField(format="%d-%m-%Y")
    end_active_date = srz.DateField(format="%d-%m-%Y")

    class Meta:
        model = Coupon
        fields = (
            'id',
            'title',
            'description',
            'conditions',
            'preview_image',
            'discount_percent',
            'price_for_coupon',
            'price',
            'old_price',
            'company_id',
            'company_name',
            'company_logo',
            'start_active_date',
            'end_active_date',
            'bought_quantity',
            'images',
            'similar_products',
            'qr_coupon',
            'map_locations',
        )

    def get_qr_coupon(self, obj: Coupon):
        if user := self.context['request'].user.is_authenticated:
            buyer_coupon = (
                BuyerCoupon.objects
                .filter(buyer=user, coupon=obj, is_activated=False)
                .first()
            )
            if buyer_coupon:
                return BuyerCouponSerializer(buyer_coupon).data


class PartnerNetworkSerializer(srz.ModelSerializer):

    class Meta:
        model = PartnerNetwork
        fields = (
            'instagram',
            'facebook',
            'whatsapp',
            'telegram',
            'vkontakte',
            'odnoklassniki',
        )


class PartnerCompanyMapLocationSerializer(srz.ModelSerializer):

    class Meta:
        model = PartnerCompanyMapLocation
        fields = (
            'address',
            'phone',
            'geolocation',
        )


class PartnerCompanySerializer(srz.ModelSerializer):
    coupons = CouponSerializer(many=True)
    network = PartnerNetworkSerializer()
    coordinates = PartnerCompanyMapLocationSerializer(many=True)

    class Meta:
        model = PartnerCompany
        fields = (
            'id',
            'company_name',
            'logo',
            'address',
            'email',
            'phone1',
            'phone2',
            'phone3',
            'description',
            'network',
            'coupons',
            'coordinates',
        )


class PartnerCompanyAnonymUserSerializer(srz.ModelSerializer):
    coupons = AllCouponSerializer(many=True)
    network = PartnerNetworkSerializer()
    coordinates = PartnerCompanyMapLocationSerializer(many=True)

    class Meta:
        model = PartnerCompany
        fields = (
            'id',
            'company_name',
            'logo',
            'address',
            'email',
            'phone1',
            'phone2',
            'phone3',
            'description',
            'network',
            'coupons',
            'coordinates',
        )
