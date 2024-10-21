from django.contrib import admin

from basket.models import Basket


@admin.register(Basket)
class BasketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'quantity', 'sum',)
    list_filter = ('user', 'product',)
