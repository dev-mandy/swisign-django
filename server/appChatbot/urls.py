from django.urls import path

from . import views

urlpatterns = [
    path('address/list', views.getAddressList, name='getAddressList' ),
]