from django.contrib import admin

from payment.models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    """
    Модель "Платеж" для административной панели Django.
    """

    list_display: tuple = (
        "user",
        "amount",
        "date",
    )
