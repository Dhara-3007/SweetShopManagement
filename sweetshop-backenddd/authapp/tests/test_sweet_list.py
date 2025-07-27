# authapp/tests/test_sweet_list.py

from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from authapp.models import Sweet, Category, CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class TestSweetList(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass123')
        self.category = Category.objects.create(name='Barfi', description='Milk-based sweets')
        self.sweet = Sweet.objects.create(
            name='Kaju Katli',
            price=200.00,
            quantity=10,
            category=self.category
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_sweet_list_returns_sweets(self):
        url = reverse('sweets')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Kaju Katli')
