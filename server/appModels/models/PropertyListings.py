from django.db import models

class PropertyListings(models.Model):
    pl_seq = models.BigAutoField(primary_key=True, db_comment='Property Listings 시퀀스')
    pl_status = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 매물 진행 상태\nrequest: 요청\npost: 등록\ning: 진행\ndone: 완료\ncancel: 취소')
    pl_document_num = models.CharField(max_length=25, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 문서확인번호')
    pl_unique_num = models.CharField(max_length=25, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 고유번호')
    pl_address = models.CharField(max_length=50, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 주소')
    pl_jibun = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 지번')
    pl_road_address = models.CharField(max_length=50, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 도로명주소')
    pl_building_type = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 건물 유형 *choices*')
    pl_total_floor = models.IntegerField(db_comment='Property Listings 총 층수')
    pl_total_ho = models.SmallIntegerField(db_comment='Property Listings 총 호수')
    pl_total_household = models.SmallIntegerField(db_comment='Property Listings 총 세대수')
    pl_floor = models.IntegerField(db_comment='Property Listings 해당 매물 층')
    pl_ho = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 해당 매물 호')
    pl_area = models.DecimalField(max_digits=6, decimal_places=2, db_comment='Property Listings 면적 (총 6자리 중 2자리 소수점)')
    pl_common_area = models.DecimalField(max_digits=6, decimal_places=2, db_comment='Property Listings 공용 면적 (총 6자리 중 2자리 소수점)')
    pl_issue_date = models.DateTimeField(db_comment='Property Listings 문서 발급일')
    pl_issuer = models.CharField(max_length=20, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 발급기관')
    pl_contract_type = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Property Listings 전세/월세 *choices*')
    pl_deposit = models.IntegerField(db_comment='Property Listings 보증금')
    pl_monthly_rent = models.IntegerField(db_comment='Property Listings 월세')
    pl_maintenance_fee_yn = models.IntegerField(db_comment='Property Listings 관리비 여부\n0: 불가능\n1: 가능')
    pl_maintenance_fee = models.JSONField(db_comment='Property Listings 관리비 (항목별로 입력해야 할 것 같아 json)')
    pl_parking_yn = models.IntegerField(db_comment='Property Listings 주차가능여부\n0: 불가능\n1: 가능')
    pl_parking_fee = models.IntegerField(db_comment='Property Listings 주차비')
    pl_loan_yn = models.IntegerField(db_comment='Property Listings 대출가능여부\n0: 불가능\n1: 가능')
    pl_loan = models.IntegerField(db_comment='Property Listings 대출가능상품 \n예시\n0: 가능상품없음\n1: 카카오전세대출\n2: hug\n4: ...')
    pl_move_in_now_yn = models.IntegerField(db_comment='Property Listings 즉시 입주 가능 여부\n0: 불가능 (날짜선택)\n1: 가능')
    pl_move_in_date = models.DateTimeField(db_comment='Property Listings 입주 가능 날짜 (즉시 가능은 Now())')
    pl_etc = models.CharField(max_length=500, db_collation='utf8mb4_unicode_ci', blank=True, null=True, db_comment='Property Listings 비고')
    c_seq_landlord = models.BigIntegerField(db_comment='Property Listings 임대인 회원 번호')
    c_seq_agent = models.BigIntegerField(db_comment='Property Listings 중개인 회원 번호')
    pl_created = models.DateTimeField(db_comment='Property Listings 등록일')
    pl_updated = models.DateTimeField(db_comment='Property Listings 수정일')
    pl_views = models.IntegerField(db_comment='Property Listings 조회수')
    pl_view_yn = models.IntegerField(db_comment='Property Listings 노출 여부\n0: 숨김\n1: 노출')
    pl_deleted_yn = models.IntegerField(db_comment='Property Listings 삭제 여부\n0: 삭제안됨\n1: 삭제됨')
    pl_deleted = models.DateTimeField(db_comment='Property Listings 삭제일')

    class Meta:
        managed = False
        db_table = 'property_listings'
        db_table_comment = '매물 리스트'
