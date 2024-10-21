from django.urls import include, path
from rest_framework.routers import DefaultRouter

from sun_projects.apps import SunProjectsConfig
from sun_projects.views import SunProjectsViewSet

app_name = SunProjectsConfig.name

sun_projects = DefaultRouter()
sun_projects.register(r"projects", SunProjectsViewSet, basename="projects")

urlpatterns = [
    path("", include(sun_projects.urls)),
]
