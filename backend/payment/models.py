from django.db import models

from users.models import User
from django.utils.translation import gettext_lazy as _

NULLABLE = {'blank': True, 'null': True}


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("Пользователь"))
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Платеж"))
    date = models.DateField(verbose_name=_("Дата платежа"))

    class Meta:
        verbose_name = _("Палтеж")
        verbose_name_plural = _("Платежи")
