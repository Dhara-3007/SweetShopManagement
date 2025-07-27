from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Sweet

class SweetCategoryTests(APITestCase):
    def setUp(self):
        Sweet.objects.create(name="Kaju Katli", category="Barfi", price=300, quantity=20)
        Sweet.objects.create(name="Besan Laddu", category="Laddu", price=150, quantity=30)
        Sweet.objects.create(name="Motichur Laddu", category="Laddu", price=180, quantity=25)

    def test_category_filter(self):
        response = self.client.get('/api/auth/sweets/?category=Laddu')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertTrue(all(s['category'] == 'Laddu' for s in response.data))

    def test_get_unique_categories(self):
        response = self.client.get('/api/auth/categories/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Barfi', response.data)
        self.assertIn('Laddu', response.data)
        self.assertEqual(len(response.data), 2)
