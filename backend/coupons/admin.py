from django.contrib import admin
from .models import Coupon
# Register your models here.


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
