from django.db import models
from django.utils.translation import gettext as _
from django.utils.safestring import mark_safe
from django.core.validators import MaxValueValidator, MinValueValidator


class Base(models.Model):
    title = models.CharField(_('Title'), max_length=20, unique=True)
    image = models.ImageField(
        _('Image'), upload_to='other_images/', null=True, blank=True)
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
    code = models.CharField(
        max_length=10, default='#FF0000', null=True, blank=True)

    def __str__(self):
        return self.name

    def color_tag(self):
        if self.code is not None:
            return mark_safe('<p style="background-color:{}">رنگ</p>'.format(self.code))
        else:
            return ""


class Product(models.Model):
    name = models.CharField(_('Product Name'), max_length=100)
    complete_descriptions = models.TextField(
        _('Product Descriptions'), max_length=256)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                 verbose_name='Product Category', null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,
                              verbose_name='Product Brand', null=True, blank=True)
    cover_image = models.ForeignKey(
        Images, on_delete=models.SET_NULL, verbose_name='Cover Image', null=True, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    def __str__(self):
        return self.name


class AvailableManager(models.Manager):
    def get_queryset(self):
        return super(AvailableManager, self).get_queryset().filter(product__is_available=True, quantity__gte=1)


class ProductFeature(models.Model):
    key = models.CharField(_('Subject'), max_length=30, default='Display Size')
    value = models.CharField(
        _('Subject Value'), max_length=30, default='6 inch')
    # extra_cost = models.PositiveSmallIntegerField(_('Extra Cost For This Option'), null=True, blank=True, default=0)

    def __str__(self):
        return f'{self.key} - {self.value}'


class ProductVariation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_model = models.CharField(
        _('Product Model'), max_length=30, null=True, blank=True)
    rate = models.DecimalField(validators=[MinValueValidator(
        0.0), MaxValueValidator(5.0)], default=0, decimal_places=1, max_digits=2)
    features = models.ManyToManyField(
        ProductFeature, verbose_name="Features", blank=True)
    color = models.ManyToManyField(
        Color, verbose_name='Product Colors', blank=True)
    size = models.ManyToManyField(
        Size, verbose_name='Product_sizes', blank=True)
    images = models.ManyToManyField(
        Images, verbose_name='Product Images', null=True, blank=True)
    price = models.PositiveIntegerField(_('Product Price'), )
    discount = models.PositiveSmallIntegerField(
        _('Product Discount'), default=0)
    quantity = models.PositiveSmallIntegerField(
        _('Product Quantity'), default=1)
    available = AvailableManager()
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)

    objects = models.Manager()

    average_rating = models.FloatField(default=0.0)
    total_rating = models.IntegerField(default=0)
    last_rated = models.DateTimeField(default=None)

    def update_rating(self, new_rating):
        self.total_rating += new_rating.score
        self.average_rating = self.total_rating / self.ratings.count()
        self.last_rated = new_rating.created_at
        self.save()

    def average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return ratings.aggregate(models.Avg('score'))['score__avg']
        return None

    def __str__(self):
        return f'{self.product.name} {self.product_model}'

    def product_name(self):
        return f'{self.product.name} {self.product_model}'

    def is_available(self):
        return True if self.quantity >= 1 and self.product.is_available else False

    @property
    def price_with_discount(self):
        discount_amount = self.calculate_discount_amount()
        return self.price - discount_amount

    def calculate_discount_amount(self):
        if self.discount:
            return self.price * (self.discount / 100)
        else:
            return 0

    def decrease_product_quantity(self, order_quantity):
        self.quantity -= order_quantity
        self.save()

    # def price_with_discount_and_extra(self):
    #     features_extra_cost = [feature.extra_cost for feature in self.features.all()]
    #     return (self.price + sum(features_extra_cost)) * self.price_with_discount()


#  ====================
