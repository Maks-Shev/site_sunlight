from django.urls import include, path
from rest_framework.routers import DefaultRouter

from agents.apps import AgentsConfig
from agents.views import ContactsListAPIView, ExpertViewSet, PartnerViewSet

app_name = AgentsConfig.name

experts_router = DefaultRouter()
experts_router.register(r"experts", ExpertViewSet, basename="experts")

partners_router = DefaultRouter()
partners_router.register(r"partners", PartnerViewSet, basename="partners")

urlpatterns = [
    path("", include(experts_router.urls)),
    path("", include(partners_router.urls)),
    path("contacts/", ContactsListAPIView.as_view(), name="contacts-list"),
]
