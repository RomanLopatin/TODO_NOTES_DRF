import graphene
from graphene_django import DjangoObjectType
from .models import Note, AppUser, Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class AppUserType(DjangoObjectType):
    class Meta:
        model = AppUser
        fields = '__all__'


class Query(graphene.ObjectType):

    all_notes = graphene.List(NoteType)

    def resolve_all_notes(root, info):
        return Note.objects.all()

    note_by_id = graphene.Field(NoteType, pk=graphene.Int(required=True))

    def resolve_note_by_id(root, info, pk):
        try:
            return Note.objects.get(pk=pk)

        except Note.DoesNotExist:
            return None

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    project_by_id = graphene.Field(ProjectType, pk=graphene.Int(required=True))

    def project_by_id(root, info, pk):
        try:
            return Project.objects.get(pk=pk)

        except Project.DoesNotExist:
            return None

    all_users = graphene.List(AppUserType)

    def resolve_all_users(root, info):
        return AppUser.objects.all()

    user_by_id = graphene.Field(AppUserType, pk=graphene.Int(required=True))

    def user_by_id(root, info, pk):
        try:
            return AppUser.objects.get(pk=pk)

        except AppUser.DoesNotExist:
            return None




schema = graphene.Schema(query=Query)
