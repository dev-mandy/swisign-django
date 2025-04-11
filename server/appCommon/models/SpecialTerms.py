from django.db import models

class SpecialTerms(models.Model):
    st_seq = models.BigAutoField(primary_key=True, db_comment='Special Terms 시퀀스')
    st_content = models.CharField(max_length=500, db_comment='Special Terms 특약사항 내용')
    st_use_count = models.IntegerField(db_comment='Special Terms 사용 횟수')
    st_is_public = models.IntegerField(db_comment='Special Terms 특약사항 공유 여부\n0: 공유안함 (개인만 사용)\n1: 공유 (모두 사용 가능)')
    st_created = models.DateTimeField(db_comment='Special Terms 생성일시')
    st_updated = models.DateTimeField(db_comment='Special Terms 수정일시')

    class Meta:
        managed = False
        db_table = 'special_terms'
        db_table_comment = '특약사항 리스트'
