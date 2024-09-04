from django.contrib import admin
from .models import Cart, CartItem
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0  # Add one extra empty form for CartItem
    fields = ('product', 'quantity', )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price',
                    'total_price_with_discount',)
    inlines = [
        CartItemInline,
    ]

    def total_price(self, obj):
        return obj.total_price

    def total_price_with_discount(self, obj):
        return obj.total_price_with_discount()


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', ]
