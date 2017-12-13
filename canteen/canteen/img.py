from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseNotFound
from django.http import HttpResponseForbidden
from canteen_model.models import images
from . import Utility


def image_route(request):
    if request.method == 'POST':
        try:
            img = request.FILES.get('img')
            name = request.FILES.get('img').name
            owner = request.POST['owner']
        except:
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_img = images(img=img, name=name, owner=owner)
        except:
            return HttpResponseBadRequest('save failed!')