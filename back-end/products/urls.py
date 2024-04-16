from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.ProductView.as_view(), name="products"),
    path('product-detail/<int:id>', views.ProductDetailView.as_view(), name="product_detail"),
    path('category/', views.CategoryView.as_view(), name="category"),
]
