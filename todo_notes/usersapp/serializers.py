from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import AppUser


# class AppUserModelSerializer(ModelSerializer):
class AppUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = AppUser
        fields = (
            'username',
            'first_name',
            'last_name',
            "email"
        )
