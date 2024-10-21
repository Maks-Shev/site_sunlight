from rest_framework import status
from rest_framework.test import APITestCase

from basket.models import Basket
from territory_of_success.models import TerritoryOfSuccess
from users.models import User


class BasketTestCase(APITestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(
            email='test@test.ru'
        )
        self.test_product_1 = TerritoryOfSuccess.objects.create(
            name='товар1',
            price=100
        )
        self.test_product_2 = TerritoryOfSuccess.objects.create(
            name='товар2',
            price=230
        )
        self.client.force_authenticate(
            user=self.user
        )
        self.basket_test = Basket.objects.create(
            user=self.user,
            product=self.test_product_1,
            quantity=1,
        )

    def test_create_basket(self):
        """Тестирование создание корзины"""
        data = {"user": self.user, "product": self.test_product_1}
        response = self.client.post("/api/basket/user_basket/", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_basket(self):
        """Тестирование просмотра списка корзин"""
        response = self.client.get("/api/basket/user_basket/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_basket(self):
        """Тестирование просмотра корзины"""
        response = self.client.get("/api/basket/user_basket/", args=[self.basket_test.id])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_basket(self):
        """Тестирование изменения корзины"""
        data_patch = {"quantity": 8}

        response = self.client.patch(f"/api/basket/user_basket/{self.basket_test.id}/", data=data_patch)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_basket(self):
        """Тестирование удаления корзины"""

        response = self.client.delete(
            f"/api/basket/user_basket/{self.basket_test.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
