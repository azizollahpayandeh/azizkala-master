from django.db import models
from django.utils.translation import gettext as _
from django.utils.safestring import mark_safe
from django.core.validators import MaxValueValidator, MinValueValidator


class Base(models.Model):
    title = models.CharField(_('Title'), max_length=20, unique=True)
    image = models.ImageField(_('Image'), upload_to='other_images/', null=True, blank=True)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    class Meta:
        ordering = ('title', )

    def __str__(self):
        return self.title


class Images(models.Model):
    image = models.ImageField(_('Image'), upload_to='images/')

    class Meta:
        verbose_name = 'Image'
        verbose_name_plural = 'Images'

    def __str__(self):
        return self.image.name


class Category(Base):

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Brand(Base):
    pass


class Size(models.Model):
    SIZE_CHOICES = (
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('XXXL', 'XXXL'),
    )

    size = models.CharField(choices=SIZE_CHOICES, max_length=5)
    quantity = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.size


class Color(models.Model):
    name = models.CharField(max_length=25, verbose_name='Color Name')
    code = models.CharField(max_length=10, default='#FF0000', null=True, blank=True)

    def __str__(self):
        return self.name

    def color_tag(self):
        if self.code is not None:
            return mark_safe('<p style="background-color:{}">رنگ</p>'.format(self.code))
        else:
            return ""


class Product(models.Model):
    name = models.CharField(_('Product Name'), max_length=100)
    complete_descriptions = models.TextField(_('Product Descriptions'), max_length=256)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Product Category')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Product Brand')
    cover_image = models.ForeignKey(Images, on_delete=models.CASCADE, verbose_name='Cover Image')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    def __str__(self):
        return self.name


class AvailableManager(models.Manager):
    def get_queryset(self):
        return super(AvailableManager, self).get_queryset().filter(product__is_available=True, quantity__gte=1)


class ProductFeature(models.Model):
    key = models.CharField(_('Subject'), max_length=30, default='Display Size')
    value = models.CharField(_('Subject Value'), max_length=30, default='6 inch')
    # extra_cost = models.PositiveSmallIntegerField(_('Extra Cost For This Option'), null=True, blank=True, default=0)

    def __str__(self):
        return f'{self.key} - {self.value}'


class ProductVariation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_model = models.CharField(_('Product Model'), max_length=30, null=True, blank=True)
    rate = models.DecimalField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0, decimal_places=1, max_digits=2)
    features = models.ManyToManyField(ProductFeature, verbose_name="Features")
    color = models.ManyToManyField(Color, verbose_name='Product Colors')
    size = models.ManyToManyField(Size)
    images = models.ManyToManyField(Images, verbose_name='Product Images')
    price = models.PositiveIntegerField(_('Product Price'), )
    discount = models.PositiveSmallIntegerField(_('Product Discount'), default=0)
    quantity = models.PositiveSmallIntegerField(_('Product Quantity'), default=1)
    available = AvailableManager()
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    objects = models.Manager()

    def __str__(self):
        return f'{self.product.name} {self.product_model}'

    def product_name(self):
        return f'{self.product.name} {self.product_model}'

    def is_available(self):
        return True if self.quantity >= 1 and self.product.is_available else False

    @property
    def price_with_discount(self):
        return self.price * (1 - self.discount / 100) if self.discount else None

    # def price_with_discount_and_extra(self):
    #     features_extra_cost = [feature.extra_cost for feature in self.features.all()]
    #     return (self.price + sum(features_extra_cost)) * self.price_with_discount()
