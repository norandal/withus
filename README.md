## withus — 단일 파일 포트폴리오 웹사이트

정적(Static) 포트폴리오 웹사이트입니다. `index.html`, `style.css`, `script.js` 3개 파일로 구성되며, 프레임워크 없이 순수 HTML/CSS/JS로 동작합니다.

### 주요 특징
- **반응형 레이아웃**: 헤더/네비게이션, 히어로, 소개, 기술, 경력, 프로젝트, 연락처 섹션 제공
- **부드러운 스크롤과 고정 헤더**: 고정 헤더 보정(`scroll-margin-top`)과 스무스 스크롤 처리
- **모바일 메뉴(햄버거)**: 작은 화면에서 사이드 드로어 형태로 네비게이션 표시
- **현재 섹션 하이라이트**: 스크롤에 따라 해당 내비 링크에 `active` 클래스 반영
- **타이핑 효과**: 히어로 제목(단일) + 직함(여러 텍스트) 타이핑 애니메이션
- **스킬 바 애니메이션**: IntersectionObserver로 보일 때 퍼센트 채움
- **스크롤 인 애니메이션**: 타임라인/프로젝트/스킬 카드 페이드 업
- **간단한 폼 검증**: 연락처 폼 클라이언트 유효성 검사 및 성공 알림(데모)

---

## 파일 구조
- `index.html`: 메인 마크업. 섹션 앵커 `#home`, `#about`, `#skills`, `#experience`, `#projects`, `#contact` 제공.
  - 히어로: 이름(`.hero-name`), 소개 텍스트, 멀티 타이핑 텍스트(`.typing-text` with `data-texts`)
  - 기술: 각 `.skill-progress`가 `data-width`로 목표 퍼센트를 정의
  - 경력: 좌우 교차 타임라인 구조
  - 프로젝트: 카드 그리드와 기술 태그, 버튼 링크 자리
  - 연락처: 좌측 정보 / 우측 폼
- `style.css`: 전체 스타일. 핵심 포인트
  - 고정 헤더, 그라데이션 히어로, 반응형 그리드, 타임라인 라인/마커
  - 스크롤 보정: `section { scroll-margin-top: 80px; }`
  - 애니메이션: 커서 깜박임, 번쩍(`shimmer`), 스킬 바(`fillBar`)
  - 반응형 브레이크포인트: `768px`, `480px`
- `script.js`: 인터랙션 스크립트. 핵심 포인트
  - 모바일 메뉴 토글, 스무스 스크롤(고정 헤더 높이 보정)
  - 스크롤 시 헤더 스타일 강화(배경/그림자)
  - 현재 섹션 감지하여 내비 `active` 클래스 관리
  - 스킬 바: IntersectionObserver로 `width` 설정 + `animate` 클래스 부여
  - 타이핑: `typeWriter`(단일), `multiTypeWriter`(여러 텍스트)
  - 스크롤 인 애니메이션: 초기 스타일 설정 후 뷰포트 진입 시 페이드/이동
  - 폼 검증: 공란/이메일 형식 검사 후 알림, 실제 전송은 미구현(데모)

---

## 빠르게 실행하기

### 1) 브라우저로 직접 열기
```bash
open index.html
```

### 2) 간단한 로컬 서버로 열기(권장)
정적 서버를 사용하면 앵커 스크롤 및 자원 로딩을 더 일관되게 테스트할 수 있습니다.
```bash
python3 -m http.server 5173
# 브라우저에서 http://localhost:5173 접속
```
또는 Node 기반 서버를 사용할 수 있습니다.
```bash
npx http-server -p 5173 -c-1
# 브라우저에서 http://localhost:5173 접속
```

---

## 커스터마이징 가이드

### 기본 정보 편집
- 이름/타이틀: `index.html`의 헤더 및 히어로 영역(`.nav-brand h1`, `.hero-name`, `.hero-title`).
- 직함(회전 텍스트): `.typing-text`의 `data-texts` 배열 값을 원하는 직함 리스트로 변경.

예시:
```html
<span class="typing-text" data-texts='["Full-Stack Software Engineer","웹 개발자"]'></span>
```

### 소개/경력/프로젝트/연락처 콘텐츠
- 각 섹션의 문구, 카드, 링크(라이브 데모/깃허브) 등을 `index.html`에서 직접 수정.

### 스킬 퍼센트 변경
- 각 스킬 바 내부 `.skill-progress`의 `data-width` 값을 조정(예: `90%`).
```html
<div class="skill-progress" data-width="85%"></div>
```

### 색상/테마 변경
- 주 색상: `style.css` 내 `#3498db`(블루), 그라데이션, 배경색 등을 검색/치환하여 조정.

### 애니메이션 조정
- 타이핑 속도: `script.js`의 `multiTypeWriter(element, texts, typeSpeed, deleteSpeed, pauseTime)` 인자 변경.
- 스킬 바 속도: `style.css`의 `@keyframes fillBar` 및 `.skill-progress.animate` 애니메이션 지속시간 조정.
- 스크롤 인: `script.js`의 `animateOnScroll`에서 `elementVisible`/transition값 조정.

### 네비게이션 고정 오프셋
- 고정 헤더 높이 변화 시, `script.js`의 스크롤 계산(`header.offsetHeight`)과 `style.css`의 `section { scroll-margin-top: 80px; }` 값을 함께 맞추세요.

---

## 접근성/성능 참고
- 키보드 지원: `Esc`로 모바일 메뉴 닫기, 포커스 가능한 요소에 기본 포커스 링 유지
- 색 대비 및 폰트: 가독성 높은 대비, 한국어 가독성 좋은 `Noto Sans KR` 사용
- 스크롤 최적화: 쓰로틀/디바운스 유틸 및 IntersectionObserver 사용
- 이미지: 현재는 이모지/플레이스홀더. 실제 이미지 사용 시 용량 최적화 권장(WebP, 적절한 크기)

---

## 브라우저 지원
- 최신 크롬/엣지/사파리/파이어폭스 최신 버전 권장
- 매우 구형 브라우저에서는 일부 CSS/IntersectionObserver가 제한될 수 있음

---

## 배포
### GitHub Pages
1. 저장소 푸시 후, GitHub 저장소의 Settings → Pages 이동
2. Source를 `main`(또는 배포용 브랜치)/`root`로 설정
3. 제공되는 페이지 URL 접속

### 기타 정적 호스팅
- Netlify, Vercel, Cloudflare Pages 등의 정적 호스팅에 루트 디렉터리를 배포하세요.

---

## 폴더 내 기타
- `kaist-sleek-CV-master/`: 별도 템플릿 예시가 포함되어 있습니다(본 사이트와는 독립).

---

## 라이선스
개인 포트폴리오/학습 목적의 자유 사용을 허용합니다. 상업적 사용 또는 재배포 시 원저작자 표기를 권장합니다.
