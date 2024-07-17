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
        'Coupon', on_delete=models.CASCADE, null=True, blank=True, default=None)
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
            current_time = datetime.datetime.now().time()
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
