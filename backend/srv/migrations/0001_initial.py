# Generated by Django 5.1.1 on 2024-10-15 11:25

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SRV",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=100, verbose_name="Заголовок")),
                ("description_rus", models.TextField(verbose_name="Статья СРВ на русском")),
                ("description_en", models.TextField(blank=True, null=True, verbose_name="Статья СРВ на английском")),
                ("picture", models.ImageField(blank=True, null=True, upload_to="srv/")),
                ("date_create", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "СРВ",
                "verbose_name_plural": "СРВ",
            },
        ),
    ]
