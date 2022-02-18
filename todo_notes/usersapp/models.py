from gettext import gettext

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class AppUser(AbstractUser):
    email = models.EmailField('email address', unique=True)
