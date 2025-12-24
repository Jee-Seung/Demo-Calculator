# 📋 TASKS - 공학용 계산기 웹앱 구현 계획

## 프로젝트 개요
본 문서는 공학용 계산기 웹앱의 전체 구현 작업을 세분화하여 정리한 태스크 목록입니다.

**개발 원칙**:
- 코어 로직은 TDD(Test-Driven Development)로 구현
- SOLID 원칙 준수
- GitHub Actions + GitHub Pages 배포

---

## Phase 1: 프로젝트 초기 설정 (Project Setup)

### 1.1 환경 설정
- [ ] Node.js 프로젝트 초기화
  - [ ] `package.json` 생성
  - [ ] 의존성 정의 (Vite, Vitest, Math.js)
  - [ ] 스크립트 설정 (dev, build, test)
- [ ] Vite 설정
  - [ ] `vite.config.js` 생성
  - [ ] 경로 alias 설정 (`@` → `./src`)
  - [ ] 멀티 페이지 진입점 설정 (index, history, converter)
- [ ] Vitest 설정
  - [ ] 테스트 환경 구성
  - [ ] Coverage 설정 (90% core logic)
  - [ ] Mock 설정 (localStorage, DOM)

### 1.2 프로젝트 구조 생성
- [ ] 디렉토리 구조 생성
  ```
  src/
  ├── index.html
  ├── history.html
  ├── converter.html
  ├── scripts/
  │   ├── calculator/
  │   ├── history/
  │   ├── converter/
  │   ├── storage/
  │   └── utils/
  ├── styles/
  └── assets/
  tests/
  ├── unit/
  └── integration/
  ```
- [ ] 기본 HTML 템플릿 생성
  - [ ] `src/index.html` (계산기 메인)
  - [ ] `src/history.html` (기록)
  - [ ] `src/converter.html` (단위 변환)
- [ ] Tailwind CSS 설정
  - [ ] CDN 또는 PostCSS 설정
  - [ ] 커스텀 테마 설정 (색상, 폰트)
  - [ ] `src/styles/main.css` 생성

### 1.3 Git 및 CI/CD 설정
- [ ] Git 저장소 설정
  - [ ] `.gitignore` 검토 및 조정
  - [ ] 초기 커밋
- [ ] GitHub Actions 워크플로우
  - [ ] `.github/workflows/deploy.yml` 생성
  - [ ] 빌드 및 테스트 자동화
  - [ ] GitHub Pages 배포 설정
- [ ] Pre-commit hooks (선택)
  - [ ] Husky 설정
  - [ ] 테스트 자동 실행

---

## Phase 2: 코어 모듈 구현 (Core Logic - TDD)

### 2.1 유틸리티 모듈
#### 2.1.1 Constants (`src/scripts/utils/constants.js`)
- [ ] 수학 상수 정의 (π, e)
- [ ] 각도 단위 enum (DEG, RAD)
- [ ] 에러 메시지 상수

#### 2.1.2 Validators (`src/scripts/utils/validators.js`)
- [ ] **TDD**: 표현식 유효성 검증 테스트 작성
  - [ ] 빈 문자열 검증
  - [ ] 괄호 균형 검증
  - [ ] 허용된 문자만 포함 검증
- [ ] 유효성 검증 함수 구현
- [ ] 리팩토링

#### 2.1.3 Formatters (`src/scripts/utils/formatters.js`)
- [ ] **TDD**: 숫자 포맷팅 테스트 작성
  - [ ] 소수점 정밀도 처리
  - [ ] 과학적 표기법 변환
  - [ ] 천 단위 구분 (옵션)
- [ ] 포맷팅 함수 구현
- [ ] 리팩토링

### 2.2 Storage 모듈
#### 2.2.1 StorageInterface (`src/scripts/storage/StorageInterface.js`)
- [ ] 추상 인터페이스 정의 (SOLID - DIP)
  - [ ] `save(key, value)` 메서드
  - [ ] `get(key)` 메서드
  - [ ] `remove(key)` 메서드
  - [ ] `clear()` 메서드

