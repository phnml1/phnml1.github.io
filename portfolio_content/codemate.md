---
title: 'CodeMate'
period: '2026.02 - 현재'
team: '개인 프로젝트'
role: 'Frontend / Full-stack'
github: 'https://github.com/phnml1/CodeMate'
description: '개발자가 GitHub Pull Request에서 AI 리뷰를 요청하고 코드 댓글·답글·알림을 함께 관리하는 협업 도구입니다.'
audience: 'Pull Request를 검토하는 개발자와 소규모 팀'
problem: 'AI 리뷰는 오래 걸리고 댓글은 실시간으로 바뀌므로, 진행 상태와 최신 대화를 한 화면에서 일관되게 보여줘야 했습니다.'
contribution: '개인 프로젝트의 화면과 API·데이터 모델을 구현하고, 리뷰 상태 표시·실시간 댓글 동기화·연결 실패 시 복구 흐름을 설계했습니다.'
userFlow:
  - 'GitHub 저장소 연결'
  - 'PR 선택·AI 리뷰 요청'
  - '진행 상태·결과 확인'
  - '코드 댓글 협업'
implementation: 'Socket.io 연결 상태는 `useSyncExternalStore` 기반 공용 store에서 관리하고, PR room의 join·leave lifecycle은 별도 hook으로 분리했습니다. 댓글 create·update·delete·reaction 이벤트는 ID 기준으로 TanStack Query cache에 immutable update했습니다.'
decision: "PostgreSQL을 영구 저장 상태의 source of truth로 두고, Socket.io는 '변경이 발생함'을 알리는 event transport로 한정했습니다. 소켓이 정상이면 event payload로 cache를 즉시 갱신하고, 연결이 끊기면 polling으로 전환해 DB의 최종 상태와 다시 일치시켰습니다."
evidence: '2026-09-07 기준 Jest 23 suites / 133 tests와 Playwright 3 flows를 확인했습니다. 서버 내부 API 호출 제거와 LCP 개선은 각각 명시된 로컬 측정 조건에서 확인했습니다.'
stack:
  [
    'TypeScript',
    'React',
    'Next.js App Router',
    'TanStack Query',
    'Socket.io',
    'Prisma',
    'PostgreSQL',
    'NextAuth',
    'Tailwind CSS',
    'Anthropic API',
    'GitHub API',
  ]
relatedPosts:
  - 'posts/React/Next.js 서버 컴포넌트에서 Promise.all()로 대시보드 응답 시간 2배 단축하기'
---

## 프로젝트 한 줄 설명

GitHub Pull Request를 동기화해 AI 리뷰 결과와 사람의 댓글·답글·reaction·알림을 한 화면에서 이어가는 Next.js 기반 개인 프로젝트입니다.

## 해결한 업무 문제

- 실시간 댓글 이벤트마다 `invalidate/refetch`하면 이벤트 수만큼 API 요청과 fetching 상태가 반복됐습니다.
- Socket.io 연결, 연결 상태, PR room join/leave가 한 hook에 섞이면 여러 화면이 같은 연결 상태를 일관되게 보기 어려웠습니다.
- AI 리뷰는 외부 API를 거치는 장기 작업이라 요청 접수, 분석 중, 완료와 실패를 별도 상태로 보여줘야 했습니다.
- PR 제목과 첫 화면이 files/diff 로딩 및 무거운 highlighter를 함께 기다렸습니다.

## 대상 사용자와 사용 흐름

코드 리뷰 자원이 제한된 개발자와 소규모 팀을 대상으로 합니다. GitHub 저장소 연결 → PR 선택 → 리뷰 요청 → 진행 상태 확인 → diff 위 댓글 협업 → 알림 확인 순서로 사용합니다. 실제 운영 사용자 수와 동시 협업 규모는 확인하지 않아 공개 수치로 쓰지 않았습니다.

## 나의 역할

개인 프로젝트의 프론트엔드와 API·데이터 모델을 구현했습니다. 특히 PR 상세 화면의 server state, Socket.io 연결과 room 구독, 댓글 cache 일관성, 비동기 리뷰 UI, 초기 로딩 경로와 테스트·CI 검증을 담당했습니다.

## 팀 기여와 개인 기여의 경계

개인 프로젝트이므로 기능 구현을 팀 성과로 나누지 않습니다. 다만 GitHub·Anthropic·Socket.io는 외부 경계이고, 코드가 존재한다는 사실과 실제 운영 규모는 구분합니다. Git 기록에는 AI-assisted 공동 작성 흔적도 있어 commit 수를 단독 기여율이나 생산성 수치로 사용하지 않습니다.

