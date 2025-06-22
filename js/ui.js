// 페이지 UI 업데이트 함수들

// 프로필 정보를 표시할 메인 컨테이너
const profileDiv = document.getElementById('profile');

/**
 * 로딩 스피너 표시
 */
function showSpinner() {
  profileDiv.innerHTML =
    '<div class="d-flex justify-content-center my-4">' +
      '<div class="spinner-border" role="status" style="width:3rem; height:3rem;">' +
        '<span class="sr-only">로딩중...</span>' +
      '</div>' +
    '</div>';
}

/**
 * 표시된 프로필 삭제
 */
function clearProfile() {
  profileDiv.innerHTML = '';
}

/**
 * 카드 위에 경고 메시지 표시
 * @param {string} message
 * @param {string} className
 */
function showAlert(message, className) {
  clearAlert();
  const alertDiv = document.createElement('div');
  alertDiv.className = className; // 예: 'alert alert-danger'
  alertDiv.textContent = message;

  // 검색 카드 위에 삽입
  const container = document.querySelector('.searchContainer');
  const card = document.querySelector('.card');
  container.insertBefore(alertDiv, card);

  // 3초 후 제거
  setTimeout(clearAlert, 3000);
}

/**
 * 기존 경고 메시지 제거
 */
function clearAlert() {
  const existing = document.querySelector('.alert');
  if (existing) {
    existing.remove();
  }
}

/**
 * 사용자 프로필 정보 표시
 * @param {object} user
 */
function showProfile(user) {
  const joinedDate = new Date(user.created_at).toLocaleDateString('ko-KR');

  profileDiv.innerHTML =
    '<div class="card card-body mb-3">' +
      '<div class="row">' +
        '<div class="col-md-3">' +
          '<img src="' + user.avatar_url + '" class="img-fluid mb-2">' +
          '<a href="' + user.html_url + '" target="_blank" class="btn btn-primary btn-block mb-4">프로필 보기</a>' +
        '</div>' +
        '<div class="col-md-9">' +
          '<span class="badge badge-primary">Public Repos: ' + user.public_repos + '</span> ' +
          '<span class="badge badge-secondary">Gists: ' + user.public_gists + '</span> ' +
          '<span class="badge badge-success">Followers: ' + user.followers + '</span> ' +
          '<span class="badge badge-info">Following: ' + user.following + '</span>' +
          '<br><br>' +
          '<ul class="list-group">' +
            '<li class="list-group-item">Company: ' + (user.company || '정보 없음') + '</li>' +
            '<li class="list-group-item">Website: ' + (user.blog || '정보 없음') + '</li>' +
            '<li class="list-group-item">Location: ' + (user.location || '정보 없음') + '</li>' +
            '<li class="list-group-item">Joined: ' + joinedDate + '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<h3 class="page-heading mb-3">Latest Repos</h3>' +
    '<div id="repos"></div>';
}

/**
 * 프로필 아래에 저장소 목록 표시
 * @param {Array} repos
 */
function showRepos(repos) {
  let html = '';
  repos.forEach(function(repo) {
    html +=
      '<div class="card card-body mb-2">' +
        '<div class="row">' +
          '<div class="col-md-6">' +
            '<a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a>' +
          '</div>' +
          '<div class="col-md-6">' +
            '<span class="badge badge-primary">Stars: ' + repo.stargazers_count + '</span> ' +
            '<span class="badge badge-secondary">Watchers: ' + repo.watchers_count + '</span> ' +
            '<span class="badge badge-success">Forks: ' + repo.forks_count + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  document.getElementById('repos').innerHTML = html;
}
