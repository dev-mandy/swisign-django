from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index' ),
    path('testdata/list', views.get_test_data, name='get_test_data'),
    path('testdata/save', views.save_test_data, name='save_test_data'),
    path('testdata/update', views.update_test_data, name='update_test_data'),
    path('testdata/delete', views.delete_test_data, name='delete_test_data'),
]