from django.urls import include, path
from rest_framework.routers import DefaultRouter

from kindergarten.apps import KindergartenConfig
from kindergarten.views import KindergartenViewSet

app_name = KindergartenConfig.name

kindergarten_router = DefaultRouter()
kindergarten_router.register(r"garden", KindergartenViewSet, basename="garden")

urlpatterns = [
    path("", include(kindergarten_router.urls)),
]
