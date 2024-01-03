function previousStep(event,stepNumber) {
    console.log("Previous Step function called.");  // 이 문장을 추가
    console.log(event);
    stepNumber = parseInt(stepNumber);
    // 현재 단계 숨기기
    var currentStep = document.querySelector('.step:not([style*="display: none"])');
    if (currentStep) {
        currentStep.style.display = "none";
    }

    // 이전 단계 보이기
    var previousStep = document.querySelector('#step' + (stepNumber - 1));
    if (previousStep) {
        previousStep.style.display = "block";
    }

    var formData = new FormData(currentStep.querySelector('form'));
    formData.append('stepnumber', stepNumber); // 현재 단계 번호 추가
    formData.append('direction', 'prev'); // 방향 추가
    $("#prevButton").off().on('click', function() {
        previousStep(event, --stepNumber);
      });


    $.ajax({
        url: "/travel/signup/",
        type: 'POST',
        data: formData,
        processData: false, // 이 설정을 false로 해서 formData를 string으로 변환하지 않게 합니다.
        contentType: false, // 이 설정을 false로 해서 multipart/form-data를 사용합니다.
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 서버가 반환하는 error 메시지를 표시
            alert('An error occurred... ' + errorThrown);
            console.error('An error occurred... ' + errorThrown);
            console.log(jqXHR, textStatus, errorThrown);
        }
    });

}


function nextStep(stepNumber) {
    // 현재 단계 가져오기
    var currentStep = document.querySelector('.step:not([style*="display: none"])');
    if (currentStep) {
        currentStep.style.display = "none";
    }

    // 다음 단계가 존재하는 경우 보이기
    var nextStep = document.getElementById('step' + stepNumber);
    if (nextStep) {
        nextStep.style.display = "block";
    }

    // 현재 단계의 form 데이터를 서버로 전송
    var formData = new FormData(currentStep.querySelector('form'));
    formData.append('stepnumber', stepNumber - 1); // 현재 단계 번호 추가

    $.ajax({
        url: "/travel/signup/",
        type: 'POST',
        data: formData,
        processData: false, // 이 설정을 false로 해서 formData를 string으로 변환하지 않게 합니다.
        contentType: false, // 이 설정을 false로 해서 multipart/form-data를 사용합니다.
        success: function(response) {
            console.log(response);

            // 모든 단계를 완료하였다면 메인 페이지로 이동
            if (stepNumber === 4) {
                setTimeout(function(){
                    window.location.href = "http://127.0.0.1:8000/travel/";
                }, 1000); // 3000 밀리세컨드(3초) 후에 메인 페이지로 이동
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 서버가 반환하는 error 메시지를 표시
            alert('An error occurred... ' + errorThrown);
            console.error('An error occurred... ' + errorThrown);
            console.log(jqXHR, textStatus, errorThrown);
            
        }
    });
}
