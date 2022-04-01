from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from notesapp.views import ProjectViewSet, NoteViewSet
from usersapp.views import AppUserViewSet

from drf_yasg.views import get_schema_view
from rest_framework.schemas import get_schema_view as get_schema_view_drf
from drf_yasg import openapi

router = DefaultRouter()
router.register('users', AppUserViewSet)
router.register('projects', ProjectViewSet)
router.register('tasks', NoteViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth', include('rest_framework.urls')),
    path('api-auth-token/', obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('openapi', get_schema_view_drf(title="Your Project", description="API for all things …", version="1.0.0"),
         name='openapi-schema'),
    path('redoc/',
         TemplateView.as_view(template_name='todo_notes/redoc.html', extra_context={'schema_url': 'openapi-schema'}
                              ),
         name='redoc'),
]
