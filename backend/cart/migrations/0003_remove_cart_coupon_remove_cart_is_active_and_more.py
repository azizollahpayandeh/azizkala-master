# Generated by Django 5.0.4 on 2024-08-30 08:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0002_cartitem_color_cartitem_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='coupon',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='products',
        ),
    ]
