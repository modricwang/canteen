from django.http import JsonResponse
from django.http import HttpResponse
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
            files = request.FILES
            img = files['img']
            name = files['img'].name
            #name = ""
            if (int(request.POST['owner'])!=test_uid):
                raise Exception("Who are you?")
            owner = Utility.getObjectByID("users",request.POST['owner'])
        except Exception as e:
            print(e)
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_img = images(img=img, name=name, owner=owner)
            new_img.save()
        except Exception as e:
            print(e)
            return HttpResponseBadRequest('save failed!')
        response = {}
        # TODO 我怎么知道域名是什么
        # local server, brother!
        response['url'] = "http://xxx.com/img/"+str(new_img.id)+".jpg"
        response['owner'] = request.session['uid']
        return JsonResponse(response)
    if request.method == 'GET':
       try:
            #print(request.get_full_path())
            id = str(request.get_full_path()).split('/')[-1].split('.')[0]
            #print(id)
            now_img = images.objects.get(id=id).img
            return HttpResponse(now_img,content_type="image/jpeg")
       except:
           return HttpResponseBadRequest('Please check your parameters')
