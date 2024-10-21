from rest_framework.routers import DefaultRouter

from workshop.apps import WorkshopConfig
from workshop.views import WorkshopViewSet

app_name = WorkshopConfig.name

router = DefaultRouter()
router.register(r"workshop", WorkshopViewSet, basename="workshop")

urlpatterns = [

              ] + router.urls
