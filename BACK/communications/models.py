from django.db import models

from users.models import NULLABLE


class AboutCentre(models.Model):
    """Модель статьи 'О центре'"""
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    about_centre = models.TextField(verbose_name="Статья")
    picture = models.ImageField(upload_to='communications/', **NULLABLE)
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "статья"
        verbose_name_plural = "статьи"

class ProgressCentre(models.Model):
    """Модель показателей прогресса благотворительного фонда в цифрах"""

    description = models.CharField(max_length=100, verbose_name="Описание достижения")
    int_progress = models.IntegerField(verbose_name="Количественный показатель достижения")

    def __str__(self):
        """Строковое представление класса Progress"""
        return f"{self.description} - {self.int_progress}"

    class Meta:
        verbose_name = "Достижение"
        verbose_name_plural = "Достижения"
