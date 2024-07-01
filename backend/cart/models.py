from django.db import models
from django.utils.translation import gettext as _
from products.models import ProductVariation, Color
from accounts.models import User


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    product = models.ForeignKey(ProductVariation, on_delete=models.CASCADE, verbose_name='Product')
    quantity = models.PositiveSmallIntegerField(_('Quantity'), default=0)
    color = models.CharField(_('Color'), max_length=25)

    def __str__(self):
        return f'{self.user.phone_number} : {self.product.product}'

    # @property
    # def calculate_total_price_with_coupon(self):
    #     product_price = int(self.product.price)
    #
    #     if coupon := self.coupon:
    #         return int(product_price * (1 - coupon.discount_percent / 100))
    #
    #     return product_price

