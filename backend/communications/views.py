from rest_framework import viewsets

from communications.models import AboutCentre, ProgressCentre
from communications.serliazers import AboutCentreSerializer, ProgressCentreSerializer
from basket.permissions import IsAdminUser

from sun_projects.paginators import ListPaginator

class AboutCentreViewSet(viewsets.ModelViewSet):
    """ViewSet для статей 'О центре'"""

    queryset = AboutCentre.objects.all()
    serializer_class = AboutCentreSerializer
    pagination_class = ListPaginator

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class ProgressCentreViewSet(viewsets.ModelViewSet):
    """ViewSet  'Достижения благотворительного фонда'"""

    queryset = ProgressCentre.objects.all()
    serializer_class = ProgressCentreSerializer