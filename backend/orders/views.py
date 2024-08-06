from rest_framework import permissions, generics, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from cart.models import Cart
from products.models import ProductVariation
from dashboard.models import Dashboard
from coupons.models import Coupon

from .models import Order, Coupon
from .serializers import OrderSerializer


class OrderView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            queryset = Order.objects.filter(
                dashboard__user__exact=request.user)
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

        admin_note = ''
        products = []
        total = 0

        for cart in carts:
            try:
                if cart.quantity >= 1:
                    products.append(ProductVariation.objects.get(id=cart.product.id,
                                                                 color__name__contains=cart.color).id)

                    total += cart.quantity * cart.product.price if not cart.product.discount \
                        else cart.quantity * (cart.product.price * (1 - cart.product.discount / 100))

                    admin_note += f'{cart.product.id}-{
                        cart.product}-{cart.color}-{cart.quantity}&&'

                cart.delete()

            except ProductVariation.DoesNotExist:
                continue
        else:
            if products:
                order = Order.objects.create(dashboard=dashboard,
                                             admin_note=admin_note[:-2],
                                             total=total)

                if coupon_code := serializer.data['coupon_code']:
                    coupon = get_object_or_404(Coupon, code__exact=coupon_code)
                    if coupon:
                        order.coupons.add(coupon)

                order.products.add(*products)
                order.save()

                return Response(
                    status=status.HTTP_200_OK,
                    data={'detail': 'order created'})

            return Response(
                status=status.HTTP_200_OK,
                data={'detail': 'there is no product to be order'})

    def delete(self, request, format=None):
        if 'code' in request.data:
            code = request.data['code']
            order = get_object_or_404(
                Order, dashboard__user__exact=request.user, code__exact=code)
            # order.products.clear(id=product_id)
            order.status = 'Canceled'
            order.save()

            return Response(
                status=status.HTTP_200_OK,
                data={'detail': 'order cancelled'})

        return Response(
            status=status.HTTP_200_OK,
            data={'detail': 'enter order code'})
