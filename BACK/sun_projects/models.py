from django.db import models

from users.models import NULLABLE


class SunProjects(models.Model):
    """Модель проектов"""
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    denotation = models.TextField(verbose_name="Обозначение")
    sun_projects_text = models.TextField(verbose_name="Статья о проекте")
    picture = models.ImageField(upload_to='sun_projects/', **NULLABLE)
    collected_sum = models.PositiveIntegerField(default=0, verbose_name="Собранная сумма")
    need_sum = models.PositiveIntegerField(default=0, verbose_name="Требуемая сумма")
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "проект"
        verbose_name_plural = "проекты"
