from django.contrib import admin
from .models import Cart


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'color')
    search_fields = ('user__phone_number', )
    list_filter = ('color', )

    fieldsets = (
        (None, {'fields': ('user', )}),
        (None, {'fields': ('product', )}),
        (None, {'fields': ('quantity', 'color')}),
    )
