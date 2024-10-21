from django.contrib import admin

from kindergarten.models import Kindergarten


@admin.register(Kindergarten)
class KindergartenAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_create',)
    search_fields = ('title', 'description_rus', 'description_en',)
    list_filter = ('date_create', 'picture',)
