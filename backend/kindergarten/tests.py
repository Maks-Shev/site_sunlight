from rest_framework import status
from rest_framework.test import APITestCase

from kindergarten.models import Kindergarten


class KindergartenTestCase(APITestCase):
    def setUp(self) -> None:
        self.kindergarten_test = Kindergarten.objects.create(
            title="Заголовок",
            description_rus="Текст статьи rus",
            description_en="Текст статьи en"
        )

    def test_create_kindergarten(self):
        """Тестирование создание записи 'сад'"""
        data = {"title": "Заголовок тест", "description_rus": "rus тест",
                "description_en": "en тест"}
        response = self.client.post("/api/kindergarten/garden/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_kindergarten(self):
        """Тестирование просмотра списка записей 'сад'"""
        response = self.client.get("/api/kindergarten/garden/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_kindergarten(self):
        """Тестирование просмотра записи 'сад'"""
        response = self.client.get("/api/kindergarten/garden/", args=[self.kindergarten_test.id])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_kindergarten(self):
        """Тестирование изменения записи 'сад'"""
        data_patch = {"title": "Заголовок новый", "description_rus": "rus новый",
                      "description_en": "en новый"}

        response = self.client.patch(f"/api/kindergarten/garden/{self.kindergarten_test.id}/",
                                     data=data_patch)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_kindergarten(self):
        """Тестирование удаления записи 'сад'"""

        response = self.client.delete(
            f"/api/kindergarten/garden/{self.kindergarten_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
