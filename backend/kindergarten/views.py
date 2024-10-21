from rest_framework import viewsets

from basket.permissions import IsAdminUser
from kindergarten.models import Kindergarten
from kindergarten.serliazers import KindergartenSerializer


class KindergartenViewSet(viewsets.ModelViewSet):
    """ViewSet для страницы 'сад'"""

    queryset = Kindergarten.objects.all()
    serializer_class = KindergartenSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
