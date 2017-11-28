from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseNotFound
from django.http import HttpResponseForbidden
from canteen_model.models import canteens,images
from . import Utility

def canteen_route(request):
    if (request.method== 'POST'):
        try:
            position = request.POST['position']
            imgurl = images.objects.only('id').get(id=Utility.getImageIDbyUrl(request.POST['imgurl']))
            name = request.POST['name']
        except Exception as e:
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_canteen = canteens(position=position,imgurl=imgurl,name=name)
            new_canteen.save()
        except Exception as e:
            return HttpResponseBadRequest('Fail to insert data into database'+str(e))
        return JsonResponse({"id":str(new_canteen.id)})
    if ('cid' in request.GET):
        cid = int(request.GET['cid'])
        return GetCanteensByID(cid)
    else:
        if ('from' in request.GET and 'to' in request.GET):
            start = int(request.GET['from'])
            end = int(request.GET['to'])
            if (start > end):
                return HttpResponseForbidden('invalid query!')
            return List_all_canteens(start,end)
        else:
            return HttpResponseNotFound("Parameters not sufficient.")

def List_all_canteens(start,end):
    result = list(canteens.objects.all())
    response = {}
    response['result'] = []
    if (len(result)==0):
        return HttpResponseNotFound('Not Found')
    for item in result:
        enclosure = {}
        enclosure['name'] = item.name
        enclosure['position'] = item.position
        enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
        enclosure['cid'] = item.id
        response['result'].append(enclosure)
    response['result'] = response['result'][start:end+1]
    return JsonResponse(response)
def GetCanteensByID(cid):
    item = canteens.objects.filter(id=cid)
    if (item == None):
        return HttpResponseNotFound('Not Found')
    enclosure = {}
    enclosure['name'] = item.name
    enclosure['position'] = item.position
    enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
    enclosure['cid'] = item.id
    return JsonResponse(enclosure)

