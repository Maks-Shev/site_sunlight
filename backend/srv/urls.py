from django.urls import include, path
from rest_framework.routers import DefaultRouter

from srv.apps import SrvConfig
from srv.views import SRVViewSet

app_name = SrvConfig.name

srv_router = DefaultRouter()
srv_router.register(r"srv_centre", SRVViewSet, basename="srv_centre")

urlpatterns = [
    path("", include(srv_router.urls)),
]
