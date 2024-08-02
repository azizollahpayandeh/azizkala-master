from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db import models


class Ticket(models.Model):
    title = models.CharField(_("title"), max_length=50)
    description = models.TextField(_("description"))

    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, related_name='tickets')

    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return self.title

    @property
    def user_name(self):
        return self.user.username

    @property
    def user_email(self):
        return self.user.email

    @property
    def user_phone_number(self):
        return self.user.phone_number


class Comment(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    content = models.TextField(_("content"))
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.user}"


class Attachment(models.Model):
    file = models.FileField(_("file"), upload_to='ticket_attachments/')
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)

    def __str__(self):
        return self.file.name
