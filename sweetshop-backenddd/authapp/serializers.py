from rest_framework import serializers
from .models import Sweet, Category, CustomUser, SweetOrder

class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'address', 'phone')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            address=validated_data.get('address', ''),
            phone=validated_data.get('phone', '')
        )
        return user

class OrderSerializer(serializers.ModelSerializer):
    sweet = serializers.PrimaryKeyRelatedField(queryset=Sweet.objects.all())

    class Meta:
        model = SweetOrder
        fields = ['id', 'sweet', 'quantity', 'total_price', 'name', 'address', 'phone', 'created_at']
        read_only_fields = ['total_price']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['sweet'] = SweetSerializer(instance.sweet).data  # Include full sweet details
        return rep
