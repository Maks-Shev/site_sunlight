from rest_framework.routers import DefaultRouter

from school_page.apps import SchoolPageConfig
from school_page.views import SchoolViewSet

app_name = SchoolPageConfig.name

router = DefaultRouter()
router.register(r"school", SchoolViewSet, basename="school")

urlpatterns = [

              ] + router.urls
