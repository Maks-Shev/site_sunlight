from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

NULLABLE = {"blank": True, "null": True}

class New(models.Model):
    """Базовая модель новостей"""

    title = models.TextField(max_length=100, verbose_name=_("Заголовок_новости"), **NULLABLE)
    description = models.TextField(verbose_name=_("Текст_новости"), **NULLABLE)
    image = models.ImageField(upload_to="agents/partners_1/", verbose_name=_("Изображение 1"), **NULLABLE)
    image_1 = models.ImageField(upload_to="agents/partners_2/", verbose_name=_("Изображение 2"), **NULLABLE)
    image_2 = models.ImageField(upload_to="agents/partners_3/", verbose_name=_("Изображение 3"), **NULLABLE)
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Время создания")


    class Meta:
        verbose_name = _("Новость")
        verbose_name_plural = _("Новости")

    def __str__(self):
        """Метод, использующий поля name для строкового представления."""
        return f"Новость {self.title}: {self.description}"
