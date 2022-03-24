from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from notesapp.models import Project, Note
# from usersapp.serializers import AppUserModelSerializer


# class ProjectModelSerializer(HyperlinkedModelSerializer):
class ProjectModelSerializer(ModelSerializer):
    # users = AppUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


# class NoteModelSerializer(HyperlinkedModelSerializer):
class NoteModelSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
