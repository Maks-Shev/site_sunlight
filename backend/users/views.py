from django.contrib.auth import login
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

from users.models import User

class ActivateUsersView(APIView):
    """
    Представление для активации пользователя по ссылке из письма.
    """
    def get(self, request, uidb64, token, format=None):
        """
        Активация пользователя по ссылке из письма.
        """
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Поздравляем, Ваш аккаунт активирован!!!'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Что-то пошло не так! Попробуйте снова!'},
                            status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordUsersView(APIView):
    """Представление для активации ссылки из письма."""
    def get(self, request, uidb64, token, format=None):
        """Активация пользователя по ссылке из письма."""
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            user.save()
            return Response({'message': 'Введите новый пароль!!!'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Что-то пошло не так! Попробуйте снова!'},
                            status=status.HTTP_400_BAD_REQUEST)

class UserActivationView(APIView):
    def get (self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activate/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data = post_data)
        content = result.text
        return Response(content)
