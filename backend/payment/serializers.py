from rest_framework import serializers

from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для модели Платеж"""

    class Meta:
        model = Payment
        fields: tuple = (
            "user",
            "amount",
            "date",
        )
