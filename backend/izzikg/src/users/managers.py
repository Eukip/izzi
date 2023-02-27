from django.db.models import Manager
from django.contrib.auth.models import UserManager


class UserCustomManager(UserManager):
    """Manager for creating user"""

    def _create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError({"error": "The given phone must be set"})
        user = self.model(phone=phone, password=password, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, phone, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", False)
        return self._create_user(phone, password, **extra_fields)

    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self._create_user(phone, password, **extra_fields)


class PartnerManager(Manager):
    """Manager for User model"""

    def get_queryset(self):
        return super(PartnerManager, self).get_queryset().filter(is_partner=True)
