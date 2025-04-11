from django.db import models
from appCommon.models import RealtyListingsStatus

class RealtyListings(models.Model):
    rl_seq = models.BigAutoField(primary_key=True, db_comment='Realty Listings 시퀀스')
    rl_status = models.CharField(max_length=10, choices=RealtyListingsStatus.CHOICES, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 매물 진행 상태')
    rl_document_num = models.CharField(max_length=25, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 문서확인번호')
    rl_unique_num = models.CharField(max_length=25, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 고유번호')
    rl_address = models.CharField(max_length=50, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 주소')
    rl_jibun = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 지번')
    rl_road_address = models.CharField(max_length=50, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 도로명주소')
    rl_building_type = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 건물 유형 *choices*')
    rl_total_floor = models.IntegerField(db_comment='Realty Listings 총 층수')
    rl_total_household = models.SmallIntegerField(db_comment='Realty Listings 총 세대수')
    rl_total_ho = models.SmallIntegerField(db_comment='Realty Listings 총 호수')
    rl_floor = models.IntegerField(db_comment='Realty Listings 해당 매물 층')
    rl_ho = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 해당 매물 호')
    rl_area = models.DecimalField(max_digits=6, decimal_places=2, db_comment='Realty Listings 면적 (총 6자리 중 2자리 소수점)')
    rl_common_area = models.DecimalField(max_digits=6, decimal_places=2, db_comment='Realty Listings 공용 면적 (총 6자리 중 2자리 소수점)')
    rl_issue_date = models.DateTimeField(db_comment='Realty Listings 문서 발급일')
    rl_issuer = models.CharField(max_length=20, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 발급기관')
    rl_contract_type = models.CharField(max_length=10, db_collation='utf8mb4_unicode_ci', db_comment='Realty Listings 전세/월세 *choices*')
    rl_deposit = models.IntegerField(db_comment='Realty Listings 보증금')
    rl_rent = models.IntegerField(db_comment='Realty Listings 월세')
    rl_maintenance_is_fixed = models.IntegerField(db_comment='Realty Listings 관리비 고정 여부\n0: 가변\n1: 고정')
    rl_maintenance_fee = models.CharField(max_length=500, db_collation='utf8mb4_bin', db_comment='Realty Listings 관리비 고정 시 Number치환필요')
    rl_parking_yn = models.IntegerField(db_comment='Realty Listings 주차가능여부\n0: 불가능\n1: 가능')
    rl_parking_fee = models.IntegerField(db_comment='Realty Listings 주차비')
    rl_loan_yn = models.IntegerField(db_comment='Realty Listings 대출가능여부\n0: 불가능\n1: 가능')
    rl_move_in_now_yn = models.IntegerField(db_comment='Realty Listings 즉시 입주 가능 여부\n0: 불가능 (날짜선택)\n1: 가능')
    rl_move_in_date = models.DateTimeField(db_comment='Realty Listings 입주 가능 날짜 (즉시 가능은 Now())')
    rl_etc = models.CharField(max_length=500, db_collation='utf8mb4_unicode_ci', blank=True, null=True, db_comment='Realty Listings 비고')
    c_seq_landlord = models.BigIntegerField(db_comment='Property Listings 임대인 회원 번호')
    c_seq_agent = models.BigIntegerField(db_comment='Property Listings 중개인 회원 번호')
    rl_created = models.DateTimeField(db_comment='Realty Listings 등록일')
    rl_updated = models.DateTimeField(db_comment='Realty Listings 수정일')
    rl_views = models.IntegerField(db_comment='Realty Listings 조회수')
    rl_view_yn = models.IntegerField(db_comment='Realty Listings 노출 여부\n0: 숨김\n1: 노출')
    rl_deleted_yn = models.IntegerField(db_comment='Realty Listings 삭제 여부\n0: 삭제안됨\n1: 삭제됨')
    rl_deleted = models.DateTimeField(db_comment='Realty Listings 삭제일')

    class Meta:
        managed = False
        db_table = 'realty_listings'
        db_table_comment = '매물 리스트'
