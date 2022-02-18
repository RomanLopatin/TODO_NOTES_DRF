from rest_framework.serializers import ModelSerializer
from .models import AppUser


class AppUserModelSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = (
            'username',
            'first_name',
            'last_name',
            "email"
        )

