from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import AppUser


# class AppUserModelSerializer(HyperlinkedModelSerializer):
class AppUserModelSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            "email"
        )


class AppUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = AppUser
        fields = (
            'username',
            'first_name',
            'last_name',
            "email",
            "is_superuser",
            "is_staff"
        )
