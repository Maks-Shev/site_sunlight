from django.db import models

from users.models import NULLABLE


class Kindergarten(models.Model):
    """Модель статей 'Сад'"""
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description_rus = models.TextField(verbose_name="Статья сад на русском")
    description_en = models.TextField(verbose_name="Статья сад на английском", **NULLABLE)
    picture = models.ImageField(upload_to='kindergarten/', **NULLABLE)
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "сад"
        verbose_name_plural = "сады"
