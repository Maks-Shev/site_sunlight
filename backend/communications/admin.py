from django.contrib import admin

from communications.models import AboutCentre, ProgressCentre


@admin.register(AboutCentre)
class AboutCentreAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_create',)
    search_fields = ('title',)
    list_filter = ('date_create',)


@admin.register(ProgressCentre)
class ProgressCentreAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'int_progress',)
