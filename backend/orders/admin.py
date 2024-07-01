from django.contrib import admin
from .models import Order, Coupon


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('code', 'total', 'status', 'create_at')
    search_fields = ('code', 'total', 'dashboard__user__phone_number')
    list_filter = ('status', 'create_at')
    readonly_fields = ['code', 'create_at', 'update_at']

    fieldsets = (
        (None, {'fields': ('code', 'status', 'total',)}),
        (None, {'fields': ('dashboard', 'products', 'admin_note')}),
        (None, {'fields': ('create_at', 'update_at')}),
    )


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percent', 'coupon_type', 'coupon_validity_time')
    search_fields = ('code', )
    list_filter = ('coupon_validity_time', 'created_date')

    fieldsets = (
        (None, {'fields': ('code', 'discount_percent')}),
        (None, {'fields': ('coupon_type', )}),
        (None, {'fields': ('coupon_validity_time', )}),
    )
