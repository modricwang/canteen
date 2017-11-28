from canteen_model.models import canteens,windows,dishes,remarks,images,users
def getImagesUrlByID(imgID):
    #item = images.objects.get(id=imgID)
    item = imgID
    if (item == None):
        return ""
    else:
        return item.url
def getImageIDbyUrl(url):
    try:
        items = url.split('/')
        item = items[-1]
        end = item.index('.')
        PID = item[0:end]
        return int(PID)
    except Exception as e:
        raise e
def getObjectByID(name,id):
    if (name=="canteens"):
        return canteens.objects.only("id").get(id=id)
    if (name=="windows"):
        return windows.objects.only('id').get(id=id)
    if (name=="dishes"):
        return dishes.objects.only('id').get(id=id)
    if (name=="remarks"):
        return remarks.objects.only('id').get(id=id)
    if (name=="images"):
        return images.objects.only('id').get(id=id)
    if (name=='users'):
        return users.objects.only('id').get(id=id)



