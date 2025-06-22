// GitHub 사용자 프로필과 저장소를 가져오는 간단한 함수들

// 표시할 저장소 개수
const reposCount = 5;
// 저장소 정렬 기준
const reposSort = 'created: asc';

/**
 * GitHub 사용자 프로필과 저장소 가져오기
 * @param {string} username
 * @returns {Promise<{profile: object, repos: object[]}|{error: string}>}
 */
function getUserData(username) {
  // 기본 URL 설정
  let profileUrl = 'https://api.github.com/users/' + username;
  let reposUrl = profileUrl + '/repos?per_page=' + reposCount + '&sort=' + reposSort;

  // js/env.js에 API 키가 정의된 경우, 요청 제한을 피하기 위해 추가
  if (typeof GITHUB_CLIENT_ID === 'string' && GITHUB_CLIENT_ID && typeof GITHUB_CLIENT_SECRET === 'string' && GITHUB_CLIENT_SECRET) {
    const authParams = '?client_id=' + GITHUB_CLIENT_ID + '&client_secret=' + GITHUB_CLIENT_SECRET;
    profileUrl += authParams;
    reposUrl += '&client_id=' + GITHUB_CLIENT_ID + '&client_secret=' + GITHUB_CLIENT_SECRET;
  }

  // 먼저 사용자 프로필 가져오기
  return fetch(profileUrl)
    .then(function(res) {
      if (res.status === 404) {
        // 사용자를 찾을 수 없음
        return { error: 'Not Found' };
      }
      return res.json();
    })
    .then(function(profile) {
      if (profile.error) {
        // 오류 전달
        return profile;
      }
      // 그다음 저장소 가져오기
      return fetch(reposUrl)
        .then(function(res) {
          return res.json();
        })
        .then(function(repos) {
          return { profile: profile, repos: repos };
        });
    });
}
