from django.contrib.auth.models import BaseUserManager
import re


class UserManager(BaseUserManager):
    """
    manager for create User/SuperUser .
    """
    def create_user(self, phone_number, password):
        regex_pattern = r'^09\d{9}$'
        match = re.match(regex_pattern, phone_number)
        if not phone_number or not match:
            raise ValueError("Enter Your Phone Number Correctly")

        user = self.model(phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password):
        user = self.create_user(phone_number, password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
