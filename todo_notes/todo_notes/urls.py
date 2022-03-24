from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from notesapp.views import ProjectViewSet, NoteViewSet
from usersapp.views import AppUserViewSet

router = DefaultRouter()
router.register('users', AppUserViewSet)
router.register('projects', ProjectViewSet)
router.register('tasks', NoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth', include('rest_framework.urls')),
    path('api-auth-token/', obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
