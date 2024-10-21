from django.db import models

from users.models import User

from territory_of_success.models import TerritoryOfSuccess


class BasketQuerySet(models.QuerySet):
    def total_sum(self):
        return sum(basket.sum() for basket in self)

    def total_quantity(self):
        return sum(basket.quantity for basket in self)

    def stripe_products(self):
        line_items = []
        for basket in self:
            item = {
                'price': basket.product.stripe_product_price_id,
                'quantity': basket.quantity,
            }
            line_items.append(item)
        return line_items


class Basket(models.Model):
    """Базовая модель корзины"""
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name="Пользователь")
    product = models.ForeignKey(to=TerritoryOfSuccess, on_delete=models.CASCADE, verbose_name="Продукт")
    quantity = models.PositiveSmallIntegerField(default=0, verbose_name="Количество продукта в корзине")
    created_timestamp = models.DateTimeField(auto_now_add=True)

    objects = BasketQuerySet.as_manager()

    def __str__(self):
        return f'Корзина для {self.user.email} | Продукт: {self.product.name}'

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    def sum(self):
        return self.product.price * self.quantity

    def de_json(self):
        basket_item = {
            'product_name': self.product.name,
            'quantity': self.quantity,
            'price': float(self.product.price),
            'sum': float(self.sum()),
        }
        return basket_item

    @classmethod
    def create_or_update(cls, product_id, user):
        trades = Basket.objects.filter(user=user, product_id=product_id)

        if not trades.exists():
            obj = Basket.objects.create(user=user, product_id=product_id, quantity=1)
            is_created = True
            return obj, is_created
        else:
            trade = trades.first()
            trade.quantity += 1
            trade.save()
            is_created = False
            return trade, is_created
