document.addEventListener('DOMContentLoaded', function() {
    // 서브메뉴 토글 함수
    function toggleSubmenu(event) {
        event.stopPropagation();
        var submenu = this.querySelector('.dropdown-content');
        if (submenu.style.display === "block") {
            submenu.style.display = "none";
        } else {
            // 부모 요소에서 다른 서브메뉴 숨김
            var parentSubmenus = this.parentElement.querySelectorAll('.dropdown-content');
            parentSubmenus.forEach(function(submenu) {
                submenu.style.display = 'none';
            });

            submenu.style.display = "block";
        }
    }

    // 드롭다운 서브메뉴에 이벤트 리스너 추가
    var dropdownSubmenus = document.getElementsByClassName('dropdown-submenu');
    for (var i = 0; i < dropdownSubmenus.length; i++) {
        dropdownSubmenus[i].addEventListener('click', toggleSubmenu);
    }

    // 페이지를 클릭하면 모든 서브메뉴를 숨김
    document.body.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-submenu')) {
            var submenus = document.querySelectorAll('.dropdown-content');
            submenus.forEach(function(submenu) {
                submenu.style.display = 'none';
            });
        }
    });

    // 각 드롭다운에 대해
    document.querySelectorAll('.dropdown').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.stopPropagation();

            // 먼저 모든 드롭다운 메뉴를 숨김
            document.querySelectorAll('.dropdown-content').forEach(function(element) {
                element.style.display = 'none';
            });

            // 클릭한 요소의 드롭다운 메뉴만 보이게 함
            this.querySelector('.dropdown-content').style.display = 'block';
        });   
    });

    // '전국여행'을 클릭했을 때의 이벤트 리스너
    document.querySelector("#provinces").addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            var province = event.target.dataset.province;
            loadCities(province);
        }
    });

    // 시/군/구 데이터 로드 함수
    function loadCities(province) {
        var cities;

        switch (province) {
            case "경기도":
                cities = [{ name: "고양시", url: "/travel/Gyeonggi/Goyang-si" }, { name: "과천시", url: "/travel/Gyeonggi/Gwacheon-si" },  { name: "광명시", url: "/travel/Gyeonggi/Gwangmyeong-si" }, 
                { name: "광주시", url: "/travel/Gyeonggi/Gwangju-si" }, { name: "구리시", url: "/travel/Gyeonggi/Guri-si" }, { name: "김포시", url: "/travel/Gyeonggi/Gimpo-si" }, 
                { name: "남양주시", url: "/travel/Gyeonggi/Namyangju-si" }, { name: "동두천시", url: "/travel/Gyeonggi/Dongducheon-si" }, { name: "부천시", url: "/travel/Gyeonggi/Bucheon-si" },
                { name: "성남시", url: "/travel/Gyeonggi/Seongnam-si" }, { name: "수원시", url: "/travel/Gyeonggi/Suwon-si" }
                , { name: "시흥시", url: "/travel/Gyeonggi/Siheung-si" }, { name: "안산시", url: "/travel/Gyeonggi/Ansan-si" }, { name: "안성시", url: "/travel/Gyeonggi/Anseong-si" },
                { name: "안양시", url: "/travel/Gyeonggi/Anyang-si" }, { name: "수원시", url: "/travel/Gyeonggi/Yangju-si" }, { name: "여주시", url: "/travel/Gyeonggi/Yeoju-si" }, 
                { name: "오산시", url: "/travel/Gyeonggi/Osan-si" }, { name: "용인시", url: "/travel/Gyeonggi/Yongin-si" }, { name: "의왕시", url: "/travel/Gyeonggi/Uiwang-si" },
                { name: "의정부시", url: "/travel/Gyeonggi/Uijeongbu-si" }, { name: "이천시", url: "/travel/Gyeonggi/Icheon-si" }, { name: "파주시", url: "/travel/Gyeonggi/Paju-si" }, 
                { name: "평택시", url: "/travel/Gyeonggi/Pyeongtaek-si" }, { name: "포천시", url: "/travel/Gyeonggi/Pocheon-si" }, { name: "하남시", url: "/travel/Gyeonggi/Hanam-si" }
                , { name: "화성시", url: "/travel/Gyeonggi/Hwaseong-si" }];
                break;
            case "강원도":
                cities = [{ name: "춘천시", url: "/travel/Gangwondo/Chuncheon-si" }, { name: "원주시", url: "/travel/Gangwondo/Wonju-si" }, { name: "강릉시", url: "/travel/Gangwondo/Gangneung-si" },
                { name: "동해시", url: "/travel/Gangwondo/Donghae-si" },{ name: "태백시", url: "/travel/Gangwondo/Taebaek-si" } , { name: "속초시", url: "/travel/Gangwondo/Sokcho-si" }, { name: "삼척시", url: "/travel/Gangwondo/Samcheok-si" },
                { name: "홍천군", url: "/travel/Gangwondo/Hongcheon-gun" }, { name: "횡성군", url: "/travel/Gangwondo/Hoengseong-gun" }, { name: "영월군", url: "/travel/Gangwondo/Yeongwol-gun" }, { name: "평창군", url: "/travel/Gangwondo/Pyeongchang-gun" },
                { name: "정성군", url: "/travel/Gangwondo/Jeongseon-gun" }, { name: "철원군", url: "/travel/Gangwondo/Cheorwon-gun" }, { name: "화천군", url: "/travel/Gangwondo/Hwacheon-gun" }, { name: "양구군", url: "/travel/Gangwondo/Yanggu-gun" }
                ,{ name: "인제군", url: "/travel/Gangwondo/Inje-gun" }, { name: "고성군", url: "/travel/Gangwondo/Goseong-gun" }, { name: "양양군", url: "/travel/Gangwondo/Yangyang-gun" }];
                break;

            case "충청북도":
                cities = [{ name: "청주시", url: "/travel/Chung-cheongbukdo/Cheongju-si" }, { name: "충주시", url: "/travel/Chung-cheongbukdo/Chungju-si" }, { name: "제천시", url: "/travel/Chung-cheongbukdo/Jecheon-si" }, { name: "보은군", url: "/travel/Chung-cheongbukdo/Boeun-gun" },
                { name: "옥천군", url: "/travel/Chung-cheongbukdo/Okcheon-gun" }, { name: "영동군", url: "/travel/Chung-cheongbukdo/Yeongdong-gun" }, { name: "증평군", url: "/travel/Chung-cheongbukdo/Jeungpyeong-gun" },
                { name: "진천군", url: "/travel/Chung-cheongbukdo/Jincheon-gun" }, { name: "괴산군", url: "/travel/Chung-cheongbukdo/Goesan-gun" }, { name: "음성군", url: "/travel/Chung-cheongbukdo/Eumseong-gun" },
                { name: "단양군", url: "/travel/Chung-cheongbukdo/Danyang-gun" }];
                break;

            case "충청남도":
                cities = [{ name: "천안시", url: "/travel/Chung-cheongnamdo/Cheonan-si" },{ name: "공주시", url: "/travel/Chung-cheongnamdo/Gongju-si" } , { name: "당진시", url: "/travel/Chung-cheongnamdo/Dangjin-si" },{ name: "보령시", url: "/travel/Chung-cheongnamdo/Boryeong-si" },
                { name: "아산시", url: "/travel/Chung-cheongnamdo/Asan-si" }, { name: "서산시", url: "/travel/Chung-cheongnamdo/Seosan-si" }, { name: "논산시", url: "/travel/Chung-cheongnamdo/Nonsan-si" }, { name: "계룡시", url: "/travel/Chung-cheongnamdo/Gyeryong-si" }, { name: "금산군", url: "/travel/Chung-cheongnamdo/Geumsan-gun" }, 
                { name: "금산군", url: "/travel/Chung-cheongnamdo/Geumsan-gun" }, { name: "서천군", url: "/travel/Chung-cheongnamdo/Seocheon-gun"}, { name: "청양군", url: "/travel/Chung-cheongnamdo/Cheongyang-gun" },
                { name: "홍성군", url: "/travel/Chung-cheongnamdo/Hongseong-gun" }, { name: "천안시", url: "/travel/Chung-cheongnamdo/Yesan-gun" }, { name: "태안군", url: "/travel/Chung-cheongnamdo/Taean-gun" }];
                break;
            case "전라북도":
                cities = [{ name: "전주시", url: "/travel/Jeollabuk-do/Jeonju-si" },{ name: "군산시", url: "/travel/Jeollabuk-do/Gunsan-si" }, { name: "익산시", url: "/travel/Jeollabuk-do/Iksan-si" }, { name: "정읍시", url: "/travel/Jeollabuk-do/Jeongeup-si" }, { name: "남원시", url: "/travel/Jeollabuk-do/Namwon-si" },
                { name: "김제시", url: "/travel/Jeollabuk-do/Gimje-si" },{ name: "완주군", url: "/travel/Jeollabuk-do/Wanju-gun" }, { name: "진안군", url: "/travel/Jeollabuk-do/Jinan-gun" },
                { name: "무주군", url: "/travel/Jeollabuk-do/Muju-gun" }, { name: "장수군", url: "/travel/Jeollabuk-do/Jangsu-gun" }, { name: "임실군", url: "/travel/Jeollabuk-do/Imsil-gun" },
                { name: "순창군", url: "/travel/Jeollabuk-do/Sunchang-gun" }, { name: "고창군", url: "/travel/Jeollabuk-do/Gochang-gun" }, { name: "전주시", url: "/travel/Jeollabuk-do/Buan-gun" }];
                break;
            case "전라남도":
                cities = [{ name: "목포시", url: "/travel/Jeollanam-do/mokpo-si" }, { name: "화순군", url: "/travel/Jeollabuk-do/Hwasun-gun" }, { name: "여수시", url: "/travel/Jeollabuk-do/Yeosu-si" }, { name: "순천시", url: "/travel/Jeollabuk-do/Suncheon-si" }, { name: "나주시", url: "/travel/Jeollabuk-do/Naju-si" }, 
                { name: "광양시", url: "/travel/Jeollabuk-do/Gwangyang-si" }, { name: "담양군", url: "/travel/Jeollabuk-do/Damyang-gun" }, { name: "곡성군", url: "/travel/Jeollabuk-do/Gokseong-gun" }, { name: "구례군", url: "/travel/Jeollabuk-do/Gurye-gun" },{ name: "고흥군", url: "/travel/Jeollabuk-do/Goheung-gun" },
                { name: "보성군", url: "/travel/Jeollabuk-do/Boseong-gun" }, { name: "장흥군", url: "/travel/Jeollabuk-do/Jangheung-gun"},
                { name: "강진군", url: "/travel/Jeollabuk-do/Gangjin-gun" }, { name: "해남군", url: "/travel/Jeollabuk-do/Haenam-gun" },{ name: "영암군", url: "/travel/Jeollabuk-do/Yeongam-gun" }, { name: "무안군", url: "/travel/Jeollabuk-do/Muan-gun" }, { name: "함평군", url: "/travel/Jeollabuk-do/Hampyeong-gun" },{ name: "영광군", url: "/travel/Jeollabuk-do/Yeonggwang-gun" }, 
                { name: "장성군", url: "/travel/Jeollabuk-do/Jangseong-gun" }, { name: "완도군", url: "/travel/Jeollabuk-do/Wando-gun" },
                { name: "진도군", url: "/travel/Jeollabuk-do/Jindo-gun" }, { name: "신안군", url: "/travel/Jeollabuk-do/Sinana-gun" }];
                break;

            case "경상북도":
                cities = [{ name: "포항시", url: "/travel/Gyeongsangbuk-do/Pohang-si" }, { name: "경주시", url: "/travel/Gyeongsangbuk-do/Gyeongju-si" }, { name: "김천시", url: "/travel/Gyeongsangbuk-do/Gimcheon-si" },{ name: "안동시", url: "/travel/Gyeongsangbuk-do/Andong-si" }, { name: "구미시", url: "/travel/Gyeongsangbuk-do/Gumi-si" },
                { name: "영주시", url: "/travel/Gyeongsangbuk-do/Yeongju-si" }, { name: "영천시", url: "/travel/Gyeongsangbuk-do/Yeongcheon-si" }, { name: "상주시", url: "/travel/Gyeongsangbuk-do/Sangju-si" },{ name: "문경시", url: "/travel/Gyeongsangbuk-do/Mungyeong-si" },{ name: "경산시", url: "/travel/Gyeongsangbuk-do/Gyeongsan-si" },
                { name: "군위군", url: "/travel/Gyeongsangbuk-do/Gunwi-gun" }, { name: "의성군", url: "/travel/Gyeongsangbuk-do/Uiseong-gun" },{ name: "청송군", url: "/travel/Gyeongsangbuk-do/Cheongsong-gun"}, { name: "영양군", url: "/travel/Gyeongsangbuk-do/Yeongyang-gun" }
                , { name: "영덕군", url: "/travel/Gyeongsangbuk-do/Yeongdeok-gun" }, { name: "청도군", url: "/travel/Gyeongsangbuk-do/Cheongdo-gun" }, { name: "고령군", url: "/travel/Gyeongsangbuk-do/Goryeong-gun" }, { name: "성주군", url: "/travel/Gyeongsangbuk-do/Seongju-gun" }, { name: "칠곡군", url: "/travel/Gyeongsangbuk-do/Chilgok-gun" },
                { name: "예천군", url: "/travel/Gyeongsangbuk-do/Yecheon-gun" }, { name: "봉화군", url: "/travel/Gyeongsangbuk-do/Bonghwa-gun" }, { name: "울진군", url: "/travel/Gyeongsangbuk-do/Uljin-gun" }, { name: "울릉군", url: "/travel/Gyeongsangbuk-do/Ulleung-gun" }];
                break;
            case "경상남도":
                cities = [{ name: "창원시", url: "/travel/Gyeongsangnam-do/Changwon-si" }, { name: "진주시", url: "/travel/Gyeongsangbuk-do/Jinju-si" }, { name: "통영시", url: "/travel/Gyeongsangbuk-do/Tongyeong-si" }, { name: "사천시", url: "/travel/Gyeongsangbuk-do/Sacheon-si" }, { name: "김해시", url: "/travel/Gyeongsangbuk-do/Gimhae-si" },
                { name: "밀양시", url: "/travel/Gyeongsangbuk-do/Miryang-si" }, { name: "거제시", url: "/travel/Gyeongsangbuk-do/Geoje-si" }, { name: "양산시", url: "/travel/Gyeongsangbuk-do/Yangsan-si" }, { name: "의령군", url: "/travel/Gyeongsangbuk-do/Uiryeong-gun" }, { name: "함안군", url: "/travel/Gyeongsangbuk-do/Haman-gun"},
                { name: "창녕군", url: "/travel/Gyeongsangbuk-do/Changnyeong-gun" }, { name: "고성군", url: "/travel/Gyeongsangbuk-do/Goseong-gun" }, { name: "남해군", url: "/travel/Gyeongsangbuk-do/Namhae-gun" },{ name: "하동군", url: "/travel/Gyeongsangbuk-do/Hadong-gun" }
                ,{ name: "산청군", url: "/travel/Gyeongsangbuk-do/Sancheong-gun" }, { name: "함양군", url: "/travel/Gyeongsangbuk-do/Hamyang-gun" }, { name: "거창군", url: "/travel/Gyeongsangbuk-do/Geochang-gun" }, { name: "합천군", url: "/travel/Gyeongsangbuk-do/Hapcheon-gun" }];
                break;
        }

        var citiesBox = document.querySelector("#cities");
        citiesBox.innerHTML = "";  // 기존도시 제거
        for (var i = 0; i < cities.length; i++) {
            var city = document.createElement("a");
            city.href = cities[i].url;
            city.textContent = cities[i].name;
            citiesBox.appendChild(city);
        }
    }
});

//   { name: "창원시", url: "http://www.changwon.go.kr/" }
  