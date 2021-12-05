from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import User
# Create your models here.

class Account(models.Model):
    #data
    site = models.CharField(max_length=50,blank=False,null=False)
    url = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    password = models.CharField(max_length=120,null=False, blank=False)
    username = models.CharField(max_length=120,null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    user = ForeignKey(User,on_delete=models.CASCADE)


    #metadata
    created = models.DateTimeField(auto_created=True, auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
