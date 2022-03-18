from django.shortcuts import render

# Create your views here.
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, TaskFilter
from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TaskLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer]
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class NoteViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()
    # pagination_class = TaskLimitOffsetPagination
    # filterset_fields = ['project']
    filterset_class = TaskFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
