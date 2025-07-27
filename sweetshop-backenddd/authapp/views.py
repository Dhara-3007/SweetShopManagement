from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  
from .serializers import RegisterSerializer,SweetSerializer, OrderSerializer
from .models import Sweet,  SweetOrder

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'address': user.address,
            'phone': user.phone,
        })

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.permissions import AllowAny

class SweetListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.GET.get('category')
        sweets = Sweet.objects.all()

        if category and category.lower() != 'all':
            sweets = sweets.filter(category__name__iexact=category)

        serializer = SweetSerializer(sweets, many=True)
        return Response(serializer.data)

class CategoryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Sweet.objects.select_related('category') \
            .values_list('category__name', flat=True).distinct()
        return Response(categories)


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            sweet = serializer.validated_data['sweet']
            quantity = serializer.validated_data['quantity']

            if sweet.quantity < quantity:
                return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)

            sweet.quantity -= quantity
            sweet.save()

            total_price = sweet.price * quantity

            order = SweetOrder.objects.create(
                user=request.user,
                sweet=sweet,
                quantity=quantity,
                total_price=total_price,
                name=serializer.validated_data['name'],
                address=serializer.validated_data['address'],
                phone=serializer.validated_data['phone']
            )

            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = SweetOrder.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

