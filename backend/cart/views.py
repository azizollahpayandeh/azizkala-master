from rest_framework import permissions, status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from products.models import ProductVariation
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


class CartView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)

        serializer = CartSerializer(cart)
        return Response(serializer.data)
        # if cart:
        # else:
        #     return Response({'message': 'سبد خرید فعالی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

    # def get(self, request, format=None):
    #     cart = Cart.objects.get(user=request.user)
    #     serializer = CartSerializer(cart)
    #     return Response(serializer.data)


class CartEditView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = CartItemSerializer(data=data)

        if serializer.is_valid():
            product = serializer.validated_data['product']
            quantity = serializer.validated_data['quantity']
            color = serializer.validated_data.get('color', '')
            size = serializer.validated_data.get('size', '')

            if not product.is_available:
                return Response(
                    status=status.HTTP_404_NOT_FOUND,
                    data={"detail": "this item is not available try another one !"})

            cart, _ = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart, product=product,
                defaults={'quantity': quantity, 'color': color, 'size': size}
            )

            if not created:
                cart_item.quantity += quantity
                cart_item.save()

            return Response(
                status=status.HTTP_200_OK,
                data={"detail": f'done!'})

        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data=serializer.errors)

    def delete(self, request, format=None):
        data = request.data.copy()
        serializer = CartItemSerializer(data=data)

        if serializer.is_valid():
            product = serializer.validated_data['product']
            cart = Cart.objects.get(user=request.user)
            cart_item = get_object_or_404(CartItem, cart=cart, product=product)
            cart_item.delete()

            return Response(
                status=status.HTTP_200_OK,
                data={"detail": 'one object removed', "code": "done"})

        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data=serializer.errors)
