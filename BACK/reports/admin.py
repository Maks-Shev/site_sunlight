from django.contrib import admin

from .models import Report, TypeOfReport, BankRequisites

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    """Админ-панель отчетов"""
    list_display = ('id', 'title', 'url_doc', 'type_report', 'created_at')
    search_fields = ('title',)
    list_filter = ('type_report', 'created_at')

@admin.register(TypeOfReport)
class TypeReportAdmin(admin.ModelAdmin):
    """Админ-панель типов отчетов"""
    list_display = ('id', 'title', 'description', 'type')
    search_fields = ('title',)
    list_filter = ('type',)


@admin.register(BankRequisites)
class RequisitesAdmin(admin.ModelAdmin):
    """Админ-панель счетов"""
    list_display = ('id', 'inn', "banks_name")