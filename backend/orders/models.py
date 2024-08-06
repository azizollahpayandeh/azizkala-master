from django.db import models
from django.utils.translation import gettext as _
from accounts.models import User
from dashboard.models import Dashboard
from cart.models import Cart
from products.models import ProductVariation
from coupons.models import Coupon
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
    dashboard = models.ForeignKey(
        Dashboard, on_delete=models.CASCADE, verbose_name='User Info', default=None)
    cart = models.OneToOneField(
        Cart, verbose_name='Order Items', on_delete=models.CASCADE, related_name='order', null=True, blank=True, default=None)
    admin_note = models.CharField(
        _('Note'), null=True, blank=True, max_length=500)
    total_price = models.PositiveIntegerField(default=0)
    total_price_with_discount = models.PositiveIntegerField(default=0)
    total_price_with_coupon = models.PositiveIntegerField(default=0)
    coupon = models.ForeignKey(
        Coupon, on_delete=models.CASCADE, null=True, blank=True, default=None)
    code = models.CharField(_('Order Code'), max_length=11,
                            editable=False, unique=True, default=generate_random_string)
    status = models.CharField(
        _('Order Status'), max_length=20, choices=STATUS, default='OnPay')
    create_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    update_at = models.DateTimeField(_('Updated At'), auto_now=True)

    def __str__(self):
        return self.code

    def calc_price_with_coupon(self):
        total_price_with_discount = self.cart.total_price_with_discount()
        if self.coupon:
            total_price_with_coupon = self.cart.apply_coupon(
                self.coupon, total_price_with_discount)
        else:
            total_price_with_coupon = total_price_with_discount
        return total_price_with_coupon

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_random_string()
        self.total_price = self.cart.total_price
        self.total_price_with_discount = self.cart.total_price_with_discount()
        self.total_price_with_coupon = self.calc_price_with_coupon()
        super().save(*args, **kwargs)

    def coupon_applied(self, obj):
        return bool(obj.coupon)
    coupon_applied.boolean = True
    coupon_applied.short_description = 'Coupon Applied'

    # def update_product_quantities(self):
    #     for item in self.cart.cart_items.all():
    #         item.decrease_product_quantity(item.quantity)
    #         item.save()
