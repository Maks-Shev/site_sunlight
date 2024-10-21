from rest_framework import status
from rest_framework.test import APITestCase

from communications.models import AboutCentre, ProgressCentre


class AboutCentreTestCase(APITestCase):
    def setUp(self) -> None:
        self.article_test = AboutCentre.objects.create(
            title="Заголовок",
            about_centre="Текст",
        )

    def test_create_about_centre(self):
        """Тестирование создание записи 'О центре'"""
        data = {"title": "Заголовок тестовый", "about_centre": "Текст тестовый"}
        response = self.client.post("/api/communications/article_about_centre/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_about_centre(self):
        """Тестирование просмотра списка записей 'О центре'"""
        response = self.client.get("/api/communications/article_about_centre/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_about_centre(self):
        """Тестирование просмотра записи 'О центре'"""
        response = self.client.get("/api/communications/article_about_centre/", args=[self.article_test.id])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_about_centre(self):
        """Тестирование изменения записи 'О центре'"""
        data_patch = {"title": "Заголовок новый", "about_centre": "Текст новый"}

        response = self.client.patch(f"/api/communications/article_about_centre/{self.article_test.id}/", data=data_patch)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_about_centre(self):
        """Тестирование удаления записи 'О центре'"""

        response = self.client.delete(
            f"/api/communications/article_about_centre/{self.article_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ProgressCentreTestCase(APITestCase):
    def setUp(self) -> None:
        self.progress_test = ProgressCentre.objects.create(
            description="Заголовок",
            int_progress=159,
        )

    def test_create_progress_centre(self):
        """Тестирование создание записи о прогрессе"""
        data = {"description": "Заголовок тестовый", "int_progress": 10}
        response = self.client.post("/api/communications/progress_centre/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_progress_centre(self):
        """Тестирование просмотра списка записей о прогрессе организации"""
        response = self.client.get("/api/communications/progress_centre/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_progress_centre(self):
        """Тестирование просмотра записи прогресс организации"""
        response = self.client.get("/api/communications/progress_centre/", args=[self.progress_test.id])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_progress_centre(self):
        """Тестирование изменения записи прогресс организации"""
        data_patch = {"description": "Заголовок тестовый", "int_progress": 100000}

        response = self.client.patch(f"/api/communications/progress_centre/{self.progress_test.id}/", data=data_patch)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_progress_centre(self):
        """Тестирование удаления записи о прогрессе"""

        response = self.client.delete(
            f"/api/communications/progress_centre/{self.progress_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)