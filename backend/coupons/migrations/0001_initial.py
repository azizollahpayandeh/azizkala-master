# Generated by Django 5.0.4 on 2024-08-05 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=30, unique=True)),
                ('discount_percent', models.PositiveSmallIntegerField(verbose_name='Discount Percent')),
                ('coupon_type', models.CharField(choices=[('One Time', 'One Time'), ('With Time', 'With Time'), ('Permanent', 'Permanent')], max_length=20)),
                ('coupon_validity_time', models.TimeField(blank=True, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('used_count', models.PositiveIntegerField(default=0, verbose_name='Used Count')),
            ],
        ),
    ]
