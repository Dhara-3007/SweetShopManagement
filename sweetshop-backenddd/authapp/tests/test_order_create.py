from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from authapp.models import CustomUser, Sweet, Category, Order
from rest_framework_simplejwt.tokens import RefreshToken

class TestOrderCreate(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='jinal', password='userpass123')
        self.category = Category.objects.create(name='Barfi', description='Milk-based sweets')
        self.sweet = Sweet.objects.create(
            name='Kaju Katli', price=250, quantity=50, category=self.category
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_order_creation(self):
        url = reverse('order-create')
        data = {
            'sweet': self.sweet.id,
            'quantity': 2
        }
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Order.objects.first().total_price, 500)

    def test_order_fails_if_insufficient_stock(self):
        url = reverse('order-create')
        data = {
            'sweet': self.sweet.id,
            'quantity': 100  # More than available stock
            }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
