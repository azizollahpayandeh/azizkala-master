from django.urls import path, include
from rest_framework import routers
from .views import TicketViewSet, CommentViewSet, AttachmentViewSet

router = routers.DefaultRouter()
router.register(r'tickets', TicketViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'attachments', AttachmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
