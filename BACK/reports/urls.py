from django.urls import path

from reports.apps import ReportsConfig
from reports.views import ReportsListAPIView, TypeReportsListAPIView, RequisitesAPIView

app_name = ReportsConfig.name

urlpatterns = [
    path("type_reports/", TypeReportsListAPIView.as_view(), name="type_reports"),
    path("", ReportsListAPIView.as_view(), name="reports_list"),
    path("requisites/", RequisitesAPIView.as_view(), name="requisites"),

]
