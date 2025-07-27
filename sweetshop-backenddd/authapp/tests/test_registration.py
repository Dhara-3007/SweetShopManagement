from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from authapp.models import CustomUser

class RegistrationTestCase(APITestCase):
    def test_user_registration(self):
        url = reverse('register')  # We'll define this name in urls.py
        data = {
            "username": "jinal",
            "email": "jinal@example.com",
            "password": "test1234"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(CustomUser.objects.first().username, "jinal")
