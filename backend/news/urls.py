from django.urls import include, path
from rest_framework.routers import DefaultRouter

from news.apps import NewsConfig
from news.views import NewsViewSet

app_name = NewsConfig.name

news_router = DefaultRouter()
news_router.register(r"", NewsViewSet, basename="news")


urlpatterns = [
    path("", include(news_router.urls)),
    ]