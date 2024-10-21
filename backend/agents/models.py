from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

NULLABLE = {"blank": True, "null": True}


class Expert(models.Model):
    """Базовая модель Специалистов"""

    name = models.CharField(max_length=35, verbose_name=_("Имя"))
    surname = models.CharField(max_length=35, verbose_name=_("Фамилия"))
    patronymic = models.CharField(max_length=35, verbose_name=_("Отчество"), **NULLABLE)
    phone_number = PhoneNumberField(blank=True, verbose_name=_("Номер телефона"))
    job_title = models.CharField(max_length=50, blank=True, verbose_name=_("Должность"))
    responsibilities = models.CharField(max_length=100, blank=True, verbose_name=_("Обязанности"))
    description = models.TextField(blank=True, verbose_name=_("Информация о специалисте"))
    image = models.ImageField(upload_to="agents/experts/", verbose_name=_("Фотография"), **NULLABLE)

    class Meta:
        verbose_name = _("Специалист")
        verbose_name_plural = _("Специалисты")

    def __str__(self):
        """Метод, использующий поля name, surname и patronymic для строкового представления."""
        return f"Специалист {self.surname} {self.name} {self.patronymic}"


class Partner(models.Model):
    """Базовая модель Партнеров"""

    title = models.CharField(max_length=100, blank=True, verbose_name=_("Название"))
    image = models.ImageField(upload_to="agents/partners/", verbose_name=_("Логотип"), **NULLABLE)
    url = models.URLField(max_length=200, verbose_name=_("Ссылка"))

    class Meta:
        verbose_name = _("Партнер")
        verbose_name_plural = _("Партнеры")

    def __str__(self):
        """Метод, использующий поля name и url для строкового представления."""
        return f"Партнер {self.title}: {self.url}"


class Contacts(models.Model):
    """Базовая модель Контактов."""

    address = models.CharField(max_length=100, verbose_name=_("Адрес"))
    phone_number = PhoneNumberField(unique=True, verbose_name=_("Номер телефона"))
    email = models.EmailField(max_length=254, unique=True, verbose_name=_("Электронная почта"))
    working_hours = models.CharField(max_length=50, verbose_name=_("Часы работы"), **NULLABLE)
    working_days = models.CharField(max_length=150, verbose_name=_("Рабочие дни"), **NULLABLE)

    class Meta:
        """Описание опций метаданных"""

        verbose_name = _("Контакт")
        verbose_name_plural = _("Контакты")

    def __str__(self):
        """Метод, использующий поля phone_number и email для строкового представления."""
        return f"Контакты {self.phone_number}: {self.email}"
