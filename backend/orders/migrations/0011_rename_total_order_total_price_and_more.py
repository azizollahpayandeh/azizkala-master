# Generated by Django 5.0.4 on 2024-07-16 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_alter_order_cart_alter_order_coupon_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='total',
            new_name='total_price',
        ),
        migrations.AddField(
            model_name='order',
            name='total_price_with_coupon',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='order',
            name='total_price_with_discount',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
