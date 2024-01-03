// 페이지 로드 시에 드롭다운 메뉴 숨기기
window.addEventListener('load', function() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'none';
  });
  
  // 드롭다운 메뉴 보이기
  function showDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'block';
  }
  
  // 드롭다운 메뉴 숨기기
  function hideDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'none';
  }

