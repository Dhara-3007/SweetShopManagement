from django.urls import path
from .views import RegisterView, SweetListView , OrderCreateView, OrderHistoryView, MeView, CategoryListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sweets/', SweetListView.as_view(), name='sweets'),
    path('categories/', CategoryListView.as_view(), name='categories'),  # ✅ Add this line
    path('order/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', OrderHistoryView.as_view(), name='order-history'),
    path('me/', MeView.as_view(), name='me'),
]
