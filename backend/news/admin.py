from django.contrib import admin

from news.models import New


@admin.register(New)
class NewsAdmin(admin.ModelAdmin):
    """
    Оображение блока "Новости" в административной панели Django.
    """

    list_display: tuple = (
        "title",
        "description",
    )
    search_fields: tuple = ("title",)
