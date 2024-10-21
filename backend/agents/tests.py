from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Contacts, Expert, Partner
from .serializers import BaseContactSerializer, BaseExpertSerializer, BasePartnerSerializer


class ExpertViewSetsTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.expert = Expert.objects.create(name="Тест", surname="Тестов", patronymic="Тестович")
        self.serializer_expert = BaseExpertSerializer([self.expert], many=True).data

    def test_list_expert(self):
        """Тест на отображение списка специалистов(list)"""
        url = reverse("agents:experts-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer_data = BaseExpertSerializer([self.expert], many=True).data
        self.assertEqual(response.data, serializer_data)

    def test_create_expert(self):
        """Тест на создание специалиста"""
        url = reverse("agents:experts-list")
        data = {"name": "Иван", "surname": "Иванов", "patronymic": "Иванович"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_expert(self):
        """Тест на просмотр деталей специалиста"""

        url = reverse("agents:experts-detail", args=[self.expert.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_expert(self):
        """Тест на редактирование специалиста"""
        url = reverse("agents:experts-detail", args=[self.expert.pk])
        data = {"name": "Семен", "surname": "Иванов", "patronymic": "Иванович"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        val = Expert.objects.get(pk=self.expert.pk)
        self.assertEqual(val.name, "Семен")

    def test_delete_expert(self):
        """Тест на удаление специалиста"""
        url = reverse("agents:experts-detail", args=[self.expert.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Expert.objects.filter(pk=self.expert.pk).exists())


class PartnerTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.partner = Partner.objects.create(title="Рога и копыта", url="partners-list")
        self.serializer_data = BasePartnerSerializer([self.partner], many=True).data

    def test_list_partners(self):
        """Тест просмотра списка партнеров (list)"""

        response = self.client.get(reverse("agents:partners-list"))
        self.assertEqual(self.serializer_data, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_serializer_data(self):
        """Тест на сравнение нужных полей в отображении list через сериалайзер"""
        expected_data = [{"title": self.partner.title, "image": None, "url": self.partner.url}]
        self.assertEqual(expected_data, self.serializer_data)

    def test_create_partner(self):
        """Тест на создание партнера"""
        url = reverse("agents:partners-list")
        data = {"title": "test", "url": "https://2gis.ru/"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ContactsTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.contact = Contacts.objects.create(address="Ленина 13", phone_number="355-32-35", email="test@test.com")
        self.serializer_data = BaseContactSerializer([self.contact], many=True).data

    def test_list_contacts(self):
        """Тест просмотра списка контактов(list)"""

        response = self.client.get(reverse("agents:contacts-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.serializer_data, response.data)

    def test_serializer_data(self):
        """Тест на сравнение нужных полей в отображении list через сериалайзер"""

        expected_data = [
            {
                "address": self.contact.address,
                "phone_number": self.contact.phone_number,
                "email": self.contact.email,
                "working_hours": None,
                "working_days": None,
            }
        ]
        self.assertEqual(expected_data, self.serializer_data)
