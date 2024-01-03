// 이미지 경로 배열
var imagePaths = [
  "/static/travelapp/img/signup/0_이사부길(새천년해안도로)_1.jpg",
  "/static/travelapp/img/signup/0_이사부길(새천년해안도로)_2.jpg",
  "/static/travelapp/img/signup/1_원주 소금산 출렁다리_1.jpg",
  "/static/travelapp/img/signup/1_원주 소금산 출렁다리_2.jpg",
  "/static/travelapp/img/signup/2_월정사·월정사 전나무숲_1.jpg",
  "/static/travelapp/img/signup/2_월정사·월정사 전나무숲_2.jpg",
  "/static/travelapp/img/signup/3_비수구미마을(비수구미계곡)_1.jpg",
  "/static/travelapp/img/signup/3_비수구미마을(비수구미계곡)_2.jpg",
  "/static/travelapp/img/signup/4_동해 논골담길 (등대 담화마을)_1.jpg",
  "/static/travelapp/img/signup/4_동해 논골담길 (등대 담화마을)_2.jpg",
  "/static/travelapp/img/signup/5_도째비골스카이밸리_1.jpg",
  "/static/travelapp/img/signup/5_도째비골스카이밸리_2.jpg",
  "/static/travelapp/img/signup/6_남이섬_1.jpg",
  "/static/travelapp/img/signup/6_남이섬_2.jpg",
  "/static/travelapp/img/signup/7_오대산 선재길_1.jpg",
  "/static/travelapp/img/signup/7_오대산 선재길_2.jpg",
  "/static/travelapp/img/signup/8_홍천 은행나무숲_1.jpg",
  "/static/travelapp/img/signup/8_홍천 은행나무숲_2.jpg",
  "/static/travelapp/img/signup/9_삼척 미인폭포_1.jpg",
  "/static/travelapp/img/signup/9_삼척 미인폭포_2.jpg",

];

// 이미지 경로 배열을 무작위로 섞습니다.
imagePaths.sort(() => Math.random() - 0.5);

// 상위 9개의 이미지만 선택합니다.
var selectedImages = imagePaths.slice(0, 9);

var selectedImagesPaths = [];
var selectedImagesData = [];

window.addEventListener('DOMContentLoaded', function() {
var imageContainer = document.getElementById('image-container');

selectedImages.forEach(function(image, index) {  
    var imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = "Travel Image " + (index + 1);

    // 클릭 이벤트 리스너를 추가합니다.
    // 이미지 클릭 이벤트 리스너를 추가합니다.
    imageElement.addEventListener('click', function() {
      // 이미지가 이미 선택되어 있다면 선택을 취소하고, 배열에서 제거합니다.
      if (imageElement.classList.contains('selected')) {
        imageElement.classList.remove('selected');
        var indexInArray = selectedImagesPaths.indexOf(image);
        if (indexInArray > -1) {
          selectedImagesPaths.splice(indexInArray, 1);
          selectedImagesData.splice(indexInArray, 1);
        }
      }
      // 이미지가 선택되어 있지 않고, 선택된 이미지가 3개 미만일 때만 선택을 추가합니다.
      else if (selectedImagesPaths.length < 3) {
        imageElement.classList.add('selected');
        selectedImagesPaths.push(image);
        // 이미지 경로를 분석하고, 필요한 데이터만 저장합니다.
        var parts = image.split("/");
        var filename = parts[parts.length - 1];
        var filenameParts = filename.split("_");
        var selectedPart = filenameParts[0];
        selectedImagesData.push(selectedPart);
      }
      // 선택된 이미지가 3개이고, 새로운 이미지를 선택하려는 경우
      else {
        // 첫 번째로 선택된 이미지를 선택 해제하고 배열에서 제거합니다.
        var firstImagePath = selectedImagesPaths.shift();
        var firstImageElement = document.querySelector('img[src="' + firstImagePath + '"]');
        if (firstImageElement) {
          firstImageElement.classList.remove('selected');
        }
        selectedImagesData.shift();
    
        // 새로운 이미지를 선택합니다.
        imageElement.classList.add('selected');
        selectedImagesPaths.push(image);
        // 이미지 경로를 분석하고, 필요한 데이터만 저장합니다.
        var parts = image.split("/");
        var filename = parts[parts.length - 1];
        var filenameParts = filename.split("_");
        var selectedPart = filenameParts[0];
        selectedImagesData.push(selectedPart);
      }
    
      // hidden input 필드를 업데이트합니다.
      var hiddenInputField = document.getElementById('teste');
      hiddenInputField.value = selectedImagesData.join(',');
      // console.log를 이용해 배열 상태 확인
      console.log(hiddenInputField.value);
    });
    
  imageContainer.appendChild(imageElement);
  
  });

});

function clickImage(event, imgIndex) {
  event.preventDefault();
  event.stopPropagation();
  const targetImage = event.target;
  const isSelected = targetImage.classList.contains('selected');
  
  if (isSelected) {
      targetImage.classList.remove('selected');
      const index = selectedImagesData.indexOf(imgIndex);
      if (index > -1) {
          selectedImagesData.splice(index, 1);
      }
  } else {
      if (selectedImagesData.length < 3) {
          targetImage.classList.add('selected');
          selectedImagesData.push(imgIndex);
      } else {
          alert('You can select up to 3 images');
      }
  }

  // Update the hidden input field with the selected image data
  const testeInputField = document.getElementById('teste');
  testeInputField.value = selectedImagesData.join(',');
  console.log(testeInputField.value); // Check if the value is updated
}


