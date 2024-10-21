from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from basket.permissions import IsActiveUser
from territory_of_success.models import TerritoryOfSuccess, LikeProduct, ViewProduct
from territory_of_success.serializers import TerritoryOfSuccessSerializer

from sun_projects.paginators import ListPaginator


class TerritoryOfSuccessListAPIView(generics.ListAPIView):
    """Дженерик для метода List территории успеха"""
    serializer_class = TerritoryOfSuccessSerializer
    queryset = TerritoryOfSuccess.objects.all()
    pagination_class = ListPaginator


class TerritoryOfSuccessRetrieveAPIView(generics.RetrieveAPIView):
    """Дженерик для метода Detail территории успеха"""
    serializer_class = TerritoryOfSuccessSerializer
    queryset = TerritoryOfSuccess.objects.all()

    def get_object(self):
        if self.request.auth:
            user = self.request.user
            product_id = self.kwargs.get('pk')
            view_item = ViewProduct.objects.filter(user=user, product=product_id)
            if not view_item:
                product_item = TerritoryOfSuccess.objects.get(id=product_id)
                ViewProduct.objects.create(user=user, product=product_item)
        return super().get_object()


class LikeProductAPIView(APIView):
    """APIView для создания/удаления лайка на товар.
    Необходимо передавать id товара на который хотят поставить/удалить лайк
    в словаре по ключу 'product_id'"""
    permission_classes = [IsActiveUser]

    def post(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get('product_id')
        product_item = get_object_or_404(TerritoryOfSuccess, id=product_id)
        like_item = LikeProduct.objects.filter(user=user, product=product_item)
        if like_item:
            like_item.delete()
            message = 'лайк удален'
        else:
            LikeProduct.objects.create(user=user, product=product_item)
            message = 'лайк добавлен'

        return Response({"message": message})
