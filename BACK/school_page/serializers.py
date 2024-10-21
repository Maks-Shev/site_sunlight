from rest_framework import serializers
from school_page.models import School


class SchoolSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Школа"""

    class Meta:
        model = School
        fields = "__all__"

