from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseNotFound
from django.http import HttpResponseForbidden
from ..canteen_model.models import users
from . import Utility


def user_route(request):
    if request.method == 'POST':
        try:
            username = request.POST['username']
            password = request.POST['password']
            email = request.POST['email']
        except:
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_user = users(Authority_Choices='LEVEL3', username=username, password=password, email=email)
            new_user.save()
        except:
            return HttpResponseBadRequest('Fail to insert data into database')
        return JsonResponse({"id": str(new_user.id)})


def authenticator_route(request):
    if request.method == 'POST':
        try:
            username = request.POST['username']
            password = request.POST['password']
        except:
            return HttpResponseBadRequest('Please check your parameters')
        query = list(users.objects.filter(username=username, password=password))
        if (len(query) == 1):
            response = {}
            response['uid'] = query[0].id
            return JsonResponse(response)
        elif (len(query) > 1):
            return HttpResponseBadRequest('invalid user!')
        else:
            return HttpResponseBadRequest('no such user!')

