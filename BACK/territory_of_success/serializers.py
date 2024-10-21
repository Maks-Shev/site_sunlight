from rest_framework import serializers, fields

from territory_of_success.models import TerritoryOfSuccess, LikeProduct, ViewProduct


class TerritoryOfSuccessSerializer(serializers.ModelSerializer):
    like_product = fields.SerializerMethodField()
    view_product = fields.SerializerMethodField()

    class Meta:
        model = TerritoryOfSuccess
        fields = ('id', 'name', 'text', 'price', 'quantity',
                  'like_product', 'view_product', 'date_create')

    def get_like_product(self, obj):
        user = self.context['request'].user.pk
        return bool(LikeProduct.objects.filter(user=user, product=obj.pk))

    def get_view_product(self, obj):
        user = self.context['request'].user.pk
        return bool(ViewProduct.objects.filter(user=user, product=obj.pk))