#### 2.2.2 LocalStorageImpl (`src/scripts/storage/LocalStorageImpl.js`)
- [ ] **TDD**: LocalStorage 구현 테스트 작성
  - [ ] 데이터 저장 테스트 (mock localStorage)
  - [ ] 데이터 조회 테스트
  - [ ] JSON 직렬화/파싱 테스트
  - [ ] 에러 처리 테스트
- [ ] LocalStorage 래퍼 구현
- [ ] 리팩토링

### 2.3 Calculator 모듈
#### 2.3.1 MathEngine (`src/scripts/calculator/MathEngine.js`)
**의존성**: Math.js, Formatters

**TDD Cycle 1: 기본 사칙연산**
- [ ] RED: 덧셈 테스트 작성 (`2 + 2 = 4`)
- [ ] GREEN: 덧셈 구현
- [ ] RED: 뺄셈 테스트 작성 (`10 - 5 = 5`)
- [ ] GREEN: 뺄셈 구현
- [ ] RED: 곱셈 테스트 작성 (`3 * 4 = 12`)
- [ ] GREEN: 곱셈 구현
- [ ] RED: 나눗셈 테스트 작성 (`8 / 2 = 4`)
- [ ] GREEN: 나눗셈 구현
- [ ] REFACTOR: 코드 정리 및 중복 제거

**TDD Cycle 2: 연산 우선순위 및 괄호**
- [ ] RED: 혼합 연산 테스트 (`2 + 3 * 4 = 14`)
- [ ] GREEN: 우선순위 구현
- [ ] RED: 괄호 테스트 (`(2 + 3) * 4 = 20`)
- [ ] GREEN: 괄호 처리 구현
- [ ] RED: 중첩 괄호 테스트 (`((1 + 2) * 3) + 4 = 13`)
- [ ] GREEN: 중첩 괄호 구현
- [ ] REFACTOR: 표현식 파싱 로직 개선

**TDD Cycle 3: 삼각함수 (DEG 모드)**
- [ ] RED: sin(30°) 테스트 (≈ 0.5)
- [ ] GREEN: sin 함수 구현 (DEG)
- [ ] RED: cos(60°) 테스트 (≈ 0.5)
- [ ] GREEN: cos 함수 구현 (DEG)
- [ ] RED: tan(45°) 테스트 (≈ 1)
- [ ] GREEN: tan 함수 구현 (DEG)
- [ ] REFACTOR: 각도 변환 유틸리티 분리

**TDD Cycle 4: 삼각함수 (RAD 모드)**
- [ ] RED: sin(π/2) 테스트 (≈ 1)
- [ ] GREEN: RAD 모드 구현
- [ ] RED: cos(π) 테스트 (≈ -1)
- [ ] GREEN: 각도 단위 전환 로직
- [ ] REFACTOR: 모드별 전처리 로직 정리

**TDD Cycle 5: 로그 함수**
- [ ] RED: log(100) 테스트 (= 2)
- [ ] GREEN: log10 구현
- [ ] RED: ln(e) 테스트 (= 1)
- [ ] GREEN: ln 구현
- [ ] REFACTOR: 로그 함수 통합

**TDD Cycle 6: 기타 함수**
- [ ] RED: √144 테스트 (= 12)
- [ ] GREEN: 제곱근 구현
- [ ] RED: 2^8 테스트 (= 256)
- [ ] GREEN: 거듭제곱 구현
- [ ] RED: 5! 테스트 (= 120)
- [ ] GREEN: 팩토리얼 구현
- [ ] REFACTOR: 함수 매핑 테이블 생성

**TDD Cycle 7: 에러 처리**
- [ ] RED: 0으로 나누기 테스트 (에러 발생)
- [ ] GREEN: 나누기 0 검증 구현
- [ ] RED: 잘못된 표현식 테스트 (`"abc"` → 에러)
- [ ] GREEN: 표현식 검증 구현
- [ ] RED: 도메인 에러 테스트 (`√-1` → 에러)
- [ ] GREEN: 도메인 검증 구현
- [ ] RED: 괄호 불균형 테스트 (`"(2+3"` → 에러)
- [ ] GREEN: 괄호 검증 구현
- [ ] REFACTOR: 에러 처리 통합 및 메시지 개선

