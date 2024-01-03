from django.urls import path
from . import views


urlpatterns = [
    path('', views.main),

    # 사용자 관리(회원가입,로그인,수정폼)
    path('signup/', views.signup, name='signup'),
    path('login/', views.login),
    path('login_chk/', views.login_chk),
    path('main_login_screen/', views.main2),
    path('my_information/', views.my_information),

    #몰루
    path('side/', views.side),
    path('mi/', views.MI),

    #지방 페이지
    path('seoul/', views.province_seoul),
    path('busan/', views.province_seoul),
    path('daegu/', views.province_seoul),
    path('incheon/', views.province_seoul),
    path('gwangju/', views.province_seoul),
    path('daejeon/', views.province_seoul),
    path('ulsan/', views.province_seoul),
    path('sejong/', views.province_seoul),
    path('jeju/', views.province_seoul),

    #상세 정보 페이지
    path('ttuk/', views.ttuk),
    path('ship/', views.ship),
    path('seoulcul/', views.cul),
    
    #마커 테스트
    path('maker/', views.maker),
]