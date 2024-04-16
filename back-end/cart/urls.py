from django.urls import path
from . import views


urlpatterns = [
    path('', views.CartView.as_view(), ),
    path('add-or-remove/', views.CartEditView.as_view(), ),
]
