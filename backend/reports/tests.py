from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from reports.models import Report, TypeOfReport, BankRequisites
from reports.serializers import ReportSerializer, RequisitesSerializer


class BankRequisitesTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.requisites = BankRequisites.objects.create(inn=1954558756,
                                                        ogrn_ogrnip=654642654,
                                                        number_account=56413513213,
                                                        banks_name="Название банка",
                                                        сorr_acc=4514512,
                                                        bic=541320,
                                                        kpp=54120,
                                                        address="Юридический адрес")
        self.serializer_data = RequisitesSerializer([self.requisites], many=True).data

    def test_list_requisites(self):
        """Тест просмотра списка реквизитов(list)"""

        response = self.client.get(reverse("reports:requisites"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.serializer_data, response.data)


class ReportTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.type_report = TypeOfReport.objects.create()
        self.report = Report.objects.create(title="Test_report", type_report=self.type_report)
        self.serializer_data = ReportSerializer([self.report], many=True).data

    def test_list_reports(self):
        """Тест просмотра списка отчетов(list)"""

        response = self.client.get(reverse("reports:reports_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.serializer_data, response.data)


class TypeReportTestCase(APITestCase):
    def setUp(self) -> None:
        """Инициализация тестовых данных"""
        self.type_report = TypeOfReport.objects.create(title="Стандартный отчет")
        self.report = Report.objects.create(title="Test_report", type_report=self.type_report)

    def test_list_reports(self):
        """Тест просмотра списка Типов отчетов(list)"""

        response = self.client.get(reverse("reports:type_reports"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
