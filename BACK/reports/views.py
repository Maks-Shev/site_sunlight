from rest_framework.generics import ListAPIView

from reports.models import Report, TypeOfReport, BankRequisites
from reports.serializers import ReportSerializer, TypeReportSerializer, RequisitesSerializer


class ReportsListAPIView(ListAPIView):
    """API эндпоинт для отображения отчетов."""

    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class TypeReportsListAPIView(ListAPIView):
    """API эндпоинт для отображения отчетов."""

    queryset = TypeOfReport.objects.all()
    serializer_class = TypeReportSerializer

class RequisitesAPIView(ListAPIView):
    """API эндпоинт для отображения отчетов."""

    queryset = BankRequisites.objects.all()
    serializer_class = RequisitesSerializer