**최종 통합**
- [ ] Math.js 라이브러리 통합
- [ ] 표현식 전처리 로직 완성 (×→*, ÷→/)
- [ ] 결과 포맷팅 (정밀도 처리)
- [ ] 전체 리팩토링 및 코드 정리

#### 2.3.2 CalculatorState (`src/scripts/calculator/CalculatorState.js`)
- [ ] **TDD**: 상태 관리 테스트 작성
  - [ ] 표현식 업데이트
  - [ ] 결과 저장
  - [ ] 각도 단위 변경
  - [ ] 초기화
- [ ] 상태 관리 클래스 구현 (SOLID - SRP)
- [ ] 옵저버 패턴 구현 (상태 변경 알림)
- [ ] 리팩토링

### 2.4 History 모듈
#### 2.4.1 HistoryManager (`src/scripts/history/HistoryManager.js`)
- [ ] **TDD**: 기록 관리 테스트 작성
  - [ ] 기록 추가
  - [ ] 기록 조회 (최대 100개 제한)
  - [ ] 기록 삭제
  - [ ] 날짜별 그룹화
- [ ] **TDD**: 검색 기능 테스트 작성
  - [ ] 표현식 검색
  - [ ] 결과값 검색
  - [ ] 대소문자 무시 검색
- [ ] HistoryManager 구현
  - [ ] Storage 의존성 주입 (SOLID - DIP)
  - [ ] UUID 생성
  - [ ] 타임스탬프 관리
- [ ] 리팩토링

### 2.5 Converter 모듈
#### 2.5.1 ConversionRates (`src/scripts/converter/ConversionRates.js`)
- [ ] 변환 계수 데이터 정의
  - [ ] 길이 (m 기준)
  - [ ] 무게 (kg 기준)
  - [ ] 부피 (L 기준)
  - [ ] 온도 (비선형 변환 함수)
  - [ ] 속도 (m/s 기준)
  - [ ] 데이터 (byte 기준)

#### 2.5.2 UnitConverter (`src/scripts/converter/UnitConverter.js`)
- [ ] **TDD**: 단위 변환 테스트 작성
  - [ ] 선형 변환 (길이, 무게, 부피 등)
  - [ ] 온도 변환 (C↔F↔K)
  - [ ] 정밀도 검증
  - [ ] 에지 케이스 (0, 음수, 매우 큰 수)
- [ ] UnitConverter 구현
  - [ ] 변환 로직
  - [ ] 정밀도 처리
- [ ] 리팩토링

---

## Phase 3: UI 컴포넌트 구현

### 3.1 계산기 UI
**의존성**: Phase 2 완료, 기본 HTML 템플릿 준비

#### 3.1.0 HTML 마크업 (`src/index.html`)
- [ ] 계산기 레이아웃 구조 작성
  - [ ] 헤더 (메뉴, 제목, History 버튼)
  - [ ] 디스플레이 영역 (이전 표현식, 현재 표현식/결과)
  - [ ] DEG/RAD 토글 및 Unit Converter 버튼
  - [ ] 과학 함수 키패드 (5열 그리드)
  - [ ] 표준 키패드 (4열 그리드)
- [ ] Tailwind CSS 클래스 적용
  - [ ] 다크 모드 색상 적용
  - [ ] 반응형 레이아웃 (max-width, padding)
  - [ ] 그리드 레이아웃 (grid-cols-4, grid-cols-5)
- [ ] 접근성 속성 추가
  - [ ] ARIA 레이블 (`aria-label`)
  - [ ] 시맨틱 태그 (`<header>`, `<section>`, `<button>`)
  - [ ] 키보드 네비게이션용 `tabindex`

#### 3.1.1 Display Component (`src/scripts/calculator/Display.js`)
**의존성**: HTML 마크업 완료

