from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)


urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),

    path('forgot_password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('confirm/', ValidateCodeAndResetPasswordView.as_view(), name='confirm'),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='change_password'),
]
