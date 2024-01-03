document.querySelectorAll('.ex').forEach(function(el) {
    // 요소의 텍스트 길이를 가져온다.
    var textLength = el.textContent.length;

    // 요소의 텍스트 길이에 따라서 ::after 의 content 속성을 변경한다.
    el.style.setProperty('--content-length', `"${'-'.repeat(textLength)}"`);
});

//네비게이션 스크롤
$(window).on('scroll', function() {
    var scrollPos = $(window).scrollTop();
    $('.nav-link').each(function() {
      var sectionId = $(this).attr('href');
      var sectionTop = $(sectionId).offset().top;
      var sectionHeight = $(sectionId).height();
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
      }
    });
  });
  
  $('.nav-link').on('click', function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 800);
  });