- [ ] Display 클래스 기본 구조
  - [ ] 생성자: DOM 요소 참조 저장
  - [ ] `updateExpression(expr)`: 현재 표현식 업데이트
  - [ ] `updatePreviousExpression(expr)`: 이전 표현식 업데이트
  - [ ] `updateResult(result)`: 결과 표시
  - [ ] `clear()`: 디스플레이 초기화
- [ ] 커서 표시 기능
  - [ ] 커서 블링크 애니메이션 CSS
  - [ ] 커서 위치 추적
  - [ ] 커서 DOM 업데이트
- [ ] 애니메이션 효과
  - [ ] 입력 시 페이드 인 전환 (transition)
  - [ ] 결과 표시 시 강조 효과 (scale + color)
  - [ ] 에러 표시 시 흔들림 효과 (shake animation)
- [ ] 텍스트 포맷팅
  - [ ] 긴 숫자 자동 줄바꿈
  - [ ] 오버플로우 처리 (ellipsis 또는 스크롤)

#### 3.1.2 Keypad Component (`src/scripts/calculator/Keypad.js`)
**의존성**: HTML 마크업 완료

- [ ] Keypad 클래스 기본 구조
  - [ ] 생성자: 키패드 컨테이너 참조, 콜백 함수 저장
  - [ ] `attachEventListeners()`: 모든 버튼에 이벤트 리스너 부착
  - [ ] `detachEventListeners()`: 이벤트 리스너 제거 (메모리 누수 방지)
  - [ ] `handleButtonClick(value)`: 버튼 클릭 처리
  - [ ] `handleKeyboardInput(event)`: 키보드 입력 처리

- [ ] 버튼 이벤트 핸들러 (SOLID - SRP)
  - [ ] 숫자 버튼 (0-9)
    - [ ] 이벤트 위임 (event delegation)
    - [ ] `data-value` 속성으로 버튼 식별
    - [ ] 콜백 함수 호출 (`onInput('숫자')`)
  - [ ] 연산자 버튼 (+, -, ×, ÷)
    - [ ] 연산자 클릭 시 콜백 호출
    - [ ] 버튼 시각적 피드백
  - [ ] 과학 함수 버튼
    - [ ] sin, cos, tan, log, ln, √, ^, ! 버튼
    - [ ] 함수명 전달 (`onInput('sin(')`)
  - [ ] 특수 버튼
    - [ ] AC (All Clear): `onClear()` 콜백
    - [ ] DEL (Delete): `onDelete()` 콜백
    - [ ] ANS (Answer): `onAns()` 콜백
    - [ ] = (Equals): `onCalculate()` 콜백

- [ ] 키보드 입력 지원
  - [ ] `keydown` 이벤트 리스너 전역 등록
  - [ ] 숫자 키 (0-9) → 숫자 입력
  - [ ] 연산자 키 (+, -, *, /) → 연산자 입력
  - [ ] Enter → 계산 실행
  - [ ] Backspace → 마지막 문자 삭제
  - [ ] Escape → 전체 삭제
  - [ ] 키보드 입력 시각적 피드백 (해당 버튼 하이라이트)

- [ ] 버튼 상태 및 애니메이션
  - [ ] CSS 호버 효과 (background-color transition)
  - [ ] 클릭 애니메이션 (active:scale-95)
  - [ ] 키보드 입력 시 버튼 애니메이션 트리거
  - [ ] 비활성화 상태 처리 (disabled 버튼 스타일)

#### 3.1.3 Calculator Controller (`src/scripts/calculator/Calculator.js`)
- [ ] Calculator 클래스 구현
  - [ ] Display, Keypad, MathEngine, HistoryManager 통합
  - [ ] 의존성 주입 (SOLID - DIP)
  - [ ] 이벤트 처리 로직
- [ ] 각도 단위 토글
  - [ ] DEG/RAD 전환
  - [ ] UI 업데이트
  - [ ] 상태 저장
- [ ] ANS 기능
  - [ ] 이전 결과 재사용

### 3.2 History UI
**의존성**: HistoryManager 완료

