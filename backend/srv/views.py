from rest_framework import viewsets

from basket.permissions import IsAdminUser
from srv.models import SRV
from srv.serliazers import SRVSerializer

from sun_projects.paginators import ListPaginator


class SRVViewSet(viewsets.ModelViewSet):
    """ViewSet для страницы 'СРВ'"""

    queryset = SRV.objects.all()
    serializer_class = SRVSerializer
    pagination_class = ListPaginator

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
