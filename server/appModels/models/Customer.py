from django.db import models

class Customer(models.Model):
    c_seq = models.BigAutoField(db_column='C_seq', primary_key=True, db_comment='Customer 시퀀스 넘버')  # Field name made lowercase.
    c_name = models.CharField(db_column='C_name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    c_id = models.CharField(db_column='C_id', max_length=100, db_comment='Customer ID (암호화)')  # Field name made lowercase.
    c_snsid = models.CharField(db_column='C_snsId', max_length=100, blank=True, null=True, db_comment='Customer SNS 회원가입 시 넘겨받은 ID')  # Field name made lowercase.
    c_phone = models.CharField(db_column='C_phone', max_length=100, db_comment='Customer 핸드폰 번호 (암호화)')  # Field name made lowercase.
    c_ci = models.CharField(db_column='C_CI', max_length=500, db_comment='Customer 핸드폰 인증 CI')  # Field name made lowercase.
    c_di = models.CharField(db_column='C_DI', max_length=500, db_comment='Customer 핸드폰 인증 DI')  # Field name made lowercase.
    c_password = models.CharField(db_column='C_password', max_length=500, db_comment='Customer 비밀번호 (암호화)')  # Field name made lowercase.
    c_accounttype = models.IntegerField(db_column='C_accountType', db_comment='Customer 계정 유형\n1: 일반\n2: 카카오\n3: 네이버\n4: 구글\n5: 애플')  # Field name made lowercase.
    c_roadaddress = models.CharField(db_column='C_roadAddress', max_length=500, blank=True, null=True, db_comment='Customer 도로명 주소')  # Field name made lowercase.
    c_bunjiaddress = models.CharField(db_column='C_bunjiAddress', max_length=500, blank=True, null=True, db_comment='Customer 구주소')  # Field name made lowercase.
    c_detailaddress = models.CharField(db_column='C_detailAddress', max_length=500, blank=True, null=True, db_comment='Customer 상세주소')  # Field name made lowercase.
    c_postcode = models.CharField(db_column='C_postCode', max_length=10, blank=True, null=True, db_comment='Customer 우편번호')  # Field name made lowercase.
    c_email = models.CharField(db_column='C_email', max_length=100, blank=True, null=True, db_comment='Customer 이메일 (암호화)')  # Field name made lowercase.
    c_gender = models.CharField(db_column='C_gender', max_length=1, blank=True, null=True, db_comment='Customer 성별\nM:남성\nW:여성')  # Field name made lowercase.
    c_swisignbit = models.SmallIntegerField(db_column='C_swisignBit', db_comment='Customer 전자계약 이용 설정\n0: 선택안함\n1: 임차인\n2: 임대인\n4: 중개인\n8: 기타')  # Field name made lowercase.
    c_housebit = models.SmallIntegerField(db_column='C_houseBit', db_comment='Customer 주택 유형\n0: 선택안함\n1: 자가\n2: 전세\n4: 월세\n8: 기타')  # Field name made lowercase.
    c_usetermagree = models.IntegerField(db_column='C_useTermAgree', db_comment='Customer 이용 약관 동의 여부\n0: 미동의\n1: 동의')  # Field name made lowercase.
    c_privacytermagree = models.IntegerField(db_column='C_privacyTermAgree', db_comment='Customer 개인정보 수집 및 이용동의 여부\n0: 미동의\n1: 동의')  # Field name made lowercase.
    c_promotionagree = models.IntegerField(db_column='C_promotionAgree', db_comment='Customer 프로모션 정보 수신 동의 여부\n0: 미동의\n1: 동의')  # Field name made lowercase.
    c_created = models.DateTimeField(db_column='C_created', db_comment='Customer 생성일시')  # Field name made lowercase.
    c_updated = models.DateTimeField(db_column='C_updated', db_comment='Customer 수정일시')  # Field name made lowercase.
    c_lastloggedin = models.DateTimeField(db_column='C_lastLoggedIn', db_comment='Customer 마지막 로그인일시')  # Field name made lowercase.
    c_lastpasswordchanged = models.DateTimeField(db_column='C_lastPasswordChanged', db_comment='Customer 마지막 비밀번호 변경일시')  # Field name made lowercase.
    c_deleteyn = models.IntegerField(db_column='C_deleteYn', db_comment='Customer 삭제여부 (soft delete 방식 사용 시)\n0: 정상회원\n1: 삭제회원')  # Field name made lowercase.
    c_sleepyn = models.IntegerField(db_column='C_sleepYn', db_comment='Customer 휴면 여부\n0: 정상회원\n1: 휴면회원')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'customer'
        db_table_comment = '고객 테이블'
