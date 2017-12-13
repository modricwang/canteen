from ..canteen_model.models import windows, images
from django.http import HttpResponseBadRequest, HttpResponseForbidden, HttpResponseNotFound, JsonResponse
from . import Utility


def windows_route(request):
    if (request.method == "POST"):
        try:
            position = request.POST['position']
            imgurl = images.objects.get(id=Utility.getImageIDbyUrl(request.POST['imgurl']))
            name = request.POST['name']
            cid = Utility.getObjectByID("canteens", request.POST['cid'])
        except:
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_window = windows(cid=cid, position=position, imgurl=imgurl, name=name)
            new_window.save()
        except:
            return HttpResponseBadRequest('Fail to insert data into database')
        return JsonResponse({"id": str(new_window.id)})
    if ('cid' not in request.GET):
        return HttpResponseBadRequest("Please Specify cid to get window information")
    cid = int(request.GET['cid'])
    if ('wid' in request.GET):
        wid = int(request.GET['wid'])
        return GetWindowsByID(wid, cid)
    else:
        if ('from' in request.GET and 'to' in request.GET):
            start = int(request.GET['from'])
            end = int(request.GET['to'])
            if (start > end):
                return HttpResponseForbidden('invalid query!')
            return List_all_windows(start, end, cid)
        else:
            return HttpResponseNotFound("Parameters not sufficient.")


def List_all_windows(start, end, cid):
    result = list(windows.objects.filter(cid=cid))
    response = {}
    response['result'] = []
    if (len(result) == 0):
        return HttpResponseNotFound('Not Found')
    for item in result:
        enclosure = {}
        enclosure['name'] = item.name
        enclosure['position'] = item.position
        enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
        enclosure['cid'] = cid
        enclosure['wid'] = item.id
        response['result'].append(enclosure)
    response['result'] = response['result'][start:end + 1]
    return JsonResponse(response)


def GetWindowsByID(wid, cid):
    item = list(windows.objects.filter(cid=cid, id=wid))
    if (item == None):
        return HttpResponseNotFound('Not Found')
    item = item[0]
    enclosure = {}
    enclosure['name'] = item.name
    enclosure['position'] = item.position
    enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
    enclosure['wid'] = item.id
    enclosure['cid'] = cid
    return JsonResponse(enclosure)
