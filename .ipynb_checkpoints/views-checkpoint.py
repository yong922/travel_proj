from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator
import random
from django.shortcuts import render
from django.http import JsonResponse
from .models import Member,Travel, Tour_Feature, Tour_Destination, User_prefer, Loging, ParkingLot
from django.forms import model_to_dict

from nonmodelapp.model_db_class.member import member as mem

# 함수 파일 임포트
import travelapp.utils as util


# 메인페이지
def main(request) :

    mem_id = '사용자'
    user_data = Member.objects.values().get(mem_id=mem_id)
    top = user_data['top']

    ttop = top[1:-1].split(',')

    t_1 = int(ttop[0])
    t_2 = int(ttop[1])
    t_3 = int(ttop[2])
    t_4 = int(ttop[3])
    t_5 = int(ttop[4])

    top1 = Tour_Destination.objects.get(tour_num = t_1)
    top2 = Tour_Destination.objects.get(tour_num = t_2)
    top3 = Tour_Destination.objects.get(tour_num = t_3)
    top4 = Tour_Destination.objects.get(tour_num = t_4)
    top5 = Tour_Destination.objects.get(tour_num = t_5)

    return render(request,
                "travelapp/main.html",
                {"mem_id" : mem_id,
                "top1" : top1,
                "top2" : top2,
                "top3" : top3,
                "top4" : top4,
                "top5" : top5,
                })

def main2(request) :

    # 로그인 했을때 넘어오는 mem_id 받는게 필요함 처리해주세요 ㅇㅇ
    # 여기에 mem_id 정의해주세요
    mem_id = request.session["ses_mem_id"]
    
    user_data = Member.objects.values().get(mem_id=mem_id)
    top = user_data['top']
    ttop = top[1:-1].split(',')

    t_1 = int(ttop[0])
    t_2 = int(ttop[1])
    t_3 = int(ttop[2])
    t_4 = int(ttop[3])
    t_5 = int(ttop[4])

    top1 = Tour_Destination.objects.get(tour_num = t_1)
    top2 = Tour_Destination.objects.get(tour_num = t_2)
    top3 = Tour_Destination.objects.get(tour_num = t_3)
    top4 = Tour_Destination.objects.get(tour_num = t_4)
    top5 = Tour_Destination.objects.get(tour_num = t_5)

    return render(request,
                  "travelapp/main_login_screen.html",
                  {"mem_id" : mem_id,
                    "top1" : top1,
                    "top2" : top2,
                    "top3" : top3,
                    "top4" : top4,
                    "top5" : top5,
                   })


### 로그인페이지
def login(request) :
    return render(request,
                  "travelapp/login.html")

### 로그인 인증 처리하기
def login_chk(request) :
    mem_id   = request.POST["mem_id"]
    mem_pw = request.POST["mem_pw"]

    mem_view = mem.getLoginChk(mem_id, mem_pw)

    if mem_view.get("RS") == "Data_None" :
        msg = """
            <script type="text/javascript">
                alert('아이디 또는 패스워드를 확인해주세요!!');
                history.go(-1);
            </script>
        """
        return HttpResponse(msg)


    request.session["ses_mem_id"] = mem_id
    request.session["ses_mem_nm"] = mem_view.get("mem_nm")

    msg = """
        <script type="text/javascript">
            alert('환영합니다. [{}]님 로그인 되었습니다.');
            location.href = '/travel/main_login_screen';
        </script>
    """.format(mem_view.get("mem_nm"))

    return HttpResponse(msg)


# 메인-로그인 완료페이지 
def main_login_screen(request) :
    return render(request,
                  "travelapp/main_login_screen.html")

# 회원가입 db
#  step = request.POST.get('stepnumber')
#         mem_id = request.POST.get('mem_id')
#         mem_nm = request.POST.get('mem_nm')
#         mem_pw = request.POST.get('mem_pw')
#         teste = request.POST.get('teste')
#         tema = request.POST.get('tema')

#         print("Step Number:", step)
#         print("Received Data - mem_id:", mem_id)
#         print("Received Data - mem_pw:", mem_pw)
#         print("Received Data - mem_nm:", mem_nm)
#         print("Received Data - teste:", teste)
#         print("Received Data - tema:", tema)


