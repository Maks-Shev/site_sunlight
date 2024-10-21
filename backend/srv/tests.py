from rest_framework import status
from rest_framework.test import APITestCase

from srv.models import SRV


class SRVTestCase(APITestCase):
    def setUp(self) -> None:
        self.srv_test = SRV.objects.create(
            title="Заголовок",
            description_rus="Текст статьи rus",
            description_en="Текст статьи en"
        )

    def test_create_srv(self):
        """Тестирование создание записи 'СРВ'"""
        data = {"title": "Заголовок тест", "description_rus": "rus тест",
                "description_en": "en тест"}
        response = self.client.post("/api/srv/srv_centre/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_srv(self):
        """Тестирование просмотра списка записей 'СРВ'"""
        response = self.client.get("/api/srv/srv_centre/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_about_centre(self):
        """Тестирование просмотра записи 'СРВ'"""
        response = self.client.get("/api/srv/srv_centre/", args=[self.srv_test.id])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_about_centre(self):
        """Тестирование изменения записи 'СРВ'"""
        data_patch = {"title": "Заголовок новый", "description_rus": "rus новый",
                      "description_en": "en новый"}

        response = self.client.patch(f"/api/srv/srv_centre/{self.srv_test.id}/", data=data_patch)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_about_centre(self):
        """Тестирование удаления записи 'СРВ'"""

        response = self.client.delete(
            f"/api/srv/srv_centre/{self.srv_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
