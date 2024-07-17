from django.contrib import admin
from .models import Order, Coupon


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('code', 'total_price', 'total_price_with_discount',
                    'total_price_with_coupon', 'coupon_applied', 'status', 'create_at')
    search_fields = ('code', 'total_price', 'dashboard__user__phone_number')
    list_filter = ('status', 'create_at')
    readonly_fields = ['code', 'create_at', 'update_at', 'total_price',
                       'total_price_with_discount', 'total_price_with_coupon']

    fieldsets = (
        (None, {'fields': ('code', 'status', 'total_price', 'total_price_with_discount',
                           'total_price_with_coupon')}),
        (None, {'fields': ('dashboard', 'cart', 'coupon', 'admin_note')}),
        (None, {'fields': ('create_at', 'update_at')}),
    )

    def save_model(self, request, obj, form, change):
        if not obj.code:
            obj.code = generate_random_string()
        obj.total_price = obj.cart.total_price
        obj.total_price_with_discount = obj.cart.total_price_with_discount()
        obj.total_price_with_coupon = obj.calc_price_with_coupon()
        obj.save()

    def coupon_applied(self, obj):
        return bool(obj.coupon)
    coupon_applied.boolean = True
    coupon_applied.short_description = 'Coupon Applied'
# @admin.register(Coupon)
# class CouponAdmin(admin.ModelAdmin):
#     list_display = ('code', 'discount_percent', 'coupon_type', 'coupon_validity_time')
#     search_fields = ('code', )
#     list_filter = ('coupon_validity_time', 'created_date')

#     fieldsets = (
#         (None, {'fields': ('code', 'discount_percent')}),
#         (None, {'fields': ('coupon_type', )}),
#         (None, {'fields': ('coupon_validity_time', )}),
#     )


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percent', 'coupon_type',
                    'coupon_validity_time', 'is_valid', 'used_count')
    search_fields = ('code',)
    list_filter = ('coupon_validity_time', 'created_date', 'coupon_type')

    fieldsets = (
        (None, {'fields': ('code', 'discount_percent')}),
        (None, {'fields': ('coupon_type', 'coupon_validity_time', 'used_count')}),
    )

    def is_valid(self, obj):
        return obj.is_valid(order_status=None)  # یا هر مقداری که مناسب است
    is_valid.boolean = True
    is_valid.short_description = 'Valid'
