from rest_framework import serializers

from communications.models import AboutCentre, ProgressCentre


class AboutCentreSerializer(serializers.ModelSerializer):
    """Отображение данных статьи 'О центре'"""
    class Meta:
        model = AboutCentre
        fields = "__all__"


class ProgressCentreSerializer(serializers.ModelSerializer):
    """Отображение данных достижений благотворительного центра"""
    class Meta:
        model = ProgressCentre
        fields = "__all__"
