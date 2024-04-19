from django.contrib import admin
from .models import Order


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
