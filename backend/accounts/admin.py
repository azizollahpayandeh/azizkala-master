from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, Otp, IPAddress


admin.site.unregister(Group)


@admin.register(IPAddress)
class IPAddressAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'created_at', 'user')
    readonly_fields = ['ip_address', 'created_at', 'user']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'username', 'is_staff',
                    'is_active', 'is_superuser', 'created_at', )
    readonly_fields = ['created_at', ]
    list_filter = ('is_superuser', )
    search_fields = ('username', 'phone_number')
    ordering = ('created_at',)


@admin.register(Otp)
class OtpAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'code', 'created_at')
    search_fields = ('phone_number', 'code')
    ordering = ('created_at', )
