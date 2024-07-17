from rest_framework import serializers
from .models import Cart, CartItem

from products.models import ProductVariation


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=ProductVariation.objects.all()
    )
    total_price = serializers.SerializerMethodField()
    total_price_with_discount = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity',
                  'total_price', 'total_price_with_discount')

    def get_total_price(self, obj):
        return obj.total_price()

    def get_total_price_with_discount(self, obj):
        return obj.total_price_with_discount


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_price_with_discount = serializers.SerializerMethodField()
    total_price_with_coupon = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ('id', 'user', 'cart_items', 'coupon', 'total_price',
                  'total_price_with_discount', 'total_price_with_coupon')

    def get_total_price(self, obj):
        return obj.total_price

    def get_total_price_with_discount(self, obj):
        return obj.total_price_with_discount()

    def get_total_price_with_coupon(self, obj):
        return obj.total_price_with_coupon
