from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index' ),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('chat', views.chat, name='chat'),
    path('terms/accept', views.acceptTerms, name='acceptTerms'),
    path('terms/list', views.getTermsList, name='getTermsList'),
]