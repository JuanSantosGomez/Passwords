from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions 
from passes.models import Account
from passes.serializers import AccountSerializer
from passes.permissions import IsOwner

# Create your views here.


class AccountViewSet(ModelViewSet):
    queryset = Account.objects.none()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwner]

    # This sets the queryset to be all the accounts associated with the currently logged in user
    def get_queryset(self):
        queryset = Account.objects.filter(user=self.request.user)
        self.queryset = queryset
        return queryset 
