# Generated by Django 5.0.4 on 2024-07-15 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0005_remove_cart_product_cart_cart_items_cart_coupon'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='total',
            field=models.PositiveIntegerField(default=0),
        ),
    ]