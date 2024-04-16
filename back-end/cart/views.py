from rest_framework import permissions, status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from products.models import ProductVariation
from .models import Cart
from .serializers import CartSerializer


class CartView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        queryset = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(queryset, many=True)

        return Response(
            status=status.HTTP_200_OK,
            data=serializer.data)


class CartEditView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        serializer = CartSerializer(data=request.data)

        if serializer.is_valid():
            quantity = serializer.validated_data['quantity']
            color = serializer.validated_data['color']
            product_id = serializer.validated_data['product_id']
            product = get_object_or_404(ProductVariation, id=product_id)
            user = self.request.user

            if not product or not product.is_available:
                return Response(
                    status=status.HTTP_404_NOT_FOUND,
                    data={"detail": "this item is not available try another one !"})

            if cart := Cart.objects.get_or_create(user=user,
                                                  product=product,
                                                  color=color):
                cart[0].quantity += quantity
                cart[0].save()

                return Response(
                    status=status.HTTP_200_OK,
                    data={"detail": f'{quantity} quantity of product {product} added to your cart '})
            else:
                return Response(
                    status=status.HTTP_200_OK,
                    data={"detail": 'one object added'})

        return Response(
            status=status.HTTP_200_OK,
            data=serializer.errors)

    def delete(self, request, format=None):
        serializer = CartSerializer(data=request.data)

        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            color = serializer.validated_data['color']
            product = get_object_or_404(ProductVariation, id=product_id)
            user = self.request.user

            if not product or not product.is_available:
                return Response(
                    status=status.HTTP_404_NOT_FOUND,
                    data={"detail": "this item is not available try another one !"})

            if cart := get_object_or_404(Cart, user=user, product=product, color=color):
                cart.delete()

            return Response(
                status=status.HTTP_200_OK,
                data={"detail": 'one object removed', "code": "done"})

        return Response(
            status=status.HTTP_200_OK,
            data=serializer.errors)
