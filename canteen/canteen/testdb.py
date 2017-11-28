# -*- coding: utf-8 -*-

from django.http import HttpResponse

from canteen_model.models import canteens


# 数据库操作
def testdb(request):
    test1 = canteens(name='heyi2',position='jiaosan')
    test1.save()
    list = canteens.objects.all()
    response = ''
    for item in list:
        response += item.name+' '+item.position
    return HttpResponse("<p>数据添加成功！</p>"+'<p>'+response+'</p>')