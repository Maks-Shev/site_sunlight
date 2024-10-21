from rest_framework import serializers
from reports.models import Report, TypeOfReport, BankRequisites


class ReportSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Отчета"""

    # type_title = serializers.CharField(source="type_report.title", read_only=True)

    class Meta:
        model = Report
        fields = '__all__'


class TypeReportSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели типа Отчета"""
    class Meta:
        model = TypeOfReport
        fields = '__all__'


class RequisitesSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Отчета"""
    class Meta:
        model = BankRequisites
        fields = '__all__'

