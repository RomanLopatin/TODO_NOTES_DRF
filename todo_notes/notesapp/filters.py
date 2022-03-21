from django_filters import rest_framework as filters
from .models import Project, Note


class ProjectFilter(filters.FilterSet):
    # name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        # fields = {'name': ['exact']}
        fields = {'name': ['contains']}


class TaskFilter(filters.FilterSet):
    class Meta:
        model = Note
        fields = {
            'project': ['exact'],
            'created': ['gt', 'lt']
        }
