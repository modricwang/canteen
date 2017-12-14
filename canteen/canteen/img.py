from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseNotFound
from django.http import HttpResponseForbidden
from canteen_model.models import images
from . import Utility


def image_route(request):
    try:
        test_uid = request.session["uid"]
    except KeyError:
        return HttpResponseForbidden("You have not logged in!")
    if request.method == 'POST':
        try:
            img = request.FILES.get('img')
            name = request.FILES.get('img').name
            if (int(request.POST['owner'])!=test_uid):
                raise Exception("Who are you?")
            owner = Utility.getObjectByID("users",request.POST['owner'])
        except Exception as e:
            print(e)
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_img = images(img=img, name=name, owner=owner)
        except Exception as e:
            print(e)
            return HttpResponseBadRequest('save failed!')
        response = {}
        # TODO 我怎么知道域名是什么
        # local server, brother!
        response['url'] = name
        response['owner'] = owner
        return new_img
