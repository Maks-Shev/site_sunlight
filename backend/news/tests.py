from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from news.models import New
from news.serializers import NewsSerializer


class NewViewSetsTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.new = New.objects.create(title="Тест", description="Тестов")
        self.serializer_new = NewsSerializer([self.new], many=True).data

    def test_list_news(self):
        """Тест на отображение списка новостей(list)"""
        url = reverse("news:news-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer_data = NewsSerializer([self.new], many=True).data
        self.assertEqual(response.data, serializer_data)

    def test_create_new(self):
        """Тест на создание новости"""
        url = reverse("news:news-list")
        data = {"title": "New1", "description": "good"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_new(self):
        """Тест на просмотр деталей новости"""

        url = reverse("news:news-detail", args=[self.new.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_new(self):
        """Тест на редактирование новости"""
        url = reverse("news:news-detail", args=[self.new.pk])
        data = {"title": "New2", "description": "better"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        val = New.objects.get(pk=self.new.pk)
        self.assertEqual(val.title, "New2")

    def test_delete_expert(self):
        """Тест на удаление новости"""
        url = reverse("news:news-detail", args=[self.new.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(New.objects.filter(pk=self.new.pk).exists())
