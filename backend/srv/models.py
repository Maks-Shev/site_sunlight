from django.db import models

from users.models import NULLABLE


class SRV(models.Model):
    """Модель статей 'СРВ'"""
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description_rus = models.TextField(verbose_name="Статья СРВ на русском")
    description_en = models.TextField(verbose_name="Статья СРВ на английском", **NULLABLE)
    picture = models.ImageField(upload_to='srv/', **NULLABLE)
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "СРВ"
        verbose_name_plural = "СРВ"
