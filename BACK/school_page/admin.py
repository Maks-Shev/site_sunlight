from django.contrib import admin

from school_page.models import School


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    """
    Модель "Школа" для административной панели Django.
    """

    list_display = ('id', 'title', 'date_create',)
    search_fields = ('title', 'description_rus', 'description_en',)
    list_filter = ('date_create', 'image',)
