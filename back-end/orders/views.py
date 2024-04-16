from rest_framework import permissions, generics, status, filters
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from cart.models import Cart
from products.models import ProductVariation
from .models import Order
from .serializers import OrderSerializer
from dashboard.models import Dashboard


class OrderView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            queryset = Order.objects.filter(dashboard__user__exact=request.user)
            serializer = OrderSerializer(queryset, many=True)

        except Dashboard.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': 'there is no order'})

        return Response(
            status=status.HTTP_200_OK,
            data=serializer.data)

    def post(self, request, format=None):
        serializer = OrderSerializer()

        try:
            dashboard = Dashboard.objects.get(user__exact=request.user)

        except Dashboard.DoesNotExist:

            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': 'Complete your dashboard informations'})

        carts = Cart.objects.filter(user__exact=request.user)

        if not carts:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': 'there is no cart to be an order'})

        order = Order.objects.create(dashboard=dashboard)
        admin_note = ''
        order.save(False)

        for cart in carts:
            if cart.quantity >= 1:
                order.products.add(get_object_or_404(ProductVariation,
                                                     id=cart.product.product.id,
                                                     color__name__contains=cart.color))

                order.total += cart.quantity * cart.product.price_with_discount
                admin_note += f'{cart.product.id}-{cart.product}-{cart.color}-{cart.quantity}&&'

            cart.delete()

        order.admin_note = admin_note[:-2]
        order.save()
        return Response(
            status=status.HTTP_200_OK,
            data={'detail': 'order created'})

    def delete(self, request, format=None):

        product_id = request.data['product_id']
        order = get_object_or_404(Order, dashboard__user__exact=request.user)
        order.products.clear(id=product_id)

        return Response(
            status=status.HTTP_200_OK,
            data={'detail': 'order created'})

