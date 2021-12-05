from rest_framework import serializers
from passes.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['site', 'url', 'description', 'password', 'username', 'email', 'user']

