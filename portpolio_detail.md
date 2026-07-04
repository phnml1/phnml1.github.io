# Portfolio Project Detail

## CodeMate

### Overview
- GitHub PR 리뷰를 AI 분석, 실시간 댓글 협업, 통계 추적으로 연결한 코드 리뷰 워크플로우
- 핵심 가치: 리뷰 대기 시간을 줄이고, PR 단위 협업 상태를 한 화면에서 추적 가능하게 만든 것

### Problem / Solution
![CodeMate 댓글 입력과 반영 흐름](/projects/codemate/codemate-comment.gif)

#### Problem 01
- PR 상세 화면에서 댓글이 달릴 때마다 refetch에 의존하면 이벤트 수만큼 API 요청이 다시 발생했다.

#### Solution 01
- Socket.io 이벤트를 받은 뒤 TanStack Query `setQueryData`로 댓글 캐시를 직접 갱신해 refetch 경로를 제거했다.

#### Problem 02
- AI 리뷰는 비동기 작업이라 요청 직후부터 완료 시점까지 상태가 비어 있었고, 중복 요청도 막기 어려웠다.

#### Solution 02
- AI 리뷰는 `PENDING -> IN_PROGRESS -> COMPLETED/FAILED` 상태 머신으로 나눠 요청 직후에도 진행 상태를 UI에 노출했다.
- 리뷰 요청 중에는 `PENDING` 상태를 보여 주고, 완료 시점에 결과를 붙여 사용자가 흐름을 놓치지 않게 했다.
- 리뷰 중복 생성을 막기 위해 PR당 활성 리뷰 1건만 허용하는 partial unique index를 적용했다.

#### Problem 03
- 소켓 연결 책임도 컴포넌트마다 퍼져 있어서 연결 상태와 room 구독을 한 곳에서 관리하기 어려웠다.

#### Solution 03
- `useSyncExternalStore` 기반 소켓 store와 `useSocketRoom`으로 연결 상태와 room 구독을 분리했다.
- UI 컴포넌트는 connectionStatus만 구독하고, room join/leave는 hook이 담당하도록 책임을 나눴다.

#### Problem 04
- 대시보드 데이터가 여러 API와 차트 렌더링에 의존해 초기 렌더링 비용이 컸다.

#### Solution 04
- 서버 데이터 요청을 `Promise.all`로 병렬화하고, 무거운 차트와 diff viewer는 `next/dynamic`으로 분리했다.
- 데이터 대기와 초기 렌더링 비용을 분리해 페이지 응답 흐름을 관리했다.

### Tech Decision
- `Next.js App Router`: PR 상세, 통계, API Route를 한 코드베이스에서 관리하기 위해 선택했다.
- `TanStack Query`: 서버 상태 캐시를 기준으로 실시간 이벤트를 UI에 직접 반영하기 위해 사용했다.
- `Socket.io` + `useSyncExternalStore`: 댓글/알림 동기화와 연결 상태 구독 책임을 분리하기 위해 사용했다.
- `Prisma + PostgreSQL`: PR, 댓글, 알림, 리뷰 상태를 관계형 모델로 유지하기 위해 사용했다.

### Performance
- 댓글 이벤트 10건 기준 API 요청 수 `10회 -> 0회`
- 동일 시나리오 총 처리 시간 `21102ms -> 1235ms`
- synthetic socket event 10건 기준 클라이언트 반영 latency 평균 `3.57ms`, p95 `7.2ms`
- 검증 범위 `19개 suite`, `115개 테스트`

### Result
- 사용자는 PR을 새로고침하지 않아도 댓글과 리뷰 상태를 바로 확인할 수 있습니다.
- AI 분석이 끝날 때까지 현재 단계가 끊기지 않는다.
- 실시간 이벤트, 캐시 일관성, 비동기 작업 UX를 각각 분리해서 설계할 수 있음을 보여주는 프로젝트입니다.
