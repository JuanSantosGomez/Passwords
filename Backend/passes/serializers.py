from rest_framework import serializers
from passes.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','site', 'url', 'description', 'password', 'username', 'email', 'user','updated']
        read_only_fields = ('id','updated')
