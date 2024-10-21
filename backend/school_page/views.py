from rest_framework import viewsets

from basket.permissions import IsAdminUser
from school_page.models import School
from school_page.serializers import SchoolSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    """View по CRUD школа."""

    serializer_class = SchoolSerializer
    queryset = School.objects.all()

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
