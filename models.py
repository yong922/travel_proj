from django.db import models
### 데이터타입 라이브러리 정의
from django.db.models.fields import IntegerField, FloatField, CharField
from django.db.models import ForeignKey
# Create your models here.

### models.py에 클래스가 추가되는 경우 무조건 아래 명령 실행
# >python manage.py makemigrations travelapp
# >python manage.py migrate


# 회원정보 테이블

class Member(models.Model) :
    mem_id = CharField(primary_key=True,
                       max_length=20, null=False)
    mem_nm = CharField(max_length=20, null=False)
    mem_pw = CharField(max_length=20, null=False)
    teste = CharField(max_length=50, null=True)
    tema = CharField(max_length=50, null=True)
    top = CharField(max_length=50, null=True)

    class Meta :
        db_table = "member"
        app_label = "travelapp"
        managed = False


# 여행지 정보 모델추가
        
class Travel(models.Model):
    travel_nm = CharField(primary_key=True, max_length=100, null=False)
    images = CharField(max_length=100, null=False)
    sido = CharField(max_length=100, null=False)
    sigungu = CharField(max_length=100, null=True)
    travel_url= CharField(max_length=100,null=True)

    class Meta:
        db_table = "travel"
        app_label = "travelapp"
        managed = False


class Locations(models.Model):
    address = CharField(max_length=50, null=False)
    latitude = FloatField(max_length=10, null=False)
    longitude = FloatField(max_length=10, null=False)

    class Meta:
        app_label = "travelapp"
        managed = False
        db_table = 'locations'


#숙박업 위경도

class Loging(models.Model):
    address = models.CharField(max_length=300 ,primary_key=True)
    lo_lc = models.CharField(max_length=300)
    lo_la = models.CharField(max_length=300)

    class Meta:
        db_table = 'loging'  # 테이블 이름
        app_label = "travelapp"
        managed = False  # Django에 의해 관리되지 않는 테이블임을 설정
        

class ParkingLot(models.Model):
    address = models.CharField(max_length=500, primary_key=True)
    lo_la = models.CharField(max_length=100)
    lo_lc = models.CharField(max_length=100)

    class Meta:
        db_table = 'PARKING_LOT'
        app_label = "travelapp"
        managed = False


############# 사용자 맞춤 ################

# 관광지 테이블 
class Tour_Destination(models.Model):
    tour_num = IntegerField(primary_key=True, null=False)
    sigungu = CharField(max_length=100, null=False)
    sido = CharField(max_length=100, null=False)
    travel_nm = CharField(max_length=100, null=False)
    link = CharField(max_length=200, null=False)
    kg_l = CharField(max_length=50, null=True)
    kg_m = CharField(max_length=50, null=True)
    kg_s = CharField(max_length=50, null=True)
    v_nb = IntegerField(null=False)

    class Meta:
        app_label = "travelapp"
        db_table = 'tour_d' 
        managed = False


# 관광지 특성 테이블
class Tour_Feature(models.Model):
    tour_num = IntegerField(primary_key=True, null=False)
    # tour_num = ForeignKey(Tour_Destination, on_delete=models.CASCADE)
    s_m = FloatField(max_length=10, null=False)
    d_m = FloatField(max_length=10, null=False)
    wt = FloatField(max_length=10, null=False)
    oc = FloatField(max_length=10, null=False)
    am = FloatField(max_length=10, null=False)
    fw = FloatField(max_length=10, null=False)
    o_bd = FloatField(max_length=10, null=False)
    cty = FloatField(max_length=10, null=False)
    fl = FloatField(max_length=10, null=False)
    y_bd = FloatField(max_length=10, null=False)
    wk = FloatField(max_length=10, null=False)
    sity = FloatField(max_length=10, null=False)
    b_bd = FloatField(max_length=10, null=False)
    sh = FloatField(max_length=10, null=False)
    dy = FloatField(max_length=10, null=False)
    st = FloatField(max_length=10, null=False)
    ep = FloatField(max_length=10, null=False)
    ev = FloatField(max_length=10, null=False)
    ch_vs = FloatField(max_length=10, null=False)
    zero = FloatField(max_length=10, null=False)
    one = FloatField(max_length=10, null=False)
    two = FloatField(max_length=10, null=False)
    three = FloatField(max_length=10, null=False)
    four = FloatField(max_length=10, null=False)
    five = FloatField(max_length=10, null=False)

    class Meta:
        app_label = "travelapp"
        db_table = 'tour_df' 
        managed = False      


# 사용자 선호도 테이블
class User_prefer(models.Model):
    mem_id = CharField(primary_key=True, max_length=20, null=False)
    # mem_id = ForeignKey(Member, on_delete=models.CASCADE)
    s_m = FloatField(max_length=10, null=False)
    d_m = FloatField(max_length=10, null=False)
    wt = FloatField(max_length=10, null=False)
    oc = FloatField(max_length=10, null=False)
    am = FloatField(max_length=10, null=False)
    fw = FloatField(max_length=10, null=False)
    o_bd = FloatField(max_length=10, null=False)
    cty = FloatField(max_length=10, null=False)
    fl = FloatField(max_length=10, null=False)
    y_bd = FloatField(max_length=10, null=False)
    wk = FloatField(max_length=10, null=False)
    sity = FloatField(max_length=10, null=False)
    b_bd = FloatField(max_length=10, null=False)
    sh = FloatField(max_length=10, null=False)
    dy = FloatField(max_length=10, null=False)
    st = FloatField(max_length=10, null=False)
    ep = FloatField(max_length=10, null=False)
    ev = FloatField(max_length=10, null=False)
    ch_vs = FloatField(max_length=10, null=False)
    zero = FloatField(max_length=10, null=False)
    one = FloatField(max_length=10, null=False)
    two = FloatField(max_length=10, null=False)
    three = FloatField(max_length=10, null=False)
    four = FloatField(max_length=10, null=False)
    five = FloatField(max_length=10, null=False)

    class Meta:
        app_label = "travelapp"
        managed = False
        db_table = 'user_prefer'     
