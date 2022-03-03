from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectViewSet(ModelViewSet):

    # renderer_classes = [JSONRenderer]
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()


class NoteViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()




