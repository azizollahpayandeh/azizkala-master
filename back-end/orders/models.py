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
    total = models.PositiveSmallIntegerField(default=0)
    code = models.CharField(_('Order Code'), max_length=11, editable=False, unique=True, default=generate_random_string)
    status = models.CharField(_('Order Status'), max_length=20, choices=STATUS, default='OnPay')
    create_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    update_at = models.DateTimeField(_('Updated At'), auto_now=True)

    def __str__(self):
        return self.code

    def calc_total_price(self):
        return self.total
