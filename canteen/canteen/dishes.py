from canteen_model.models import dishes,images
from django.http import HttpResponseBadRequest,HttpResponseForbidden,HttpResponseNotFound,JsonResponse
from . import Utility
def dishes_route(request):
    if (request.method == "POST"):
        try:
            imgurl = images.objects.get(id=Utility.getImageIDbyUrl(request.POST['imgurl']))
            name = request.POST['name']
            cid = Utility.getObjectByID("canteens",request.POST['cid'])
            wid = Utility.getObjectByID("windows",request.POST['wid'])
            label = request.POST['label']
        except:
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_dish = dishes(cid=cid,wid=wid,imgurl=imgurl,name=name,label=label)
            new_dish.save()
        except Exception as e:
            return HttpResponseBadRequest('Fail to insert data into database'+str(e))
        return JsonResponse({"id":str(new_dish.id)})
    if ('cid' not in request.GET):
        return HttpResponseBadRequest("Please Specify cid to get dish information")
    cid = int(request.GET['cid'])
    if ('wid' not in request.GET):
        return HttpResponseBadRequest("Please Specify wid to get dish information")
    wid = int(request.GET['wid'])
    if ('did' in request.GET):
        did = int(request.GET['did'])
        return GetDishesByID(did,cid,wid)
    else:
        if ('from' in request.GET and 'to' in request.GET):
            start = int(request.GET['from'])
            end = int(request.GET['to'])
            if (start > end):
                return HttpResponseForbidden('invalid query!')
            return List_all_dishes(start,end,cid,wid)
        else:
            return HttpResponseNotFound("Parameters not sufficient.")

def List_all_dishes(start,end,cid,wid):
    result = list(dishes.objects.filter(cid=cid,wid=wid))
    response = {}
    response['result'] = []
    if (len(result)==0):
        return HttpResponseNotFound('Not Found')
    for item in result:
        enclosure = {}
        enclosure['name'] = item.name
        enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
        enclosure['cid'] = cid
        enclosure['wid'] = wid
        enclosure['did'] = item.id
        enclosure["score"] = float(item.sum_score+1e-5)/float(item.amount_scorer+1e-2)
        response['result'].append(enclosure)
    response['result'] = response['result'][start:end+1]
    return JsonResponse(response)
def GetDishesByID(did,cid,wid):
    item = list(dishes.objects.filter(cid=cid,id=did,wid=wid))[0]
    if (item == None):
        return HttpResponseNotFound('Not Found')
    enclosure = {}
    enclosure['name'] = item.name
    enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
    enclosure['did'] = item.id
    enclosure['wid'] = wid
    enclosure["score"] = float(item.sum_score+1e-5)/float(item.amount_scorer+1e-2)
    enclosure['cid'] = cid
    return JsonResponse(enclosure)
