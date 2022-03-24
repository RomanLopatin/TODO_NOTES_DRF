from django.db import models


# Create your models here.
# from usersapp.models import AppUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField(max_length=200, blank=True)
    # users = models.ManyToManyField(AppUser)

    def __str__(self):
        return f'{self.name}'


class Note(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note_text = models.TextField(verbose_name='текст заметки', max_length=512, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

