from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import *


@admin.action(description="Mark selected products as available")
def mark_as_is_available(self, request, queryset, des):
    queryset.update(is_available=True)


@admin.action(description="Mark selected products as not-available")
def mark_as_not_available(self, request, queryset, des):
    queryset.update(is_available=False)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_category', 'brand', 'image_tag', 'created_at')
    search_fields = ('name', 'category', 'brand')
    list_filter = ('category', 'brand', 'created_at')
    actions = (mark_as_is_available, mark_as_not_available)

    fieldsets = (
        (None, {'fields': ('name', 'category', 'brand',)}),
        (None, {'fields': ('image', 'complete_descriptions')}),
        (None, {'fields': ('is_available', )}),
    )

    def image_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}"style="width:45px;height:45px;"/>', obj.image.image.url
            )
        return "-"

    def get_category(self, obj):
        return "\n".join([c.title for c in obj.category.all()])

    # image_tag.short_description = _('Image')


# class ProductFeatureInline(admin.TabularInline):
#     model = ProductFeature

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == "productvariation":
    #         kwargs["queryset"] = ProductFeature.objects.all()
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)

    # extra = 1


@admin.register(ProductVariation)
class ProductVariationAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'discount', 'price_with_discount', 'is_available', 'quantity', 'image_tag', 'created_at')
    search_fields = ('product__name', 'product__category', 'product__brand')
    list_filter = ('product__category', 'product__brand', 'created_at')    #<------------------------------- caustom_filter by quantity
    # inlines = (ProductFeatureInline, )            #<-------------------------------

    fieldsets = (
        (None, {'fields': ('product', 'product_model', 'rate', 'features', 'color', 'images',)}),
        (None, {'fields': ('price', 'discount', 'quantity')}),
    )

    def image_tag(self, obj):
        if _obj := obj.images.first():
            return format_html(
                '<img src="{}"style="width:45px;height:45px;"/>', _obj.image.url
            )
        return "-"


# admin.site.register(Images)
# admin.site.register(Category)
# admin.site.register(Brand)
admin.site.register(ProductFeature)
admin.site.register(Color)


@admin.register(Images, Category, Brand)
class ModelsAdmin(admin.ModelAdmin):
    list_display = ('get_title', 'image_tag')

    def get_title(self, obj):
        return obj.title if hasattr(obj, 'title') else 'No Title'

    def image_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}"style="width:45px;height:45px;"/>', obj.image.url
            )
        return "-"