#### 3.2.0 HTML 마크업 (`src/history.html`)
- [ ] History 페이지 레이아웃
  - [ ] 상단 네비게이션 (뒤로가기, 제목, 지우기)
  - [ ] 검색 섹션 (검색 아이콘, 입력 필드)
  - [ ] 스크롤 가능한 콘텐츠 영역
  - [ ] 플로팅 액션 버튼 (계산기로 복귀)
- [ ] 기록 아이템 템플릿
  - [ ] 표현식 및 시간 표시 영역
  - [ ] 복사 버튼 및 결과 표시 영역
- [ ] Tailwind CSS 적용
  - [ ] Sticky 헤더 (sticky top-0)
  - [ ] 스크롤 영역 (overflow-y-auto)
  - [ ] 호버 효과 (hover:bg-surface-dark)

#### 3.2.1 HistoryView Component (`src/scripts/history/HistoryView.js`)
**의존성**: HTML 마크업 완료, HistoryManager

- [ ] HistoryView 클래스 구조
  - [ ] 생성자: DOM 참조, HistoryManager 주입
  - [ ] `render(items)`: 기록 목록 렌더링
  - [ ] `renderSection(title, items)`: 날짜별 섹션 렌더링
  - [ ] `renderItem(item)`: 개별 기록 아이템 렌더링
  - [ ] `clear()`: 목록 비우기

- [ ] 기록 목록 렌더링
  - [ ] 날짜별 그룹화 호출 (`HistoryManager.groupByDate()`)
  - [ ] "오늘" 섹션 렌더링
  - [ ] "어제" 섹션 렌더링
  - [ ] "이전" 섹션 렌더링
  - [ ] 빈 상태 처리 ("기록이 없습니다" 메시지)
- [ ] 시간 포맷팅
  - [ ] 타임스탬프 → Date 변환
  - [ ] 오전/오후 포맷 (예: "오후 2:30")
  - [ ] 한국어 로케일 처리

- [ ] 검색 UI 구현
  - [ ] 검색 입력 필드 이벤트 리스너
  - [ ] Debounce 함수 적용 (300ms)
  - [ ] `handleSearch(query)`: 검색 실행
  - [ ] 검색 결과 하이라이트 (매칭 텍스트 강조)
  - [ ] 검색 결과 없음 처리

- [ ] 인터랙션 구현
  - [ ] 복사 버튼 클릭
    - [ ] Clipboard API 사용
    - [ ] 복사 성공 피드백 (아이콘 변경 또는 토스트)
    - [ ] 복사 실패 처리
  - [ ] 아이템 클릭 시 계산기로 이동
    - [ ] 표현식 localStorage에 임시 저장
    - [ ] `window.location.href = 'index.html'` 이동
    - [ ] 계산기에서 표현식 로드
  - [ ] 전체 삭제 버튼
    - [ ] 확인 다이얼로그 (`confirm()`)
    - [ ] HistoryManager.clearHistory() 호출
    - [ ] UI 업데이트 (빈 상태 표시)

### 3.3 Converter UI
#### 3.3.1 ConverterView Component (`src/scripts/converter/ConverterView.js`)
- [ ] 카테고리 선택 UI
  - [ ] 수평 스크롤 칩 목록
  - [ ] 활성 카테고리 강조
- [ ] 변환 카드
  - [ ] 입력 카드 (보낼 값)
  - [ ] 출력 카드 (결과 값)
  - [ ] 단위 드롭다운
  - [ ] 복사 버튼
- [ ] 스왑 버튼
  - [ ] 입력/출력 단위 교환
  - [ ] 180도 회전 애니메이션
- [ ] 키패드 통합
  - [ ] 숫자 입력
  - [ ] 실시간 변환 업데이트

### 3.4 공통 UI 요소
#### 3.4.1 Navigation
- [ ] 헤더 네비게이션
  - [ ] 메뉴 버튼 (향후 확장)
  - [ ] 페이지 제목
  - [ ] History 버튼
  - [ ] Unit Converter 버튼
- [ ] 페이지 전환
  - [ ] 라우팅 로직
  - [ ] 페이지 전환 애니메이션

