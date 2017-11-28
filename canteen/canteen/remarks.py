from canteen_model.models import remarks,images
from django.http import HttpResponseBadRequest,HttpResponseForbidden,HttpResponseNotFound,JsonResponse
from . import Utility
def remarks_route(request):
    if (request.method == "POST"):
        try:
            #imgurl = images.objects.get(id=Utility.getImageIDbyUrl(request.POST['imgurl']))
            remarker = Utility.getObjectByID("users",request.POST['remarker'])
            cid = Utility.getObjectByID("canteens",request.POST['cid'])
            wid = Utility.getObjectByID("windows",request.POST['wid'])
            did = Utility.getObjectByID("dishes",request.POST['did'])
            content = str(request.POST['content'])
            score = float(request.POST['score'])
        except :
            return HttpResponseBadRequest('Please check your parameters')
        try:
            new_dish = remarks(cid=cid,wid=wid,did=did,score=score,content=content,remarker=remarker)
            new_dish.save()
            did.sum_score+=score
            did.amount_scorer+=1
            did.save()
        except Exception as e:
            return HttpResponseBadRequest('Fail to insert data into database'+str(e))
        return JsonResponse({"id":str(new_dish.id)})
    if ('cid' not in request.GET):
        return HttpResponseBadRequest("Please Specify cid to get dish information")
    cid = int(request.GET['cid'])
    if ('wid' not in request.GET):
        return HttpResponseBadRequest("Please Specify wid to get dish information")
    wid = int(request.GET['wid'])
    if ('did' not in request.GET):
        return HttpResponseBadRequest("Please Specify did to get dish information")
    did = int(request.GET['did'])
    if ('rid' in request.GET):
        rid = int(request.GET['rid'])
        return GetCanteensByID(rid,cid,wid,did)
    else:
        if ('from' in request.GET and 'to' in request.GET):
            start = int(request.GET['from'])
            end = int(request.GET['to'])
            if (start > end):
                return HttpResponseForbidden('invalid query!')
            return List_all_remarks(start,end,cid,wid,did)
        else:
            return HttpResponseNotFound("Parameters not sufficient.")

def List_all_remarks(start,end,cid,wid,did):
    result = list(remarks.objects.filter(cid=cid,wid=wid,did=did))
    response = {}
    response['result'] = []
    if (len(result)==0):
        return HttpResponseNotFound('Not Found')
    for item in result:
        enclosure = {}
        enclosure['name'] = item.name
        enclosure['position'] = item.position
        enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
        enclosure['cid'] = cid
        enclosure['wid'] = wid
        enclosure['did'] = did
        enclosure['rid'] = item.id
        response['result'].append(enclosure)
    response['result'] = response['result'][start:end+1]
    return JsonResponse(response)
def GetCanteensByID(rid,cid,wid,did):
    item = list(remarks.objects.filter(cid=cid,did=did,wid=wid,id=rid))[0]
    if (item == None):
        return HttpResponseNotFound('Not Found')
    enclosure = {}
    enclosure['name'] = item.name
    enclosure['position'] = item.position
    enclosure['imgurl'] = Utility.getImagesUrlByID(item.imgurl)
    enclosure['did'] = did
    enclosure['rid'] = item.id
    enclosure['wid'] = wid
    enclosure['cid'] = cid
    return JsonResponse(enclosure)
