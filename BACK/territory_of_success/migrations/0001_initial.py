# Generated by Django 5.1.1 on 2024-10-20 08:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="TerritoryOfSuccess",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=50, verbose_name="Название")),
                ("text", models.TextField(blank=True, null=True, verbose_name="Описание")),
                ("price", models.DecimalField(decimal_places=2, default=0, max_digits=20, verbose_name="Стоимость")),
                ("picture", models.ImageField(blank=True, null=True, upload_to="territory_of_success/")),
                ("quantity", models.PositiveIntegerField(default=0, verbose_name="Количество на складе")),
                ("date_create", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "территория успеха",
                "verbose_name_plural": "территории успеха",
            },
        ),
        migrations.CreateModel(
            name="LikeProduct",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Пользователь",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="like_product",
                        to="territory_of_success.territoryofsuccess",
                        verbose_name="продукт",
                    ),
                ),
            ],
            options={
                "verbose_name": "Лайк",
                "verbose_name_plural": "Лайки",
            },
        ),
        migrations.CreateModel(
            name="ViewProduct",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="view_product",
                        to="territory_of_success.territoryofsuccess",
                        verbose_name="продукт",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Пользователь",
                    ),
                ),
            ],
            options={
                "verbose_name": "Просмотр",
                "verbose_name_plural": "Просмотры",
            },
        ),
    ]
