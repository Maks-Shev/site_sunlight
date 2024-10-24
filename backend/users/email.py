
from djoser.email import PasswordResetEmail, UsernameResetEmail
from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from djoser.conf import settings


class UserPasswordResetEmail(PasswordResetEmail):

    def get_context_data(self):
        # PasswordResetEmail можно удалить
        context = super().get_context_data()

        user = context.get("user")
        context["domain"] = 'localhost'
        # context["site_name"] = SITE_NAME_FRONTEND
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        return context
