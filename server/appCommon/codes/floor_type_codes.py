# https://www.hub.go.kr/portal/opn/tyb/idx-bdrg-flr.do
# -> 하단 메타정보 조회 -> 층구분코드

# 층구분코드
class FloorType:
    CHOICES = [
        ('00', ''),
        ('10', '지하'),
        ('20', '지상'),
        ('21', '복수층(하층)'),
        ('22', '복수층(상층)'),
        ('30', '옥탑'),
        ('40', '각층'),
    ]