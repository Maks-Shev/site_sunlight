from rest_framework import viewsets

from news.models import New
from news.serializers import NewsSerializer


class NewsViewSet(viewsets.ModelViewSet):
    """View по CRUD партнеров."""

    queryset = New.objects.all()
    serializer_class = NewsSerializer

