from django.db import models

NULLABLE = {"blank": True, "null": True}


class Workshop(models.Model):
    """Базовая модель мастерских"""

    title = models.CharField(max_length=100, verbose_name="Заголовок_мастерские", **NULLABLE)
    description_rus = models.TextField(verbose_name="Статья мастерские на русском")
    description_en = models.TextField(verbose_name="Статья мастерские на английском", **NULLABLE)
    image = models.ImageField(upload_to="agents/partners/", verbose_name="Изображение", **NULLABLE)
    date_create = models.DateTimeField(auto_now_add=True)


    class Meta:
        verbose_name = "Мастерские"
        verbose_name_plural = "Мастерские"
