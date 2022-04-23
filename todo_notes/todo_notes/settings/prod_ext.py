from .base import *

DEBUG = True
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo_notes',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': '127.0.0.1',
        'PORT': '54321',
    }
}