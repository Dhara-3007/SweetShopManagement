from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.username

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Sweet(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # ✅ this replaces `type`
    image = models.ImageField(upload_to='sweet_images/', null=True, blank=True)

    def __str__(self):
        return self.name

class SweetOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sweet = models.ForeignKey('Sweet', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"
