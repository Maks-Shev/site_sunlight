from django.shortcuts import render

from rest_framework import viewsets

from payment.models import Payment
from payment.serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    """View по CRUD платеж."""

    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
