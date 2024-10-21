from django.urls import path
from territory_of_success.apps import TerritoryOfSuccessConfig
from territory_of_success.views import (TerritoryOfSuccessListAPIView,
                                        TerritoryOfSuccessRetrieveAPIView, LikeProductAPIView)

app_name = TerritoryOfSuccessConfig.name

urlpatterns = [

    path('list/', TerritoryOfSuccessListAPIView.as_view(), name='list'),
    path('detail/<int:pk>/', TerritoryOfSuccessRetrieveAPIView.as_view(), name='detail'),
    path('like_product/', LikeProductAPIView.as_view(), name='like-product')

]