#### 3.4.2 Theme
- [ ] 다크 모드 (기본값)
- [ ] 라이트 모드 지원 (Phase 2)
- [ ] 테마 토글 버튼 (Phase 2)

---

## Phase 4: 통합 및 테스트

### 4.1 통합 테스트 (코어 로직만)
**의존성**: Phase 2 완료
**범위**: 코어 로직 모듈 간 통합만 자동화 테스트

> **참고**: UI 통합 테스트는 수동으로 4.2에서 수행합니다.

#### 4.1.1 코어 로직 통합 테스트
- [ ] **테스트 1**: MathEngine + HistoryManager 통합
  - [ ] Given: MathEngine, Storage, HistoryManager 초기화
  - [ ] When: `mathEngine.evaluate('2 + 3')` 호출
  - [ ] Then: 결과 `4` 반환
  - [ ] When: `historyManager.addItem('2 + 3', 4)` 호출
  - [ ] Then: 기록에 저장됨
  - [ ] When: `historyManager.getHistory()` 호출
  - [ ] Then: 저장된 기록 반환 (표현식, 결과, 타임스탬프 포함)

- [ ] **테스트 2**: MathEngine DEG/RAD 모드 전환
  - [ ] Given: MathEngine('DEG')
  - [ ] When: `evaluate('sin(30)')` 호출
  - [ ] Then: 결과 `≈ 0.5`
  - [ ] When: 모드를 'RAD'로 변경
  - [ ] And: `evaluate('sin(pi/2)')` 호출
  - [ ] Then: 결과 `≈ 1`

- [ ] **테스트 3**: HistoryManager 검색 기능
  - [ ] Given: 여러 기록 저장됨
  - [ ] When: `search('sin')` 호출
  - [ ] Then: 'sin' 포함된 기록만 반환
  - [ ] When: `search('')` 호출
  - [ ] Then: 전체 기록 반환

- [ ] **테스트 4**: HistoryManager 최대 100개 제한
  - [ ] Given: 100개의 기록 존재
  - [ ] When: 새로운 기록 추가
  - [ ] Then: 가장 오래된 기록 제거됨
  - [ ] And: 총 기록 개수는 100개 유지

#### 4.1.2 UnitConverter 통합 테스트
- [ ] **테스트 1**: 길이 변환
  - [ ] When: `convert(100, 'm', 'ft', 'length')`
  - [ ] Then: 결과 `≈ 328.084`
  - [ ] When: `convert(328.084, 'ft', 'm', 'length')`
  - [ ] Then: 결과 `≈ 100`

- [ ] **테스트 2**: 온도 변환 (비선형)
  - [ ] When: `convert(0, 'C', 'F', 'temperature')`
  - [ ] Then: 결과 `32`
  - [ ] When: `convert(100, 'C', 'K', 'temperature')`
  - [ ] Then: 결과 `373.15`

- [ ] **테스트 3**: 여러 카테고리 변환 정확성
  - [ ] 무게: 1 kg → 2.20462 lb
  - [ ] 부피: 1 L → 0.264172 gal
  - [ ] 속도: 1 m/s → 3.6 km/h
  - [ ] 데이터: 1 MB → 1024 KB

#### 4.1.3 Storage 통합 테스트
- [ ] **테스트 1**: 기록 저장 및 로드
  - [ ] When: HistoryManager로 기록 저장
  - [ ] Then: LocalStorage에 JSON 형식으로 저장됨
  - [ ] When: 페이지 새로고침 시뮬레이션
  - [ ] Then: 저장된 기록 정확히 복원됨

- [ ] **테스트 2**: 설정 저장
  - [ ] When: angleUnit 설정을 'RAD'로 저장
  - [ ] Then: LocalStorage에 저장됨
  - [ ] When: 설정 로드
  - [ ] Then: 'RAD' 반환

### 4.2 수동 UI 테스트
**UI는 자동화 테스트를 하지 않습니다. 아래 항목을 수동으로 검증합니다.**

#### 4.2.1 계산기 UI 검증
- [ ] 버튼 클릭 동작 확인
- [ ] 키보드 입력 동작 확인
- [ ] 디스플레이 표시 정확성
- [ ] 애니메이션 부드러움
- [ ] DEG/RAD 토글 동작