def signup_default(request):
    
    if request.method == "POST":
        direction = request.POST.get('direction', None)
        step = str(request.POST.get('stepnumber'))
        prev_clicked = str(request.POST.get('prev_clicked', 'false')) # Get 'prev_clicked' value

        step = request.POST.get('stepnumber')
        mem_id = request.POST.get('mem_id')
        mem_nm = request.POST.get('mem_nm')
        mem_pw = request.POST.get('mem_pw')
        teste = request.POST.get('teste')
        tema = request.POST.get('tema')

        print("Step Number:", step)
        print("Received Data - mem_id:", mem_id)
        print("Received Data - mem_pw:", mem_pw)
        print("Received Data - mem_nm:", mem_nm)
        print("Received Data - teste:", teste)
        print("Received Data - tema:", tema)

        session_keys = {
            '1': ['mem_id', 'mem_nm', 'mem_pw'],
            '2': ['teste'],
            '3': ['tema']
        }
        mem_id = None  # initialize mem_id

        if direction == 'prev':  # if direction is previous
            try:
                prev_step = str(int(step) - 1)
            except ValueError:
                # Here you can log an error message or set a default value to prev_step
                prev_step = "0" # or any other default value
                

            # If moving back to step 1, delete the mem_id from the database
            if prev_step == '1':
                mem_id = request.session.get('mem_id')
                if mem_id:
                    Member.objects.filter(mem_id=mem_id).delete()
            else:
                # For other steps, just delete the session data
                for key in session_keys[prev_step]:
                    if key in request.session:
                        del request.session[key]

            return JsonResponse({"status": "OK", "message": f"Moved back to step {prev_step}. Data deleted."})


        if step == '1' and prev_clicked == 'false':
            mem_id =  request.POST.get('mem_id')
            mem_nm = request.POST.get('mem_nm')
            mem_pw = request.POST.get('mem_pw')
            
            request.session['mem_id'] = mem_id
            request.session['mem_nm'] = mem_nm
            request.session['mem_pw'] = mem_pw

            Member.objects.create(mem_id = mem_id, mem_nm = mem_nm, mem_pw = mem_pw)

            return JsonResponse({"status": "OK", "message": "Step 1 completed. User info saved."})

        elif step == '2':
            teste = request.POST.get('teste')
            request.session['teste'] = teste

            mem_id = request.session.get('mem_id')
            Member.objects.filter(mem_id=mem_id).update(teste=teste)

            return JsonResponse({"status": "OK", "message": "Step 2 completed. Data saved."})

        elif step == '3':
            tema = request.POST.get('tema')
            request.session['tema'] = tema

            mem_id = request.session.get('mem_id')
            Member.objects.filter(mem_id=mem_id).update(tema=tema)

            request.session.flush()  # Clear all session data

            return JsonResponse({"status": "OK", "message": "Step 3 completed. User registration completed."})

        else:
            return JsonResponse({"status": "ERROR", "message": "Invalid step."})

    else: 
        return render(request, "travelapp/signup.html")
    

