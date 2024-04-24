from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from django.utils.translation import gettext as _


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model.
    """
    phone_number = models.CharField(_('Phone Number'), max_length=11, unique=True)
    username = models.CharField(_('User Name'), max_length=25, null=True, blank=True)
    is_active = models.BooleanField(_('Is Active'), default=True)
    is_admin = models.BooleanField(_('Is Admin'), default=False)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'

    def __str__(self):
        return f'{self.phone_number}'

    @property
    def is_staff(self):
        return self.is_admin


class Otp(models.Model):
    """
    One Time Password is for register/login and forget password.
    """
    phone_number = models.CharField(_('Phone Number'), max_length=11)
    code = models.PositiveSmallIntegerField(_('Code'))
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    class Meta:
        unique_together = ('phone_number', 'code')

    def __str__(self):
        return f"{self.phone_number} - {self.code}"
