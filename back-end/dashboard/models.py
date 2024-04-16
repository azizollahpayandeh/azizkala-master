from django.db import models
from accounts.models import User
from django.utils.translation import gettext as _


class Dashboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='User')
    first_name = models.CharField(_('First Name'), max_length=50)
    last_name = models.CharField(_('Last Name'), max_length=50)
    address = models.CharField(_('Address'), max_length=300)
    state = models.CharField(_('State'), max_length=30)
    city = models.CharField(_('City'), blank=True, max_length=30)
    postalcode = models.CharField(_('Postal Code'), max_length=20)
    # ip = models.CharField(_(''), blank=True, max_length=20)

    def __str__(self):
        return f'{self.user.phone_number} - {self.first_name} {self.last_name}'
