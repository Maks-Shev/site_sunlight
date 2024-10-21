from django.contrib import admin

from territory_of_success.models import TerritoryOfSuccess, LikeProduct, ViewProduct


@admin.register(TerritoryOfSuccess)
class TerritoryOfSuccessAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'date_create',)
    search_fields = ('name', 'text', 'sun_projects_text',)
    list_filter = ('name', 'price', 'picture',)


@admin.register(LikeProduct)
class LikeProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'user',)
    search_fields = ('product', 'user',)
    list_filter = ('product', 'user',)


@admin.register(ViewProduct)
class ViewProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'user',)
    search_fields = ('product', 'user',)
    list_filter = ('product', 'user',)
