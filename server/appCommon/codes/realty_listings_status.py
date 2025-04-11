# 매물 진행 상태
class RealtyListingsStatus:
    Choices = [
        ('request', '요청'),
        ('post', '등록'),
        ('ing', '진행'),
        ('done', '완료'),
        ('cancel', '취소')
    ]