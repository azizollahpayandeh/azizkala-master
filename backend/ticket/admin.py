from django.contrib import admin
from .models import Ticket, Comment, Attachment
from django.utils.translation import gettext_lazy as _

# Admin for Ticket model


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'priority',
                    'created_at', 'user', 'assigned_to')
    list_filter = ('status', 'priority', 'created_at', 'user', 'assigned_to')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'status', 'priority', 'user', 'assigned_to')
        }),
        (_('Dates'), {
            'fields': ('created_at', 'updated_at'),
        }),
    )

# Admin for Comment model


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'user', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('content',)
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('ticket', 'user', 'content')
        }),
        (_('Dates'), {
            'fields': ('created_at',)
        }),
    )

# Admin for Attachment model


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'file', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('file',)
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('ticket', 'file')
        }),
        (_('Dates'), {
            'fields': ('created_at',)
        }),
    )
