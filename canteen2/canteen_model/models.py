from django.db import models

# Create your models here.
class canteens(models.Model):
    name = models.CharField(max_length=300)
    position = models.CharField(max_length=300)
    imgurl = models.CharField(max_length=300)
