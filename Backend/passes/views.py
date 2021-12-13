from django.shortcuts import render
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from passes.models import Account
from passes.permissions import IsOwner
from passes.serializers import AccountSerializer

# Create your views here.


class AccountViewSet(ModelViewSet):
    queryset = Account.objects.none()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]

    # This sets the queryset to be all the accounts associated with the currently logged in user
    def get_queryset(self):
        queryset = Account.objects.filter(user=self.request.user)
        self.queryset = queryset
        return queryset 
