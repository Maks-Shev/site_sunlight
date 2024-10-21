from django.contrib import admin

from srv.models import SRV


@admin.register(SRV)
class SRVAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_create',)
    search_fields = ('title', 'description_rus', 'description_en',)
    list_filter = ('date_create', 'picture',)
