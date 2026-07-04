# Portfolio Project Structure

## CodeMate | AI 기반 코드 리뷰 및 실시간 협업 플랫폼

### 1. 프로젝트별 핵심 문제 (왜 만들었는지)
- GitHub PR 리뷰 흐름에서 AI 리뷰, 댓글/알림, 통계 확인이 분리되어 있으면 코드 리뷰 대기와 후속 확인 비용이 커집니다.
- 실시간 댓글 동기화가 refetch 중심으로 동작하면 이벤트가 발생할 때마다 네트워크 요청이 반복되고, UI 반영 구조도 복잡해집니다.
- AI 리뷰는 비동기 작업이라 요청 직후부터 완료 전까지 상태를 분리하지 않으면 사용자가 진행 상태를 파악하기 어렵습니다.

### 2. 내가 해결한 문제 (기술적 challenge)
- GitHub PR diff, AI 리뷰, 댓글/알림, 통계 페이지를 하나의 Next.js App Router 서비스 안에서 연결했습니다.
- PR 댓글 실시간 동기화에서 socket 이벤트를 TanStack Query의 `setQueryData`로 직접 반영하고, socket을 쓰지 않는 환경에는 10초 polling fallback을 유지했습니다.
- 클라이언트 socket 연결을 `useSyncExternalStore` 기반 단일 store와 room hook으로 분리해 연결 상태, 재연결, 구독 책임을 컴포넌트 밖으로 이동했습니다.
- AI 리뷰 요청을 `PENDING → IN_PROGRESS → COMPLETED/FAILED` 상태로 분리하고, PR당 활성 리뷰 1건만 허용하는 partial unique index를 적용했습니다.

### 3. 성능 개선 / 구조 개선 포인트
- 댓글 실시간 동기화를 refetch 중심이 아니라 cache update 중심 구조로 바꿔 네트워크 의존도를 줄였습니다.
- socket 연결과 room 구독을 컴포넌트 밖 단일 계층으로 분리해 실시간 연결 구조를 단순화했습니다.
- 통계 페이지에서 overview, PR trend, quality trend, issue distribution, code changes 요청을 `Promise.all`로 병렬화했습니다.
- 차트 컴포넌트는 `next/dynamic`으로 분리해 페이지 초기 렌더링 비용과 시각화 렌더링 비용을 나눴습니다.
- Jest 기준으로 webhook, review API, notifications, repositories, AI parser/scoring 로직을 테스트했습니다.

### 4. 수치 기반 성과 (ms, %, 요청 수 등)
- Jest 기준 `19개 suite`, `115개 테스트`
- 댓글 동기화 성능 개선은 이력서에 수치로 고정하지 않았습니다.

### 5. 기술 선택 이유 (왜 이걸 썼는지)
- `Next.js App Router`: PR 상세, 리뷰, 댓글, 통계, API Route를 한 프로젝트 안에서 관리하기 위해 선택했습니다.
- `TanStack Query`: PR 댓글과 알림처럼 자주 갱신되는 서버 상태를 캐시로 관리하고, socket 이벤트를 캐시에 직접 반영하기 위해 사용했습니다.
- `Socket.io`: 댓글/알림 실시간 동기화와 연결 상태 관리를 위해 사용했습니다.
- `useSyncExternalStore`: socket 연결 상태를 단일 store로 구독하고 React 컴포넌트와 분리하기 위해 사용했습니다.
- `Prisma + PostgreSQL`: 리뷰, 댓글, 알림, PR 메타데이터를 관계형 구조로 관리하기 위해 사용했습니다.
- `Jest`: webhook, review, parser/scoring 같은 핵심 로직을 검증하기 위해 사용했습니다.

---

## Career Hub | 취업 지원 현황 관리 플랫폼

### 1. 프로젝트별 핵심 문제 (왜 만들었는지)
- 취업 지원 과정에서는 전형 결과, 현재 단계, 알림, 일정이 서로 엇갈리기 쉬워 화면마다 다른 상태가 보일 수 있습니다.
- 상세 수정 이후 전체 데이터를 다시 조회하면 변경 범위보다 큰 네트워크 비용이 발생합니다.
- 브라우저와 설치 상태에 따라 알림 권한 요청과 Web Push 지원 조건이 달라 일관된 사용자 경험을 만들기 어렵습니다.

