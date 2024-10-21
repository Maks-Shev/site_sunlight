import random
from django.core.management import BaseCommand
from mimesis import Person, Text
from mimesis.locales import Locale

from faker import Faker

fake = Faker('ru')
from agents.models import Contacts, Partner, Expert
from news.models import New
from users.models import User


def create_news():
    """Создание фейковой бд новостей"""

    quantity = 10
    num = []
    text = Text('ru')
    for _ in range(quantity):
        title = fake.words()
        img_url = fake.file_path()
        description = text.text(quantity=1)  # quantity - показатель количества предложений.
        num.append(New(
            title=title,
            description=description,
            image=img_url
        ))

    return num


def create_contacts():
    """Создание фейковой бд контакты"""

    quantity = 1
    num = []
    person = Person(Locale.RU)
    for _ in range(quantity):
        company = fake.company()
        address = fake.address()
        num.append(Contacts(
            email=person.email(domains=f"{company}.ru"),
            address=address,
            phone_number=person.telephone(mask='+7-9##-###-5##3'),
        ))

    return num


def create_partners():
    """Создание фейковой бд партнеров
      title = models.CharField(max_length=100, blank=True, verbose_name=_("Название"))
    image = models.ImageField(upload_to="agents/partners/", verbose_name=_("Логотип"), **NULLABLE)
    url = models.URLField(max_length=200, verbose_name=_("Ссылка"))"""
    quantity = 10
    num = []
    for _ in range(quantity):
        title = fake.company()
        url = fake.url()
        num.append(Partner(
            title=title,
            url=url
        ))

    return num


def create_experts():
    """Создание фейковой бд экспертов"""
    quantity = 10
    num = []
    for _ in range(quantity):
        name = fake.name()
        surname = fake.last_name()
        phone_number = fake.phone_number()
        job_title = fake.job()
        num.append(Expert(
            name=name,
            surname=surname,
            phone_number=phone_number,
            job_title=job_title
        ))
    return num


def create_users():
    """Создание фейковой бд пользователей"""
    quantity = 10
    num = []
    person = Person(Locale.RU)
    for _ in range(quantity):
        first_name = fake.first_name()
        last_name = fake.last_name()
        num.append(User(
            first_name=first_name,
            last_name=last_name,
            email=f"{''.join(first_name.split()).lower() + ''.join(last_name.split()).lower()}@sunny.ru",
            # birthday=person.birthdate(1980, 2010),
            phone=person.telephone(mask='+7-9##-###-5##3'),
            is_active=True,
            email_verify=True
        ))

    return num


class Command(BaseCommand):
    """Кастомная команда для создания фэйковой бд"""

    def handle(self, *args, **options):
        User.objects.bulk_create(
            create_users()
        )
        New.objects.bulk_create(
            create_news()
        )
        Contacts.objects.bulk_create(
            create_contacts()
        )
        Partner.objects.bulk_create(
            create_partners()
        )
        Expert.objects.bulk_create(
            create_experts()
        )
