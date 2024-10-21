# Generated by Django 5.1.1 on 2024-10-15 11:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="New",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.TextField(blank=True, max_length=100, null=True, verbose_name="Заголовок_новости")),
                ("description", models.TextField(blank=True, null=True, verbose_name="Текст_новости")),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="agents/partners_1/", verbose_name="Изображение 1"
                    ),
                ),
                (
                    "image_1",
                    models.ImageField(
                        blank=True, null=True, upload_to="agents/partners_2/", verbose_name="Изображение 2"
                    ),
                ),
                (
                    "image_2",
                    models.ImageField(
                        blank=True, null=True, upload_to="agents/partners_3/", verbose_name="Изображение 3"
                    ),
                ),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, verbose_name="Время создания")),
            ],
            options={
                "verbose_name": "Новость",
                "verbose_name_plural": "Новости",
            },
        ),
    ]