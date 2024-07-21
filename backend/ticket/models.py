from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db import models


class Ticket(models.Model):
    title = models.CharField(_("title"), max_length=50)
    description = models.TextField(_("description"))
    status = models.CharField(_("status"), max_length=20, choices=(
        ('open', _('Open')),
        ('in_progress', _('In Progress')),
        ('closed', _('Closed')),
    ), default='in_progress')
    priority = models.CharField(_("priority"), max_length=20, choices=(
        ('low', _('Low')),
        ('medium', _('Medium')),
        ('high', _('High')),
    ), default='medium')
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)
    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, related_name='tickets')
    assigned_to = models.ForeignKey(
        'accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tickets')

    def __str__(self):
        return self.title


class Comment(models.Model):
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    content = models.TextField(_("content"))
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.ticket.title}"


class Attachment(models.Model):
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(_("file"), upload_to='ticket_attachments/')
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)

    def __str__(self):
        return self.file.name
