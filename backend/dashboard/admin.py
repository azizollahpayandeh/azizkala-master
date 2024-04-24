from django.contrib import admin
from .models import Dashboard


@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'state', 'city', 'postalcode')
    search_fields = ('user__phone_number', 'postalcode')
    list_filter = ('user', 'state', 'city')

    fieldsets = (
        (None, {'fields': ('user', 'first_name', 'last_name',)}),
        (None, {'fields': ('address', 'state', 'city', 'postalcode')}),
    )
