from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from notesapp.models import Project, Note
from usersapp.serializers import AppUserModelSerializer


# class ProjectModelSerializer(ModelSerializer):
class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = AppUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


# class NoteModelSerializer(ModelSerializer):
class NoteModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
