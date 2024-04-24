from rest_framework import permissions, generics, status, filters
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Category, ProductVariation
from .serializers import CategorySerializer, ProductVariationSerializer


class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny, ]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', ]


class ProductView(generics.ListAPIView):
    queryset = ProductVariation.available.all()
    serializer_class = ProductVariationSerializer
    permission_classes = [permissions.AllowAny, ]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['short_description', 'product__name', 'product__category__title', 'product__brand__title']
    ordering_fields = ['created_at', ]
    # pagination_class =


class ProductDetailView(APIView):
    def get (self, request, id, format=None):
        queryset = get_object_or_404(ProductVariation, id=id)
        serializer = ProductVariationSerializer(queryset)

        return Response(
            status=status.HTTP_200_OK,
            data=serializer.data)
