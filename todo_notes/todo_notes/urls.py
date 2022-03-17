from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from notesapp.views import ProjectViewSet, NoteViewSet
from usersapp.views import AppUserViewSet

router = DefaultRouter()
router.register('users', AppUserViewSet)
router.register('projects', ProjectViewSet)
router.register('tasks', NoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
