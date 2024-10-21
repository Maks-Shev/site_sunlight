from rest_framework import status
from rest_framework.test import APITestCase

from sun_projects.models import SunProjects


class SunProjectsTestCase(APITestCase):
    def setUp(self) -> None:
        self.sun_projects_test = SunProjects.objects.create(
            title="Заголовок",
            denotation="Обозначение",
            sun_projects_text="Текст статьи"
        )

    def test_create_sun_projects(self):
        """Тестирование создание проекта"""
        data = {"title": "Заголовок тест", "denotation": "Обозначение тест",
                "sun_projects_text": "Текст проекта тест"}
        response = self.client.post("/api/sun_projects/projects/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_sun_projects(self):
        """Тестирование просмотра списка проектов"""
        response = self.client.get("/api/sun_projects/projects/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_sun_projects(self):
        """Тестирование просмотра одного проекта"""
        response = self.client.get("/api/sun_projects/projects/", args=[self.sun_projects_test.id])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_sun_projects(self):
        """Тестирование изменения проекта"""
        data_patch = {"title": "Заголовок новый", "denotation": "Обозначение новый",
                      "sun_projects_text": "Текст статьи новый"}

        response = self.client.patch(
            f"/api/sun_projects/projects/{self.sun_projects_test.id}/", data=data_patch
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_sun_projects(self):
        """Тестирование удаления проекта"""

        response = self.client.delete(
            f"/api/sun_projects/projects/{self.sun_projects_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
