from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from .models import Workshop
from .serializers import WorkshopSerializer


class SchoolViewSetsTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.new = Workshop.objects.create(title="Тест", description="Тестов")
        self.serializer_new = WorkshopSerializer([self.new], many=True).data

    def test_list_news(self):
        """Тест на всех записай (list)"""
        url = reverse("workshop:workshop-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer_data = WorkshopSerializer([self.new], many=True).data
        self.assertEqual(response.data, serializer_data)

    def test_create_new(self):
        """Тест на создание """
        url = reverse("workshop:workshop-list")
        data = {"title": "New1", "description": "good"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_new(self):
        """Тест на просмотр деталей """

        url = reverse("workshop:workshop-detail", args=[self.new.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_new(self):
        """Тест на редактирование"""
        url = reverse("workshop:workshop-detail", args=[self.new.pk])
        data = {"title": "New2", "description": "better"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        val = Workshop.objects.get(pk=self.new.pk)
        self.assertEqual(val.title, "New2")

    def test_delete_expert(self):
        """Тест на удаление """
        url = reverse("workshop:workshop-detail", args=[self.new.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Workshop.objects.filter(pk=self.new.pk).exists())
