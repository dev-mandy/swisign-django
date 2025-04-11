from django.db import models

class TestData(models.Model):
    seq = models.BigAutoField(primary_key=True)
    testname = models.CharField(db_column='testName', max_length=20, blank=True, null=True)  # Field name made lowercase.
    age = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'test_data'