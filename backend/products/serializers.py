from rest_framework import serializers
from .models import Category, ProductVariation


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class ProductVariationSerializer(serializers.ModelSerializer):
    color = serializers.CharField(source='color.name')

    class Meta:
        model = ProductVariation
        fields = ('id', 'product_name', 'product_model', 'rate', 'product', 'features', 'color', 'images', 'size',
                  'price', 'discount', 'price_with_discount', 'quantity', 'is_available', 'created_at')
        depth = 3
