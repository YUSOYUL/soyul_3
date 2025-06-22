# GitHub Finder 프로젝트

간단한 웹 애플리케이션으로, 사용자의 GitHub 아이디를 입력하면 해당 사용자의 프로필 정보와 최근 공개 저장소 목록을 보여줍니다.

## 주요 기능

* GitHub 사용자 검색 (아이디 기준)
* 프로필 정보 확인
* 최신 공개 저장소 목록 표시

## 환경 설정

이 앱은 GitHub API를 자유롭게 사용하며, 인증이 없는 상태에서도 동작하지만 1시간에 최대 60회 요청으로 제한됩니다. 원활한 사용을 위해 개인 API 키를 등록하는 것을 권장합니다.

### GitHub OAuth 앱 등록 안내 (작성일: 2025-06-20 기준)

1. GitHub 계정으로 로그인 후, 우측 상단 프로필 메뉴에서 **Settings** 선택
2. 좌측 메뉴 하단의 **Developer settings** 클릭
3. **OAuth Apps** 항목에서 **New OAuth App** 버튼 누르기
4. 등록 양식 작성:

   * **Application name**: GitHub Finder (원하는 이름으로 변경 가능)
   * **Homepage URL**: `http://127.0.0.1:5500/index.html` (로컬 테스트 주소)
   * **Authorization callback URL**: `http://127.0.0.1:5500` (로컬 테스트 주소)
5. **Register application** 클릭
6. 발급된 **Client ID**와 **Client Secret** 확인

### `env.js` 파일 생성 및 설정

1. 프로젝트 `js/` 폴더 내에 `env.js` 파일 생성
2. 아래 템플릿을 복사하여 본인의 키로 바꿔 입력:

   ```js
   // GitHub API 인증 정보
   const GITHUB_CLIENT_ID = '여기에_자신의_Client_ID';
   const GITHUB_CLIENT_SECRET = '여기에_자신의_Client_Secret';
   ```
3. 이 파일은 `.gitignore`에 이미 등록되어 있으므로, 깃허브 저장소에 민감 정보가 업로드되지 않습니다.

환경 설정이 완료되면, 다시 페이지를 새로고침하여 API 요청 제한 없이 GitHub 데이터를 가져올 수 있습니다.

**프로젝트 구조**

```
/ (루트)
├─ index.html        # 메인 페이지
├─ style.css         # 기본 스타일
├─ js/
│  ├─ app.js         # UI와 데이터 연결
│  ├─ github.js     # GitHub API 호출 로직
│  ├─ ui.js          # 화면 갱신 함수들
│  └─ env.js         # (선택) API 키 저장 파일
└─ README.md         # 프로젝트 설명 문서
```