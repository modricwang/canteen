from django.db import models

PASSWORD_LENGTH = 200
NAME_LENGTH = 150
POSITION_LENGTH = 300
TYPE_LENGTH = 200


# Create your models here.
class users(models.Model):
    Authority_Choices = (('LEVEL0', 'Admin'), ('LEVEL1', 'ChiefManager'), ('LEVEL2', 'Manager'), ('LEVEL3', 'User'))
    username = models.CharField(max_length=NAME_LENGTH, db_index=True)
    password = models.CharField(max_length=PASSWORD_LENGTH)
    email = models.EmailField()
    authority = models.CharField(max_length=20, choices=Authority_Choices)
    online = models.BooleanField(default=False)


class canteens(models.Model):
    name = models.CharField(max_length=NAME_LENGTH)
    position = models.CharField(max_length=POSITION_LENGTH)
    imgurl = models.ForeignKey('images', )


class windows(models.Model):
    name = models.CharField(max_length=NAME_LENGTH)
    position = models.CharField(max_length=POSITION_LENGTH)
    imgurl = models.ForeignKey('images', )
    cid = models.ForeignKey('canteens', )
    type = models.CharField(max_length=TYPE_LENGTH)


class dishes(models.Model):
    name = models.CharField(max_length=NAME_LENGTH)
    sum_score = models.FloatField(default=0)
    amount_scorer = models.IntegerField(default=0)
    label = models.CharField(max_length=TYPE_LENGTH)
    imgurl = models.ForeignKey('images', )
    cid = models.ForeignKey('canteens', )
    wid = models.ForeignKey('windows', )


class remarks(models.Model):
    remarker = models.ForeignKey("users", )
    score = models.FloatField()
    content = models.TextField(default="")
    cid = models.ForeignKey('canteens', )
    wid = models.ForeignKey('windows', )
    did = models.ForeignKey("dishes", )


class images(models.Model):
    img = models.ImageField(upload_to='img')
    url = models.CharField(max_length=NAME_LENGTH, default='NULL')
    name = models.CharField(max_length=TYPE_LENGTH,default='NULL')
    owner = models.ForeignKey("users", )
