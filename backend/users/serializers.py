from rest_framework import serializers

from users.models import User
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer, \
    UserCreatePasswordRetypeSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    """
    Регистрация пользователя. (Модель User)
    """
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'phone', 'last_name', 'email', 'password', 'patronymic']


class CurrentUserSerializer(serializers.ModelSerializer):
    """Отображение данных пользователя. (Модель User)"""
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'patronymic', 'phone']

class UserSerializer(serializers.ModelSerializer):
    """Отображение данных списка пользователей. (Модель User)"""
    companies = serializers.StringRelatedField(many=True)
    class Meta:

        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'patronymic', 'companies']

class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    """ Сериализация повторной проверки пароля, вводимого пользователем """
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        fields = ('id', 'first_name', 'last_name', 'patronymic', 'phone', 'email', 'password')
