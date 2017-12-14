"""canteen2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from . import testdb, canteens, windows, dishes, remarks, users,img
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  # url(r'^admin/', admin.site.urls),
                  # url(r'^testdb/',testdb.testdb),
                  url(r'^canteens', canteens.canteen_route),
                  url(r'^windows', windows.windows_route),
                  url(r'^dishes', dishes.dishes_route),
                  url(r'^remarks', remarks.remarks_route),
                  url(r'^users', users.user_route),
                  url(r'^auth', users.authenticator_route),
                  url(r'^userlogout', users.user_logout_route),
                  url(r'^img', img.image_route),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
