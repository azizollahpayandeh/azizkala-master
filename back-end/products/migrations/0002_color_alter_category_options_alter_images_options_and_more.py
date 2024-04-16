# Generated by Django 5.0.4 on 2024-04-16 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='Color Name')),
                ('code', models.CharField(blank=True, default='#FF0000', max_length=10, null=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Category', 'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelOptions(
            name='images',
            options={'verbose_name': 'Image', 'verbose_name_plural': 'Images'},
        ),
        migrations.AddField(
            model_name='productvariation',
            name='product_model',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='Product Model'),
        ),
        migrations.AddField(
            model_name='productvariation',
            name='short_description',
            field=models.CharField(default='abcd', max_length=50, verbose_name='Short Description (50 word)'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='productfeature',
            name='key',
            field=models.CharField(default='Display Size', max_length=30, verbose_name='Subject'),
        ),
        migrations.AlterField(
            model_name='productfeature',
            name='value',
            field=models.CharField(default='6 inch', max_length=30, verbose_name='Subject Value'),
        ),
        migrations.AddField(
            model_name='productvariation',
            name='color',
            field=models.ManyToManyField(to='products.color', verbose_name='Product Colors'),
        ),
    ]
