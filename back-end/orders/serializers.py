from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('products', 'price_with_discount', 'code', 'status', 'admin_note', 'create_at', 'update_at')
        depth = 3
