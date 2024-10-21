from rest_framework import viewsets

from basket.permissions import IsAdminUser
from workshop.models import Workshop
from workshop.serializers import WorkshopSerializer


class WorkshopViewSet(viewsets.ModelViewSet):
    """View по CRUD мастерские."""

    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