def signup(request):
    
    if request.method == "POST":
        direction = request.POST.get('direction', None)
        step = str(request.POST.get('stepnumber'))
        prev_clicked = str(request.POST.get('prev_clicked', 'false')) # Get 'prev_clicked' value

        session_keys = {
            '1': ['mem_id', 'mem_nm', 'mem_pw'],
            '2': ['teste'],
            '3': ['tema']
        }
        mem_id = None  # initialize mem_id

        if direction == 'prev':  # if direction is previous
            try:
                prev_step = str(int(step) - 1)
            except ValueError:
                # Here you can log an error message or set a default value to prev_step
                prev_step = "0" # or any other default value
                
            # If moving back to step 1, delete the mem_id from the database
            if prev_step == '1':
                mem_id = request.session.get('mem_id')
                if mem_id:
                    Member.objects.filter(mem_id=mem_id).delete()
            else:
                # For other steps, just delete the session data
                for key in session_keys[prev_step]:
                    if key in request.session:
                        del request.session[key]

            return JsonResponse({"status": "OK", "message": f"Moved back to step {prev_step}. Data deleted."})


        if step == '1' and prev_clicked == 'false':
            mem_id =  request.POST.get('mem_id')
            mem_nm = request.POST.get('mem_nm')
            mem_pw = request.POST.get('mem_pw')
            
            request.session['mem_id'] = mem_id
            request.session['mem_nm'] = mem_nm
            request.session['mem_pw'] = mem_pw

            Member.objects.create(mem_id = mem_id, mem_nm = mem_nm, mem_pw = mem_pw)

            return JsonResponse({"status": "OK", "message": "Step 1 completed. User info saved."})

        elif step == '2':
            teste = request.POST.get('teste')
            request.session['teste'] = teste

            mem_id = request.session.get('mem_id')

            Member.objects.filter(mem_id=mem_id).update(teste=teste)

            return JsonResponse({"status": "OK", "message": "Step 2 completed. Data saved."})

        elif step == '3':
            tema = request.POST.get('tema')
            request.session['tema'] = tema

            mem_id = request.session.get('mem_id')
            teste2 = request.session.get('teste')

            # print('tema : ',tema)

            # 선택한 tour_num 뽑아오기
            t_d1 = int(teste2[0])
            t_d2 = int(teste2[2])
            t_d3 = int(teste2[4])
            # print(t_d1)

            # tour_feature 테이블에서 해당 행을 뽑아오기
            # 형태 딕셔너리
            tour1 = Tour_Feature.objects.values().get(tour_num = t_d1)
            tour2 = Tour_Feature.objects.values().get(tour_num = t_d2)
            tour3 = Tour_Feature.objects.values().get(tour_num = t_d3)
            tour_dict = util.merge_dicts(tour1,tour2,tour3)

            # 회원 취향 데이터 : 딕셔너리 형태
            user_data = util.calculate_average(tour_dict,tema,mem_id)
            tour_all = Tour_Feature.objects.values().all()

            # top5함수(전국)
            top5 = util.calculate_ele_differ_top5(user_data,tour_all)

            # user_prefer에 update하는 부분
            user_prefer_data = model_to_dict(User_prefer(), fields=[field.name for field in User_prefer._meta.fields])
            user_prefer_data.update(user_data)
            User_prefer.objects.create(**user_prefer_data)

            Member.objects.filter(mem_id=mem_id).update(top=top5)
            Member.objects.filter(mem_id=mem_id).update(tema=tema)

            request.session.flush()  # Clear all session data

            return JsonResponse({"status": "OK", "message": "Step 3 completed. User registration completed."})

        else:
            return JsonResponse({"status": "ERROR", "message": "Invalid step."})
            
    else: 
        return render(request, "travelapp/signup.html")
    
    
    
#수정폼    
def my_information(request) :
    return render(request,
                  "travelapp/my_information.html")


### 전국페이지 
def side(request) :
    return render(request,
                  "travelapp/side.html")


# 지방 화면
from django.shortcuts import render
import random

def province_seoul(request):

    # Travel 모델에서 전체 데이터 가져오기
    travel_data = Travel.objects.all()
    
    # 선택된 데이터를 담을 리스트 생성
    selected_travel_data = []
    
    # 랜덤으로 5개 선택
    if len(travel_data) > 5:
        selected_travel_data = random.sample(list(travel_data), 5)
    else:
        selected_travel_data = list(travel_data)
        
    # 선택된 데이터를 사용할 수 있는 형태로 변환
    tourist_areas = [{'name': data.travel_nm, 'image': data.images, 'location': f"{data.sido} {data.sigungu}", 'url': data.travel_url} for data in selected_travel_data]
    
    # 음식점 정보를 얻는 부분도 비슷하게 처리할 수 있습니다.
    # 현재 예시에서는 food_areas에 대한 처리는 생략하였습니다.
    
    context = {
        'tourist_areas': tourist_areas,
        # 'food_areas': selected_food_areas,
    }

    return render(request, 'travelapp/province_seoul.html', context)



#상세 페이지
def MI(request) :
    return render(request,
                  "travelapp/more_information.html")

#상세 떡축제 페이지
def ttuk(request) :
    return render(request,
                  "travelapp/festival/ttuk.html")

#상세 뱃놀이 페이지
def ship(request) :
    return render(request,
                  "travelapp/festival/shipplay.html")


#상세 서울 문화 페이지
def cul(request) :
    return render(request,
                  "travelapp/festival/seoulcul.html")


#마커테스트
def maker(request):
    logings = Loging.objects.all()
    parking_lots = ParkingLot.objects.all()
    loging_coords = []
    parking_lot_coords = []
    
    for loging in logings:
        coord = {
            'lat': float(loging.lo_la),
            'lng': float(loging.lo_lc),
        }
        loging_coords.append(coord)

    
    for parking_lot in parking_lots:
        coord = {
            'lat': float(parking_lot.lo_la),
            'lng': float(parking_lot.lo_lc),
        }
        parking_lot_coords.append(coord)


    return render(request, "travelapp/maker.html", {'logings': loging_coords,'parking_lots': parking_lot_coords})


