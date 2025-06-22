// UI와 데이터 가져오기 연결하는 메인 파일

// 1. 검색 입력 요소 가져오기
const searchUser = document.getElementById('searchUser');

// 2. 디바운스를 위한 타이머 설정
let debounceTimer;

// 3. 키 입력 이벤트 감지
searchUser.addEventListener('keyup', function(e) {
  const userText = e.target.value.trim();

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(function() {
    if (userText !== '') {
      // 로딩 스피너 보여주기
      showSpinner();

      // GitHub에서 데이터 가져오기
      getUserData(userText)
        .then(function(data) {
          if (data.error === 'Not Found') {
            showAlert('User not found', 'alert alert-danger');
            clearProfile();
          } else {
            showProfile(data.profile);
            showRepos(data.repos);
          }
        });
    } else {
      // 입력이 비어 있으면 프로필 삭제
      clearProfile();
    }
  }, 500);
});
