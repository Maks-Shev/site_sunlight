from django.contrib import admin

from workshop.models import Workshop


@admin.register(Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    """
    Модель "Мастерские" для административной панели Django.
    """

    list_display = ('id', 'title', 'date_create',)
    search_fields = ('title', 'description_rus', 'description_en',)
    list_filter = ('date_create', 'image',)