### 2. 내가 해결한 문제 (기술적 challenge)
- 전형 결과 변경 시 현재 단계와 최종 결과가 어긋나는 문제를 `timelineSyncRules`로 분리했습니다.
- 상세 수정 후 전체 재조회 대신 수정 응답으로 안전하게 갱신 가능한 필드는 `setQueryData`, 서버 재생성이 필요한 필드는 `invalidateQueries`로 나눠 캐시 전략을 적용했습니다.
- 지원 목록을 `useInfiniteQuery`와 `IntersectionObserver`로 구성하고, 필터 조건을 queryKey에 포함해 조건별 목록 캐시를 분리했습니다.
- FCM, Service Worker, iOS Safari, 설치된 PWA 여부를 기준으로 알림 권한 흐름을 분기했습니다.
- Next.js Route Handler 기반 BFF를 두고 클라이언트 요청과 백엔드 응답 처리 규칙을 분리했습니다.

### 3. 성능 개선 / 구조 개선 포인트
- 상태 전이 규칙을 화면 밖 순수 로직으로 분리해 전형 상태 계산이 UI에 흩어지지 않도록 정리했습니다.
- 수정 유형에 따라 `setQueryData`와 `invalidateQueries`를 구분해 캐시 정확성과 요청 비용의 균형을 맞췄습니다.
- 필터 조건별 queryKey 분리로 목록 캐시를 구조적으로 분리했습니다.
- BFF 계층을 둬 클라이언트가 백엔드 응답 규칙과 인증 전달 방식을 직접 다루지 않도록 구성했습니다.

### 4. 수치 기반 성과 (ms, %, 요청 수 등)
- 이력서 기준으로 명시된 수치 기반 성과는 없습니다.

### 5. 기술 선택 이유 (왜 이걸 썼는지)
- `TanStack Query`: 목록 무한 스크롤, 상세 캐시 부분 갱신, 수정 이후 캐시 전략 분기를 위해 사용했습니다.
- `IntersectionObserver`: 지원 목록에서 스크롤 기반 추가 로드를 구현하기 위해 사용했습니다.
- `FCM + Service Worker`: 브라우저 알림과 백그라운드 알림 흐름을 처리하기 위해 사용했습니다.
- `Next.js Route Handler`: BFF 계층을 두고 클라이언트 요청/응답 규칙을 분리하기 위해 사용했습니다.
- `Zustand`: 서버 상태와 분리된 UI 상태를 관리하기 위해 사용했습니다.

---

## Fly:On | 체험 비행 일정 관리 앱

### 1. 프로젝트별 핵심 문제 (왜 만들었는지)
- 모바일 일정 편집 화면에서 Drag & Drop 인터랙션은 웹처럼 기본 API에 의존할 수 없어 직접 제어해야 합니다.
- 일정 생성 단계와 선택값, 조회 데이터가 한 흐름에 섞이면 서버 상태와 편집 중 상태가 충돌하기 쉽습니다.
- 지도 탐색 화면에서는 선택 지역 밖까지 탐색이 확장되면 사용자 흐름이 흐려질 수 있습니다.

### 2. 내가 해결한 문제 (기술적 challenge)
- `PanResponder`, layout 측정, floating layer를 조합해 커스텀 Drag & Drop 일정 편집을 구성했습니다.
- React Profiler와 드래그 전용 profiling 코드로 렌더링 비용을 측정하고, total commit duration을 줄였습니다.
- 일정 생성 단계와 선택값은 Zustand, 일정/관광지/날씨 조회 데이터는 TanStack Query로 분리했습니다.
- 단계별 진행 조건을 `validateNextStepEnabled` 순수 함수로 분리하고 Jest 테스트를 추가했습니다.
- 선택 지역 좌표를 기준으로 지도 boundary를 제한하고 marker 조회에 `enabled`, `staleTime`을 적용했습니다.
- `ErrorBoundary`, axios interceptor, 전역 모달, 토큰 재발급 흐름을 연결해 예외 처리를 공통화했습니다.

