from django.db import models
from django.utils.translation import gettext as _
from accounts.models import User
from dashboard.models import Dashboard
from cart.models import Cart
from products.models import ProductVariation
import random
import string


def generate_random_string():
    letters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(letters) for _ in range(10))


class Order(models.Model):
    STATUS = (
        ('OnPay', 'On Pay'),
        ('New', 'New'),
        ('Accepted', 'Accepted'),
        ('Preparing', 'Preparing'),
        ('OnShipping', 'On Shipping'),
        ('Completed', 'Completed'),
        ('Canceled', 'Canceled'),
        ('Referred', 'Referred'),
    )
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, verbose_name='User Info')
    products = models.ManyToManyField(ProductVariation, verbose_name='Order Items')
    admin_note = models.CharField(_('Note'),null=True, blank=True, max_length=500)
    total = models.PositiveIntegerField(default=0)
    coupon = models.ForeignKey('Coupon', on_delete=models.CASCADE, null=True, blank=True)
    code = models.CharField(_('Order Code'), max_length=11, editable=False, unique=True, default=generate_random_string)
    status = models.CharField(_('Order Status'), max_length=20, choices=STATUS, default='OnPay')
    create_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    update_at = models.DateTimeField(_('Updated At'), auto_now=True)

    def __str__(self):
        return self.code

    def calc_price_with_coupon(self):
        total = self.total
        if coupon := self.coupon and total:
            total -= int(total * (1 - coupon.discount_percent / 100))
        return total


class Coupon(models.Model):
    COUPON_TYPE = (
        ('One Time', 'One Time'),
        ('With Time', 'With Time'),
        ('Permanent', 'Permanent'),
    )

    code = models.CharField(max_length=30, unique=True)
    discount_percent = models.PositiveSmallIntegerField(_("Discount Percent"))
    coupon_type = models.CharField(max_length=20, choices=COUPON_TYPE)
    coupon_validity_time = models.TimeField(null=True, blank=True)

    created_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"{self.code} - {self.discount_percent}"
