from rest_framework import viewsets

from basket.models import Basket
from basket.serliazers import BasketSerializer

from basket.permissions import IsActiveUser


class BasketViewSet(viewsets.ModelViewSet):
    """ViewSet для корзины"""
    serializer_class = BasketSerializer
    permission_classes = [IsActiveUser]

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)
