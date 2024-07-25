# Generated by Django 5.0.4 on 2024-07-15 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_coupon_used_count'),
        ('products', '0004_remove_productvariation_applied_coupon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(related_name='orders', to='products.productvariation', verbose_name='Order Items'),
        ),
    ]