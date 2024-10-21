from django.db import models

NULLABLE = {"blank": True, "null": True}


class School(models.Model):
    """Базовая модель школа"""

    title = models.CharField(max_length=100, verbose_name="Заголовок_Школа", **NULLABLE)
    description_rus = models.TextField(verbose_name="Статья школы на русском")
    description_en = models.TextField(verbose_name="Статья школы на английском", **NULLABLE)
    image = models.ImageField(upload_to="agents/partners/", verbose_name="Изображение", **NULLABLE)
    date_create = models.DateTimeField(auto_now_add=True)


    class Meta:
        verbose_name = "Страница Школа"
        verbose_name_plural = "Страница Школа"
