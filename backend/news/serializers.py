from rest_framework import serializers
from news.models import New


class NewsSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Партнера"""

    class Meta:
        model = New
        fields: tuple = (
            "title",
            "image",
            "description",
        )


