from django.urls import include, path
from rest_framework.routers import DefaultRouter

from basket.apps import BasketConfig
from basket.views import BasketViewSet

app_name = BasketConfig.name

basket_router = DefaultRouter()
basket_router.register(r"user_basket", BasketViewSet, basename="user_basket")

urlpatterns = [
    path("", include(basket_router.urls)),
]
