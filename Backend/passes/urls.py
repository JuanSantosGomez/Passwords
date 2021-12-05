from django.urls import path, include
from rest_framework.routers import DefaultRouter
from passes.models import Account
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'account', views.AccountViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]