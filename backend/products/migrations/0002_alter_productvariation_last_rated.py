# Generated by Django 5.0.4 on 2024-08-04 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariation',
            name='last_rated',
            field=models.DateTimeField(default=None),
        ),
    ]
