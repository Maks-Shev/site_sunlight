from django.contrib import admin

from sun_projects.models import SunProjects


@admin.register(SunProjects)
class SunProjectsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_create', 'collected_sum', 'need_sum',)
    search_fields = ('title', 'denotation', 'sun_projects_text',)
    list_filter = ('date_create', 'picture', 'need_sum',)
