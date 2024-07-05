from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    coupon_code = serializers.CharField(source='coupon')

    class Meta:
        model = Order
        fields = ('products', 'calc_total_price', 'code', 'status', 'admin_note', 'coupon_code', 'create_at', 'update_at')
        depth = 3
