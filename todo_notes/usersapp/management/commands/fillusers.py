import json
from django.conf import settings
from django.core.management import BaseCommand

from usersapp.models import AppUser


def load_from_json(file_name):
    with open(f"{settings.BASE_DIR}/json/{file_name}.json", encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        _users = load_from_json('users')
        AppUser.objects.all().delete()
        for user in _users:
            if user.get('is_superuser'):
                AppUser.objects.create_superuser(**user)
            else:
                AppUser.objects.create_user(**user)

