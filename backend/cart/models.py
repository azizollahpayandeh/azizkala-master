from django.db import models
from django.utils.translation import gettext as _
from products.models import ProductVariation, Color
from accounts.models import User
# class Cart(models.Model):
#     user = models.ForeignKey(
#         User, on_delete=models.CASCADE, verbose_name='User')
#     product = models.ForeignKey(
#         ProductVariation, on_delete=models.CASCADE, verbose_name='Product', default=None)
#     quantity = models.PositiveSmallIntegerField(_('Quantity'), default=0)
#     color = models.CharField(_('Color'), max_length=25)

#     def __str__(self):
#         return f'{self.user.phone_number} : {self.product.product}'


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(
        'products.ProductVariation',
        through='CartItem',
        related_name='carts'
    )
    coupon = models.ForeignKey(
        'orders.Coupon',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='carts'
    )
    is_active = models.BooleanField(_("active"), default=True)

    def calc_price_with_coupon(self):
        total_price = self.total_price
        if self.coupon:
            total_price_with_discount = self.total_price_with_discount()
            total_price_with_coupon = self.apply_coupon(
                self.coupon, total_price_with_discount)
        else:
            total_price_with_coupon = total_price
        return total_price_with_coupon

    def total_price_with_discount(self):
        total_price_with_discount = 0
        for item in self.cart_items:
            total_price_with_discount += item.total_price_with_discount
        return total_price_with_discount

    @property
    def total_price_with_coupon(self):
        return self.calc_price_with_coupon()

    @property
    def cart_items(self):
        return self.cartitem_set.all()

    @property
    def total_price(self):
        return sum(item.total_price() for item in self.cart_items)

    def apply_coupon(self, coupon, total_price_with_discount):
        if coupon.is_valid(order_status='OnPay'):
            discount_amount = coupon.calculate_discount_amount(
                total_price_with_discount)
            return total_price_with_discount - discount_amount
        else:
            return total_price_with_discount


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(
        'products.ProductVariation',
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    quantity = models.PositiveIntegerField(default=1)
    total = models.PositiveIntegerField(default=0)

    def total_price(self, including_discount=False):
        if including_discount:
            price = self.product.price_with_discount
        else:
            price = self.product.price
        return price * self.quantity

    @property
    def total_price_with_discount(self):
        return self.total_price(including_discount=True)

    def save(self, *args, **kwargs):
        self.product.decrease_product_quantity(self.quantity)
        super().save(*args, **kwargs)

    @property
    def product_color(self):
        return self.product.color

    @property
    def product_name(self):
        return self.product.name

    # def add_to_cart(self, product_variation, quantity):
    #     if product_variation in self.cart_items.all():
    #         cart_item = self.cart_items.get(pk=product_variation.pk)
    #         cart_item.quantity += quantity
    #         cart_item.save()
    #     else:
    #         product_variation.quantity = quantity
    #         self.cart_items.add(product_variation)

    # def remove_from_cart(self, product_variation):
    #     if product_variation in self.cart_items.all():
    #         cart_item = self.cart_items.get(pk=product_variation.pk)
    #         cart_item.quantity -= 1
    #         if cart_item.quantity <= 0:
    #             self.cart_items.remove(product_variation)
    #         else:
    #             cart_item.save()

    # @property
    # def calculate_total_price_with_coupon(self):
    #     product_price = int(self.product.price)
    #
    #     if coupon := self.coupon:
    #         return int(product_price * (1 - coupon.discount_percent / 100))
    #
    #     return product_price
