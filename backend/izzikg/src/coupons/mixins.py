import datetime
from typing import List

from dateutil.utils import today
from django.db.models import QuerySet, Q

from users.exceptions import NotValidQueryParamException
from .models import Coupon


class UserCouponsQueryParamsMixin:
    """Getting coupons via query params"""

    def update_coupons_qs(self, qs: QuerySet[Coupon]):
        if query_params := self.request.query_params:
            coupon_status = query_params.get('status')
            if coupon_status == 'active':
                qs = self._qs_get_active_coupons(qs)
            elif coupon_status == 'activated':
                qs = self._qs_get_activated_coupons(qs)
            elif coupon_status == 'expired':
                qs = self._qs_get_expired_coupons(qs)
            else:
                qs = qs.none()

        return qs

    @staticmethod
    def _qs_get_active_coupons(qs: QuerySet[Coupon]):
        qs = qs.filter(
            is_active=True, start_active_date__lte=today(),
            end_active_date__gte=today(),
        )
        return qs

    @staticmethod
    def _qs_get_activated_coupons(qs: QuerySet[Coupon]):
        qs = qs.filter(bought_coupons__is_activated=True)
        return qs

    @staticmethod
    def _qs_get_expired_coupons(qs: QuerySet[Coupon]):
        today = datetime.date.today()
        qs = qs.filter(end_active_date__lt=today)
        return qs


class CouponQueryParamsMixin:
    """Updating queryset via query params"""

    def update_coupon_qs(self, qs: QuerySet[Coupon]):
        if query_params := self.request.query_params:
            if tags := query_params.get('tags'):
                qs = self._qs_filter_by_tag(qs, tags)
            if sort_by := query_params.get('sort_by'):
                qs = self._qs_order_by_field(qs, sort_by)

        return qs

    @staticmethod
    def _qs_filter_by_tag(qs: QuerySet[Coupon], tags: str):
        try:
            tag_list: List[int] = [int(i) for i in tags.split(',')]
        except ValueError:
            raise NotValidQueryParamException

        qs = qs.filter(tags__in=tag_list)
        return qs

    @staticmethod
    def _qs_order_by_field(qs: QuerySet[Coupon], sort_by: str):
        if sort_by not in ('-price', 'price', '-created_at'):
            raise NotValidQueryParamException

        qs = qs.order_by(sort_by)
        return qs
