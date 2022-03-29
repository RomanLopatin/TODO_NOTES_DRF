from django.test import TestCase
from mixer.backend.django import mixer
# Create your tests here.
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate

# Create your tests here.
from notesapp.models import Note
from notesapp.views import NoteViewSet


class TestNoteAPIRequestFactory(TestCase):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.user = User.objects.create_superuser('admin', password='admin', email='login@admin.adm')
        self.request = self.factory.get('/api/tasks/')
        self.view = NoteViewSet.as_view({'get': 'list'})

    def test_get_list_1(self):
        # force_authenticate(self.request, self.user)
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # self.assertEqual(len(response.data), 0)

    def test_get_list_2(self):
        force_authenticate(self.request, self.user)
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_3(self):
        force_authenticate(self.request, self.user)
        self.note = mixer.blend(Note)
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TestNoteAPIClient(TestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', password='admin', email='login@admin.adm')
        self.client = APIClient()
        self.client.force_login(self.admin)

    def test_get_list_4(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_5(self):
        self.client.logout()
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_6(self):
        self.note = mixer.blend(Note)
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


# class TestNoteTestCase(APITestCase): При наследовании от класс TestCase client тоже создается,
# нижеследующие тесты отрабатывают, так же как при наследовании от APITestCase. Или что то здесь не так?
class TestNoteTestCase(TestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', password='admin', email='login@admin.adm')
        self.client.login(username='admin', password='admin')
        # self.client.force_login(self.admin)

    def test_get_list_7(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_8(self):
        self.client.logout()
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_9(self):
        self.note = mixer.blend(Note)
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
