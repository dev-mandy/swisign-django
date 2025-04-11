from django.apps import AppConfig

# 모델 및 공통 코드 관리 어플리케이션
class AppcommonConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'appCommon'
