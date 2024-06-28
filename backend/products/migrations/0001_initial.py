# Generated by Django 5.0.4 on 2024-06-28 12:29

import django.core.validators
import django.db.models.deletion
import django.db.models.manager
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Base',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20, unique=True, verbose_name='Title')),
                ('image', models.ImageField(blank=True, null=True, upload_to='other_images/', verbose_name='Image')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
            ],
            options={
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='Color Name')),
                ('code', models.CharField(blank=True, default='#FF0000', max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/', verbose_name='Image')),
            ],
            options={
                'verbose_name': 'Image',
                'verbose_name_plural': 'Images',
            },
        ),
        migrations.CreateModel(
            name='ProductFeature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(default='Display Size', max_length=30, verbose_name='Subject')),
                ('value', models.CharField(default='6 inch', max_length=30, verbose_name='Subject Value')),
            ],
        ),
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='products.base')),
            ],
            bases=('products.base',),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='products.base')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
            bases=('products.base',),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Product Name')),
                ('complete_descriptions', models.TextField(max_length=256, verbose_name='Product Descriptions')),
                ('is_available', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.images', verbose_name='Product Image')),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.brand', verbose_name='Product Brand')),
                ('category', models.ManyToManyField(to='products.category', verbose_name='Product Category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_model', models.CharField(blank=True, max_length=30, null=True, verbose_name='Product Model')),
                ('rate', models.DecimalField(decimal_places=1, default=0, max_digits=2, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)])),
                ('price', models.PositiveIntegerField(verbose_name='Product Price')),
                ('discount', models.PositiveSmallIntegerField(default=0, verbose_name='Product Discount')),
                ('quantity', models.PositiveSmallIntegerField(default=1, verbose_name='Product Quantity')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('color', models.ManyToManyField(to='products.color', verbose_name='Product Colors')),
                ('features', models.ManyToManyField(to='products.productfeature', verbose_name='Features')),
                ('images', models.ManyToManyField(to='products.images', verbose_name='Product Images')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            managers=[
                ('available', django.db.models.manager.Manager()),
            ],
        ),
    ]