## 시스템 또는 데이터 흐름

GitHub PR과 files를 Next.js가 동기화하고 PostgreSQL에 PR snapshot·리뷰·댓글·알림을 저장합니다. DB write 이후 Socket.io가 PR room 또는 user room으로 변경 이벤트를 전달하며, 브라우저는 TanStack Query cache를 화면용 mirror로 갱신합니다. Socket.io는 영속 저장소가 아니며 연결 실패 시 polling이 DB 상태를 다시 읽습니다.

PR metadata와 files/diff는 별도 loading 경로로 분리했습니다. 제목과 기본 정보는 Server Component에서 membership 범위로 조회해 initial data로 넘기고, files·diff 영역은 자체 skeleton과 error 상태를 가집니다.

## 핵심 상태 머신

- Review status: `PENDING → IN_PROGRESS → COMPLETED / FAILED`
- Review stage: `QUEUED → FETCHING_FILES → ANALYZING → FINALIZING → COMPLETED`
- Socket: connecting → connected → reconnecting → polling fallback
- PR당 활성 review는 `PENDING` 또는 `IN_PROGRESS` 상태에서 1건만 허용하는 PostgreSQL partial unique index로 최종 차단합니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 실시간 댓글을 받을 때마다 전체 refetch와 중복 답글이 발생할 수 있는 문제

PR 댓글은 답글이 여러 단계로 연결된 tree 구조입니다. create·update·delete·reaction event마다 전체 목록을 refetch하면 네트워크 요청이 늘고, tree 안의 특정 답글만 정확히 바꾸기도 어렵습니다. 사용자가 댓글을 작성한 직후 client mutation과 서버의 socket echo가 같은 댓글을 두 번 추가할 가능성도 있었습니다.

### Solution 01 - Event payload 기반 immutable cache update

`setQueryData`에서 댓글 ID를 기준으로 reply tree를 재귀 순회하고, 해당 node에만 update·delete·reaction payload를 immutable하게 반영했습니다. create event는 이미 같은 ID가 있는지 확인해 중복을 막았습니다. socket이 정상일 때는 서버 echo를 단일 갱신 경로로 사용하고, fallback 모드에서만 로컬에 먼저 반영한 뒤 mutation이 끝나면 DB 상태와 재조정했습니다.

### Problem 02 - Socket 연결과 PR room lifecycle이 각 hook에 흩어지는 문제

각 화면 hook이 socket 연결 상태와 PR room join·leave를 동시에 관리하면, consumer마다 서로 다른 연결 snapshot을 볼 수 있습니다. 화면이 바뀌었을 때 누가 room을 leave하고 listener를 정리할지도 불명확했습니다.

### Solution 02 - useSyncExternalStore와 room hook 분리

module singleton에 socket·연결·fallback 상태를 모으고 React의 `useSyncExternalStore`로 하나의 snapshot을 구독하게 했습니다. `useSocketRoom(prId)`는 현재 PR의 join·leave lifecycle만 담당합니다. 최초 token·connect 실패는 즉시 polling으로, 기존 연결 장애는 8초 grace period 후 10초 polling으로 전환해 잠깐의 네트워크 흔들림과 진짜 장애를 구분했습니다.

### Problem 03 - 동시 요청으로 AI review가 중복 실행될 수 있는 문제

사용자의 수동 요청과 GitHub webhook이 거의 동시에 들어오면, application code의 `findFirst → create`만으로는 두 요청이 모두 '진행 중인 review가 없다'고 판단할 수 있습니다. 그 결과 하나의 PR에 AI review가 중복 실행되는 race condition이 생길 수 있었습니다.

### Solution 03 - 상태 머신과 DB constraint

요청 직후 화면 cache에 `PENDING` 상태를 만들어 진행 공백을 없애고, 처리 중에는 3초 polling과 알림 event로 상태를 갱신했습니다. 중복 실행 방지는 UI가 아닌 DB에서 보장했습니다. `PENDING`·`IN_PROGRESS` 상태만 대상으로 하는 partial unique index를 두고, 동시 삽입의 unique conflict는 '이미 review가 진행 중'인 응답으로 변환했습니다.

### Problem 04 - PR 핵심 정보가 보조 데이터를 기다리느라 늦게 보이는 문제

