from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from agents.models import Contacts, Expert, Partner
from agents.serializers import BaseContactSerializer, BaseExpertSerializer, BasePartnerSerializer
from basket.permissions import IsAdminUser


class ExpertViewSet(viewsets.ModelViewSet):
    """View по CRUD для специалистов"""

    queryset = Expert.objects.all()
    serializer_class = BaseExpertSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class PartnerViewSet(viewsets.ModelViewSet):
    """View по CRUD партнеров."""

    queryset = Partner.objects.all()
    serializer_class = BasePartnerSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class ContactsListAPIView(ListAPIView):
    """API эндпоинт для получения отображения контактов."""

    queryset = Contacts.objects.all()
    serializer_class = BaseContactSerializer