### 3. 성능 개선 / 구조 개선 포인트
- Drag & Drop 렌더링 병목을 프로파일링한 뒤 렌더링 비용을 줄이는 방향으로 구조를 조정했습니다.
- 서버 상태와 편집 중 상태를 분리해 일정 편집 과정에서 상태 책임이 섞이지 않도록 구성했습니다.
- 단계별 진행 조건을 순수 함수로 분리해 화면 밖에서 검증 가능한 구조로 정리했습니다.
- 지도 조회에 `enabled`, `staleTime`을 적용해 지역 선택 전 불필요한 요청을 막았습니다.
- 에러 처리와 인증 만료 복구를 공통 계층으로 모아 화면별 예외 처리 중복을 줄였습니다.

### 4. 수치 기반 성과 (ms, %, 요청 수 등)
- total commit duration: `211.5ms → 72.9ms`

### 5. 기술 선택 이유 (왜 이걸 썼는지)
- `PanResponder`: React Native 환경에서 Drag & Drop 제스처를 직접 제어하기 위해 사용했습니다.
- `TanStack Query`: 일정/관광지/날씨 조회 같은 서버 상태를 캐싱하고 조회 조건을 제어하기 위해 사용했습니다.
- `Zustand`: 일정 생성 단계와 선택값처럼 편집 중인 클라이언트 상태를 관리하기 위해 사용했습니다.
- `React Profiler`: Drag & Drop 화면의 렌더링 병목을 측정하기 위해 사용했습니다.
- `Jest`: 단계별 진행 조건을 화면 밖에서 검증하기 위해 사용했습니다.
- `React Native Maps`: 선택 지역 기반 marker 조회와 지도 boundary 제어를 위해 사용했습니다.

---

## 러너스하이 | 위치 기반 실시간 러닝 앱

### 1. 프로젝트별 핵심 문제 (왜 만들었는지)
- 위치 기반 러닝 앱은 위치, 러닝 모드, 인증, 코스 상태가 얽혀 있어 상태 전이와 UI 분기가 복잡해지기 쉽습니다.
- 실시간 위치 동기화는 연결 끊김이 발생하면 바로 사용자 경험 저하로 이어집니다.
- GPS speed 값에 직접 의존하면 페이스 계산이 흔들릴 수 있습니다.

### 2. 내가 해결한 문제 (기술적 challenge)
- 위치, 러닝, 코스, 인증 상태를 분리하고 러닝 모드별 커스텀 훅으로 상태 전이와 UI 분기를 나눴습니다.
- STOMP의 heartbeat와 reconnect 설정을 적용하고 모드별 publish/subscribe 경로를 분리해 위치 동기화 복구 흐름을 구성했습니다.
- 솔로 러닝에서는 최근 10초 거리 기반 페이스 계산을 사용해 GPS speed 직접 의존도를 낮췄습니다.
- Axios 인터셉터와 refresh queue로 인증 만료 시 요청 재시도 흐름을 공통 처리했습니다.

### 3. 성능 개선 / 구조 개선 포인트
- 러닝 모드별 훅 구조로 상태 전이와 UI 분기 책임을 분리했습니다.
- STOMP 연결을 heartbeat, reconnect, publish/subscribe 경로 분리로 안정화했습니다.
- 위치 계산 로직을 GPS raw speed에서 거리 기반 계산으로 보완했습니다.
- 인증 만료 복구 로직을 공통 계층으로 모아 요청 재시도 흐름을 일관되게 처리했습니다.

### 4. 수치 기반 성과 (ms, %, 요청 수 등)
- 이력서 기준으로 명시된 수치 기반 성과는 없습니다.

### 5. 기술 선택 이유 (왜 이걸 썼는지)
- `WebSocket (STOMP)`: 위치 동기화와 모드별 실시간 publish/subscribe 흐름을 처리하기 위해 사용했습니다.
- `Zustand`: 위치, 러닝, 코스, 인증 상태를 분리해 관리하기 위해 사용했습니다.
- `TanStack Query`: 서버에서 가져오는 코스 및 관련 조회 데이터를 관리하기 위해 사용했습니다.
- `expo-location`: 위치 추적과 거리 기반 페이스 계산에 필요한 위치 데이터를 다루기 위해 사용했습니다.
- `Axios`: 인증 만료와 재시도 흐름을 공통 처리하기 위해 사용했습니다.