PR 제목·상태·작성자 metadata는 빨리 받을 수 있지만, files·diff는 용량이 크고 더 오래 걸립니다. 두 요청이 모두 끝날 때까지 전체 skeleton을 보여 주고 syntax highlighter까지 초기 bundle에 포함하면, 사용자가 먼저 확인할 수 있는 PR 기본 정보까지 늦게 나타났습니다.

### Solution 04 - dependency별 loading과 지연 로딩

metadata와 files/diff의 loading boundary를 분리해 PR 기본 정보를 먼저 렌더링했습니다. syntax highlighter·diff viewer·issue modal·chart는 dynamic import로 필요할 때만 로드했습니다. localhost Desktop 3회 평균으로 확인한 LCP 개선은 이 변경들을 묶은 전후 비교이며, 특정 최적화 하나의 단독 효과로 표현하지 않습니다.

## 선택한 해결 방법

- 영속 상태는 PostgreSQL, 이벤트 전송은 Socket.io, 화면 cache는 TanStack Query로 책임을 나눴습니다.
- 외부 연결이 실패해도 데이터를 잃지 않도록 socket 성공 여부와 무관하게 DB write를 먼저 완료하고 polling fallback을 열었습니다.
- server state는 Query cache에 두고 PR 파일 선택·modal 같은 화면 상태만 Zustand에 남겼습니다.
- 무거운 시각 모듈은 첫 화면에서 제외하고 실제 사용 시점에 로드했습니다.

## 고려한 대안과 Trade-offs

- 모든 이벤트에서 refetch하면 구현은 단순하지만 요청과 fetching 상태가 반복됩니다. 직접 cache patch는 빠르지만 event ordering과 일관성 책임이 클라이언트에 생깁니다.
- Context 또는 Zustand로 socket 연결을 관리할 수도 있지만, 외부 store의 snapshot 계약을 명시하기 위해 `useSyncExternalStore`를 선택했습니다.
- application lock만으로 중복 리뷰를 막으면 multi-process race가 남습니다. DB constraint는 최종 방어가 되지만 raw migration과 동시 insert 테스트가 필요합니다.
- polling fallback은 가용성을 높이지만 같은 page lifecycle에서 socket으로 자동 복귀하지 않는 현재 한계가 있습니다.

## 검증 방법과 결과

- 2026-09-07 current HEAD에서 Jest `23 suites / 133 tests`, Playwright `3 flows`, ESLint, production build를 확인했습니다.
- Server Component의 자기 API 호출을 DAL 직접 조회로 교체했습니다. 워밍업 포함 17회 로컬 측정에서 서버 내부 `/api/repositories` 호출은 `17건 → 0건`이었습니다.
- 통계 카드·차트·최근 PR을 각각 Suspense 경계로 분리했습니다. 동일한 로컬 조건에서 개선 전후 15회씩 비교한 대시보드 LCP p75는 `4,948ms → 4,236ms`였습니다.
- 댓글 작성·수정·삭제 뒤에는 관련 Query를 재조회합니다. Socket 이벤트의 cache patch를 모든 데이터 갱신에서 재조회가 없다는 주장으로 확장하지 않습니다.
- historical Lighthouse는 2026-05-09 localhost Emulated Desktop, before/after 각 3회 평균에서 Performance `54.7→81.7`, LCP `2.27→1.03s`, TBT `1060→423ms`였습니다. loading gate, memoization, highlighter, notification, socket 변경이 묶인 과거 측정입니다.

## 현재 한계와 다음 개선

- 댓글 이벤트에 sequence/version/tombstone이 없어 out-of-order payload가 최신 상태를 덮을 수 있습니다.
- reaction은 JSON read-modify-write라 동시 toggle의 lost update 가능성이 있습니다.
- room membership 검증과 일부 review API의 권한 경계를 보강해야 합니다.
- fallback 뒤 수동 retry 또는 자동 socket 복귀, 실제 두 브라우저 간 전파 E2E가 필요합니다.
- Lighthouse는 current production build의 통제된 재측정과 raw report 보관이 필요합니다.

## 회고

실시간 기능의 핵심은 WebSocket을 붙이는 일이 아니라, 영속 데이터와 transient event의 책임을 나누고 실패했을 때 어느 경로가 최종 상태를 회복하는지 정하는 일이었습니다. 성능 수치도 측정 조건과 인과 범위를 함께 공개해야 기술 선택의 근거가 됩니다.
