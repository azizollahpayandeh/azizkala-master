from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from datetime import datetime, time
# Create your models here.


class Coupon(models.Model):
    COUPON_TYPE = (
        ('One Time', 'One Time'),
        ('With Time', 'With Time'),
        ('Permanent', 'Permanent'),
    )

    code = models.CharField(max_length=30, unique=True)
    discount_percent = models.PositiveSmallIntegerField(_("Discount Percent"))
    coupon_type = models.CharField(max_length=20, choices=COUPON_TYPE)
    coupon_validity_time = models.TimeField(
        null=True, blank=True, default=timezone.now)

    created_date = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, null=True, blank=True)

    used_count = models.PositiveIntegerField(_("Used Count"), default=0)

    def __str__(self):
        return f"{self.code} - {self.discount_percent}"

    def calculate_discount_amount(self, product_price):
        return product_price * (self.discount_percent / 100)

    def is_valid(self, order_status):
        if self.coupon_type == 'Permanent':
            return True
        elif self.coupon_type == 'With Time':
            current_time = datetime.now().time()
            return self.coupon_validity_time > current_time
        elif self.coupon_type == 'One Time':
            return self.used_count < 1 and order_status == 'OnPay'
        else:
            return False

    # def apply_coupon(self, coupon):
    #     if coupon.is_valid():
    #         discount_amount = coupon.calculate_discount_amount(self.price)
    #         self.discounted_price = self.price - discount_amount
    #         self.applied_coupon = coupon
    #         self.save()
    #     else:
    #         raise ValueError("Coupon is not valid.")

    # def get_applied_coupon(self):
    #     if self.discount > 0 and self.product.coupons.exists():
    #         valid_coupons = self.product.coupons.filter(is_valid=True)
    #         if valid_coupons.exists():
    #             return valid_coupons.order_by('-discount_percent').first()
    #     return None
