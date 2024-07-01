from rest_framework import serializers
from .models import Cart


class CartSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = Cart
        fields = ('color', 'quantity', 'product', 'product_id', 'coupon')
        depth = 3
