from django.db import models

from users.models import NULLABLE


class TerritoryOfSuccess(models.Model):
    """Модель товаров территории успеха"""
    name = models.CharField(max_length=50, verbose_name="Название")
    text = models.TextField(verbose_name="Описание", **NULLABLE)
    price = models.DecimalField(decimal_places=2, max_digits=20, default=0, verbose_name="Стоимость")
    picture = models.ImageField(upload_to='territory_of_success/', **NULLABLE)
    quantity = models.PositiveIntegerField(default=0, verbose_name="Количество на складе")
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.price}"

    class Meta:
        verbose_name = "территория успеха"
        verbose_name_plural = "территории успеха"


class LikeProduct(models.Model):
    product = models.ForeignKey(
        'TerritoryOfSuccess',
        verbose_name='продукт',
        on_delete=models.CASCADE,
        related_name='like_product'
    )
    user = models.ForeignKey(
        'users.User',
        verbose_name='Пользователь',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.user} - {self.product}'

    class Meta:
        verbose_name = 'Лайк'
        verbose_name_plural = 'Лайки'


class ViewProduct(models.Model):
    product = models.ForeignKey(
        'TerritoryOfSuccess',
        verbose_name='продукт',
        on_delete=models.CASCADE,
        related_name='view_product'
    )
    user = models.ForeignKey(
        'users.User',
        verbose_name='Пользователь',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.user} - {self.product}'

    class Meta:
        verbose_name = 'Просмотр'
        verbose_name_plural = 'Просмотры'
