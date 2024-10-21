from django.urls import include, path
from rest_framework.routers import DefaultRouter

from communications.apps import CommunicationsConfig
from communications.views import AboutCentreViewSet, ProgressCentreViewSet

app_name = CommunicationsConfig.name

about_centre_router = DefaultRouter()
about_centre_router.register(r"article_about_centre", AboutCentreViewSet, basename="article_about_centre")

progress_centre_router = DefaultRouter()
progress_centre_router.register(r"progress_centre", ProgressCentreViewSet, basename="progress_centre")

urlpatterns = [
    path("", include(about_centre_router.urls)),
    path("", include(progress_centre_router.urls)),
]
