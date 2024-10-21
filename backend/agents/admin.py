from django.contrib import admin

from agents.models import Contacts, Expert, Partner


@admin.register(Expert)
class ExpertAdmin(admin.ModelAdmin):
    """
    Модель "Специалист" для административной панели Django.
    """

    list_display: tuple = (
        "name",
        "surname",
        "patronymic",
        "phone_number",
        "job_title",
        "responsibilities",
    )
    search_fields: tuple = (
        "name",
        "surname",
        "phone_number",
    )


@admin.register(Partner)
class PartnersAdmin(admin.ModelAdmin):
    """
    Модель "Партнер" для административной панели Django.
    """

    list_display: tuple = (
        "title",
        "url",
    )
    search_fields: tuple = ("title",)


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    """
    Модель "Контакты" для административной панели Django.
    """
    list_display: tuple = (
        "address",
        "phone_number",
        "email",
        "phone_number",
    )
