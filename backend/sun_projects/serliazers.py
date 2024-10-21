from rest_framework import serializers

from sun_projects.models import SunProjects


class SunProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SunProjects
        fields = "__all__"
