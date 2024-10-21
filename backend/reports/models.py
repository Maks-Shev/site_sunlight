from django.utils import timezone

from django.db import models
from django.utils.translation import gettext_lazy as _

NULLABLE = {"blank": True, "null": True}


class TypeOfReport(models.Model):
    """Класс видов отчетности, при необходимости можно создать новый вид отчета,
        заполнив поле title, не заполняя поле type. Либо выбрать из выпадающего списка стандартный предложенный вариант"""
    YEAR = "Годовой отчет"
    MONTH = "Ежемесячный отчет"
    FINANCIAL_REPORT = "Финансовый отчет"

    TYPE_REPORT = [
        (YEAR, "Годовой отчет"),
        (MONTH, "Ежемесячный отчет"),
        (FINANCIAL_REPORT, "Финансовый отчет"),
    ]

    type = models.CharField(choices=TYPE_REPORT, max_length=50, verbose_name='Тип отчета', **NULLABLE)
    description = models.TextField(verbose_name=_("Описание вида отчета"), **NULLABLE)
    title = models.CharField(max_length=100, verbose_name=_("Новый тип отчета"), **NULLABLE)

    class Meta:
        verbose_name = _("Тип отчета")
        verbose_name_plural = _("Типы отчетов")

    def __str__(self):
        """Метод, использующий поля для строкового представления."""
        return f"Новость {self.title}: {self.description}"


class Report(models.Model):
    """Класс отчетов"""
    title = models.CharField(max_length=100, verbose_name=_("Тип отчета"), **NULLABLE)
    url_doc = models.FileField(**NULLABLE)
    type_report = models.ForeignKey(TypeOfReport, on_delete=models.CASCADE, verbose_name='Тип отчета', **NULLABLE)
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Время создания")

    class Meta:
        verbose_name = _("Отчет")
        verbose_name_plural = _("Отчеты")

    def __str__(self):
        """Метод, использующий поля для строкового представления."""
        return f"Новость {self.title}: {self.url_doc}"


class BankRequisites(models.Model):
    """
    Модель банковского счета(поля с учетом требований РФ)
    """

    inn = models.CharField(max_length=30,verbose_name="ИНН")
    ogrn_ogrnip = models.CharField(max_length=30,verbose_name="ОГРН/ОГРИП")
    number_account = models.CharField(max_length=30,verbose_name="Расчетный счет")
    banks_name = models.CharField(max_length=450, verbose_name="Название банка")
    сorr_acc = models.CharField(max_length=30,verbose_name="Корреспондентский счет банка")
    bic = models.CharField(max_length=30,verbose_name="Банковский идентификационный код")
    kpp = models.CharField(max_length=30,verbose_name="КПП банка")
    address = models.CharField(max_length=100, verbose_name="Юридический адрес")


    class Meta:
        verbose_name = "Реквизиты"
        verbose_name_plural = "Реквизиты"
        db_table = "requisites"

    def __str__(self):
        return f"{self.inn}"
