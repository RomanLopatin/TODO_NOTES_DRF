from .base import *

DEBUG = False
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo_notes',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'db',
        'PORT': '5432',
    }
}