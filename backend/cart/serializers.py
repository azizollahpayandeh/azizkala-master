from rest_framework import serializers
from .models import Cart, CartItem

from products.models import ProductVariation


class CartItemSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    product = serializers.PrimaryKeyRelatedField(
        queryset=ProductVariation.objects.all()
    )
    total_price = serializers.SerializerMethodField()
    total_price_with_discount = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity', 'size', 'color', 'cover_image',
                  'total_price', 'total_price_with_discount')
        read_only_fields = ('cover_image', 'total_price', 'total_price_with_discount')
        depth = 3

    def get_total_price(self, obj):
        return obj.cart_price()

    def get_total_price_with_discount(self, obj):
        return obj.cart_price_with_discount

    def get_cover_image(self, obj):
        return obj.product.product.cover_image.image.url

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_price_with_discount = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ('id', 'user', 'cart_items', 'total_price', 'total_price_with_discount')
        depth = 3

    def get_total_price(self, obj):
        return obj.total_price

    def get_total_price_with_discount(self, obj):
        return obj.total_price_with_discount

    # def get_total_price_with_coupon(self, obj):
    #     return obj.total_price_with_coupon
