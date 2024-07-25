from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import IPAddress


@receiver(user_logged_in)
def log_user_ip(sender, request, user, **kwargs):
    ip_address = request.META.get('REMOTE_ADDR')
    if ip_address:
        IPAddress.objects.get_or_create(ip_address=ip_address)
