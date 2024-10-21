from rest_framework import serializers

from srv.models import SRV


class SRVSerializer(serializers.ModelSerializer):
    class Meta:
        model = SRV
        fields = "__all__"
