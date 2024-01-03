function handleImageCheckboxChange() {
    var checkboxes = document.getElementsByName('preferences');
  
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        var checkedImage = document.querySelector('.image-checkbox input[type="checkbox"]:checked + img');
        var allImages = document.querySelectorAll('.image-checkbox img');
  
        allImages.forEach(function(image) {
          image.classList.remove('selected');
        });
  
        if (checkedImage) {
          checkedImage.classList.add('selected');
          document.getElementById('teste').value = checkedImage.getAttribute('alt');
        } else {
          document.getElementById('teste').value = '';
        }
      });
    });
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    var preferencesContainer = document.getElementById('preferences-container');
    var imageContainer = document.getElementById('image-container');
  
    preferencesContainer.addEventListener('click', function(event) {
        var target = event.target;
        if (target.classList.contains('preference-button')) {
          var images = [
            '/static/travelapp/img/img_test/a1.jpg',
            '/static/travelapp/img/img_test/a2.jpg',
            '/static/travelapp/img/img_test/a3.jpg',
            '/static/travelapp/img/img_test/a4.jpg',
            '/static/travelapp/img/img_test/a5.jpg',
            '/static/travelapp/img/img_test/a6.jpg',
            '/static/travelapp/img/img_test/a7.jpg',
            '/static/travelapp/img/img_test/a8.jpg',
            '/static/travelapp/img/img_test/a9.jpg'
          ];
          
          // 9가지 여행지 사진 표시
          var imagesHtml = '<div class="image-grid">';
          for (var i = 0; i < images.length; i++) {
            imagesHtml += `<label class="image-checkbox">
                              <input type="checkbox" name="preferences" value="${images[i]}">
                              <img src="${images[i]}" alt="Travel Image ${i+1}">
                          </label>`;
            if ((i + 1) % 3 === 0) {
              imagesHtml += '</div><div class="image-grid">';
            }
          }
          imagesHtml += '</div>';
          
          imageContainer.innerHTML = imagesHtml;
        }
      });
      
  });
  