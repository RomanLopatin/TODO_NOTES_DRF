from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin

from usersapp.models import AppUser

# admin.site.register(AppUser)
admin.site.register(AppUser, UserAdmin)