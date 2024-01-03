var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',  // 한 번에 보여지는 슬라이드 수를 자동으로 결정
    slidesPerGroup: 1, // 한 번에 움직이는 슬라이드 수를 3으로 설정
    spaceBetween: -850,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,

    freeMode: true, // 추가된 옵션
    freeModeSticky: true // 추가된 옵션
});
