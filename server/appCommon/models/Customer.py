from django.db import models

class Customer(models.Model):
    c_seq = models.BigAutoField(primary_key=True, db_comment='Customer 시퀀스 넘버')
    c_name = models.CharField(max_length=100, blank=True, null=True)
    c_id = models.CharField(max_length=100, db_comment='Customer ID (암호화)')
    c_sns_id = models.CharField(max_length=100, blank=True, null=True, db_comment='Customer SNS 회원가입 시 넘겨받은 ID')
    c_phone = models.CharField(max_length=100, db_comment='Customer 핸드폰 번호 (암호화)')
    c_ci = models.CharField(max_length=500, db_comment='Customer 핸드폰 인증 CI')
    c_di = models.CharField(max_length=500, db_comment='Customer 핸드폰 인증 DI')
    c_password = models.CharField(max_length=500, db_comment='Customer 비밀번호 (암호화)')
    c_account_type = models.IntegerField(db_comment='Customer 계정 유형\n1: 일반\n2: 카카오\n3: 네이버\n4: 구글\n5: 애플')
    c_road_address = models.CharField(max_length=500, blank=True, null=True, db_comment='Customer 도로명 주소')
    c_jibun_address = models.CharField(max_length=500, blank=True, null=True, db_comment='Customer 지번주소')
    c_detail_address = models.CharField(max_length=500, blank=True, null=True, db_comment='Customer 상세주소')
    c_post_code = models.CharField(max_length=10, blank=True, null=True, db_comment='Customer 우편번호')
    c_email = models.CharField(max_length=100, blank=True, null=True, db_comment='Customer 이메일 (암호화)')
    c_gender = models.CharField(max_length=1, blank=True, null=True, db_comment='Customer 성별\nM:남성\nW:여성')
    c_swisign_bit = models.SmallIntegerField(db_comment='Customer 전자계약 이용 설정\n0: 선택안함\n1: 임차인\n2: 임대인\n4: 중개인\n8: 기타')
    c_house_bit = models.SmallIntegerField(db_comment='Customer 주택 유형\n0: 선택안함\n1: 자가\n2: 전세\n4: 월세\n8: 기타')
    c_use_term_agree = models.IntegerField(db_comment='Customer 이용 약관 동의 여부\n0: 미동의\n1: 동의')
    c_privacy_term_agree = models.IntegerField(db_comment='Customer 개인정보 수집 및 이용동의 여부\n0: 미동의\n1: 동의')
    c_promotion_agree = models.IntegerField(db_comment='Customer 프로모션 정보 수신 동의 여부\n0: 미동의\n1: 동의')
    c_created = models.DateTimeField(db_comment='Customer 생성일시')
    c_updated = models.DateTimeField(db_comment='Customer 수정일시')
    c_last_logged_in = models.DateTimeField(db_comment='Customer 마지막 로그인일시')
    c_last_password_changed = models.DateTimeField(db_comment='Customer 마지막 비밀번호 변경일시')
    c_delete_yn = models.IntegerField(db_comment='Customer 삭제여부 (soft delete 방식 사용 시)\n0: 정상회원\n1: 삭제회원')
    c_sleep_yn = models.IntegerField(db_comment='Customer 휴면 여부\n0: 정상회원\n1: 휴면회원')

    class Meta:
        managed = False
        db_table = 'customer'
        db_table_comment = '고객 테이블'
