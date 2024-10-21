from rest_framework import serializers

from agents.models import Contacts, Expert, Partner


class BaseExpertSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Эксперта"""

    class Meta:
        model = Expert
        fields: tuple = (
            "name",
            "surname",
            "patronymic",
            "phone_number",
            "job_title",
            "responsibilities",
            "description",
            "image",
        )


class BasePartnerSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Партнера"""

    class Meta:
        model = Partner
        fields: tuple = (
            "title",
            "image",
            "url",
        )


class BaseContactSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Контактов"""

    class Meta:
        model = Contacts
        fields: tuple = (
            "address",
            "phone_number",
            "email",
            "working_hours",
            "working_days",
        )
