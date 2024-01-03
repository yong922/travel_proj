// 수정된 이미지 파일 경로
var updatedImagePaths = [
    "/static/travelapp/img/cate2/dy.jpg",
    "/static/travelapp/img/cate2/st.png",
    "/static/travelapp/img/cate2/ep.jpg",
    "/static/travelapp/img/cate2/ev.jpg",
];

  
  function createClickListener(imageElement) {
    return function() {
        // 이미 선택된 이미지가 있는 경우, 선택을 제거합니다.
        var selectedImage = document.querySelector('.selected');
        if (selectedImage) {
            selectedImage.classList.remove('selected');
        }

        // 클릭한 이미지에 'selected' 클래스를 추가합니다.
        imageElement.classList.add('selected');
        // 이미지 경로를 분석하고, 필요한 데이터만 저장합니다.
        var parts = imageElement.src.split("/");
        var filename = parts[parts.length - 1];
        var filenameParts = filename.split(".");
        var selectedPart = filenameParts[0];

        // 선택된 테마를 hidden input 필드에 저장합니다.
        document.getElementById('tema').value = selectedPart;
    };
}

// 나머지 코드는 동일하게 유지합니다.

window.addEventListener('DOMContentLoaded', function() {
    var imageContainer3 = document.getElementById('image-container3');

    // 섞인 배열에서 상위 4개의 이미지만 선택하여 추가합니다.
    for (var i = 0; i < 4; i++) {
        var imagePath = updatedImagePaths[i];  // 수정된 이미지 파일 경로 사용
        var imageElement = document.createElement('img');
        imageElement.src = imagePath;
        imageElement.alt = "Step 3 Image " + (i + 1);

        // 이미지를 클릭했을 때의 이벤트 리스너를 추가합니다.
        imageElement.addEventListener('click', createClickListener(imageElement));

        imageContainer3.appendChild(imageElement);
    }
});
