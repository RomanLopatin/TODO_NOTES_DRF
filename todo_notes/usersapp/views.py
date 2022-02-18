from rest_framework.viewsets import ModelViewSet
from .serializers import AppUserModelSerializer
from .models import AppUser


# Create your views here.
class AppUserViewSet(ModelViewSet):
    serializer_class = AppUserModelSerializer
    queryset = AppUser.objects.all()