#### 4.2.2 기록 UI 검증
- [ ] 기록 목록 표시
- [ ] 검색 기능 동작
- [ ] 복사 기능 동작
- [ ] 날짜별 그룹화 정확성

#### 4.2.3 단위 변환 UI 검증
- [ ] 카테고리 전환 동작
- [ ] 변환 결과 표시
- [ ] 스왑 버튼 동작

### 4.3 성능 최적화
- [ ] 번들 크기 최적화
  - [ ] Tree shaking 확인
  - [ ] Tailwind CSS purging
  - [ ] Math.js 부분 import
- [ ] 런타임 성능
  - [ ] Debounce/throttle 적용
  - [ ] 메모이제이션
- [ ] 로딩 성능
  - [ ] Critical CSS inline
  - [ ] Lazy loading

### 4.4 접근성 검증
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션 테스트
- [ ] 스크린 리더 호환성 확인
- [ ] 색상 대비 검증 (WCAG AA)

---

## Phase 5: 배포 및 문서화

### 5.1 배포 설정
- [ ] GitHub Pages 설정 확인
- [ ] CNAME 설정 (커스텀 도메인, 선택)
- [ ] 404 페이지 (선택)
- [ ] Favicon 및 메타 태그
  - [ ] `favicon.ico`
  - [ ] Open Graph 태그
  - [ ] SEO 메타 태그

### 5.2 문서 업데이트
- [ ] README.md 업데이트
  - [ ] 라이브 데모 링크
  - [ ] 스크린샷 추가
  - [ ] 사용법 섹션
- [ ] CHANGELOG.md 생성
  - [ ] v1.0.0 릴리스 노트
- [ ] 기여 가이드 (CONTRIBUTING.md, 선택)

### 5.3 최종 검토
- [ ] 모든 테스트 통과 확인
- [ ] Coverage 목표 달성 확인 (90% core logic)
- [ ] 브라우저 호환성 테스트
  - [ ] Chrome
  - [ ] Safari
  - [ ] Firefox
  - [ ] Edge
- [ ] 모바일 테스트
  - [ ] iOS Safari
  - [ ] Chrome Android

---

## Phase 6: 향후 개선 (Future Enhancements)

### 6.1 Phase 2 Features
- [ ] 라이트 모드
- [ ] 계산 기록 내보내기 (CSV/JSON)
- [ ] 더 많은 과학 함수 (arcsin, arccos, arctan 등)
- [ ] 고급 단위 변환 카테고리

### 6.2 Phase 3 Features
- [ ] PWA 지원
  - [ ] Service Worker
  - [ ] Web App Manifest
  - [ ] 오프라인 지원
- [ ] 그래프 기능
- [ ] 방정식 풀이
- [ ] 행렬 계산

---

## 작업 우선순위 요약

### 🔴 High Priority (Phase 1-2)
1. 프로젝트 초기 설정
2. 코어 모듈 구현 (TDD)
   - MathEngine
   - HistoryManager
   - UnitConverter
   - Storage
3. 기본 UI 구현

### 🟡 Medium Priority (Phase 3-4)
1. 고급 UI 기능
2. 통합 테스트
3. 성능 최적화
4. 접근성 개선

### 🟢 Low Priority (Phase 5-6)
1. 배포 최적화
2. 문서화
3. 향후 기능 계획

---

## 진행 상황 추적

### ✅ 완료
- [x] PRD 작성
- [x] TechSpec 작성
- [x] 개발 규칙 문서화 (TDD, SOLID)
- [x] README 작성
- [x] 디자인 파일 정리
- [x] .gitignore 설정

### 🚧 진행 중
- [ ] (여기에 현재 작업 표시)

### 📅 다음 작업
1. Node.js 프로젝트 초기화
2. Vite 및 Vitest 설정
3. 프로젝트 구조 생성
4. MathEngine TDD 시작

---

**작업 시작일**: 2025-12-24  
**목표 완료일**: TBD  
**담당자**: Jee-Seung
