from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import AppUserModelSerializer
from .models import AppUser


# Create your views here.
class AppUserViewSet(ModelViewSet):
    serializer_class = AppUserModelSerializer
    queryset = AppUser.objects.all()

# class AppUserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     serializer_class = AppUserModelSerializer
#     queryset = AppUser.objects.all()
