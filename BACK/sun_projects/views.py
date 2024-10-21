from rest_framework import viewsets

from basket.permissions import IsAdminUser
from sun_projects.models import SunProjects
from sun_projects.serliazers import SunProjectsSerializer
from sun_projects.paginators import ListPaginator


class SunProjectsViewSet(viewsets.ModelViewSet):
    """ViewSet для проектов"""

    queryset = SunProjects.objects.all()
    serializer_class = SunProjectsSerializer
    pagination_class = ListPaginator

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
