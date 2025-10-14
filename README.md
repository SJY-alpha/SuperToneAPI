# Supertone Demo & Neon Tetris

Supertone 음성 생성기 데모와 네온 테트리스 미니 게임을 같은 저장소에서 제공합니다. 두 페이지 모두 정적 HTML 파일로 작성되어 있어 간단한 정적 서버만 있으면 브라우저에서 실행할 수 있습니다.

## 빠른 실행 방법

1. 저장소를 클론하거나 다운로드합니다.
2. 터미널에서 프로젝트 루트(`SuperToneAPI/`)로 이동합니다.
3. 정적 서버를 하나 실행합니다. 아래 방법 중 편한 것을 사용하세요.
   - **Python**: `python3 -m http.server 3000`
   - **Node.js (npx)**: `npx serve .`
4. 브라우저에서 다음 주소로 접속합니다.
   - 음성 생성기: `http://localhost:3000/index.html`
   - 네온 테트리스: `http://localhost:3000/tetris.html`

> 단순히 파일을 더블클릭해서 열어도 되지만, 일부 브라우저는 로컬 파일 경로로 불러올 때 보안 정책 때문에 오디오 API 호출이 차단될 수 있습니다. 위와 같이 간단한 서버를 띄우면 이러한 문제를 피할 수 있습니다.

## Supertone API 프록시 사용

`/api` 디렉터리는 Supertone API를 호출하기 위한 서버리스 함수(Node.js) 예시입니다. 실제 API를 사용하려면 다음을 준비하세요.

1. Supertone에서 발급한 API 키를 환경 변수 `SUPERTONE_API_KEY`에 설정합니다.
2. Vercel과 같은 서버리스 플랫폼에 이 저장소를 배포하거나, 해당 플랫폼의 로컬 개발 도구(예: `vercel dev`)를 사용해 `/api/voices` 및 `/api/proxy/[voice_id]` 엔드포인트를 실행합니다.

이렇게 하면 `index.html`에서 목소리 목록을 불러오고 텍스트를 음성으로 변환할 때 위 프록시를 통해 안전하게 Supertone API를 호출할 수 있습니다.

## 개발 팁

- 정적 파일만 수정하는 경우에는 추가 빌드 과정이 필요하지 않습니다.
- 정적 서버를 종료하려면 서버를 실행한 터미널에서 `Ctrl + C`를 누르세요.
- 자바스크립트/스타일을 수정한 후 브라우저 캐시가 남아있다면 강력 새로고침(Windows: `Ctrl + F5`, macOS: `Cmd + Shift + R`)을 사용하세요.

