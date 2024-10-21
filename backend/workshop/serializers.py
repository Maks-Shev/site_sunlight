from rest_framework import serializers
from workshop.models import Workshop


class WorkshopSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Мастерские"""


    class Meta:
        model = Workshop
        fields = "__all__"

