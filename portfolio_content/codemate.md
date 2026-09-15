---
title: 'CodeMate'
period: '2026.02 - 2026.04'
team: '개인 프로젝트'
role: 'Frontend / Full-stack'
github: 'https://github.com/phnml1/CodeMate'
demo: 'https://code-mate-two.vercel.app'
description: 'GitHub PR의 AI 리뷰와 실시간 댓글 상태를 하나의 데이터 흐름으로 연결한 협업 제품'
problem: '댓글 이벤트마다 전체 Query를 다시 조회하면 이벤트 수만큼 요청이 늘고, Socket.io 연결과 PR room 구독 책임도 컴포넌트에 흩어졌습니다.'
contribution: '실시간 연결 store, room lifecycle, 댓글 cache patch, polling fallback과 AI review 상태 머신을 설계·구현했습니다.'
implementation: 'useSyncExternalStore 기반 socket store와 room hook을 분리하고 create/update/delete/reaction payload를 TanStack Query cache에 immutable하게 반영했습니다.'
decision: 'PostgreSQL을 영속 상태의 원본으로 두고 Socket.io는 변경 이벤트 전송에 집중시켰으며, 연결 실패 때 같은 Query가 polling으로 최종 상태를 회복하게 했습니다.'
evidence: '2026-09-07 현재 23 suites / 133 tests, Playwright 3 flows, ESLint와 production build를 확인했습니다. 10→0 요청 수치는 synthetic 측정 조건입니다.'
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

### Problem 01 - 실시간 댓글 refetch와 중첩 thread 일관성

댓글 create/update/delete/reaction마다 전체 목록을 다시 읽으면 네트워크 요청이 늘고, reply tree의 특정 노드만 바꾸기도 어려웠습니다. client mutation과 socket echo가 같은 댓글을 중복 추가할 가능성도 있었습니다.

### Solution 01 - Socket payload의 immutable cache update

`setQueryData`에서 댓글 ID를 기준으로 tree를 재귀 순회해 create 중복을 막고 update/delete/reaction payload를 immutable하게 반영했습니다. socket이 정상일 때 create mutation의 local append를 생략하고, fallback에서는 직접 append한 뒤 mutation settle 시 DB 상태와 다시 맞춥니다.

### Problem 02 - 연결과 PR room lifecycle의 책임 혼합

hook-local 연결 상태와 join/leave effect가 함께 있으면 consumer마다 다른 snapshot을 볼 수 있고 cleanup 책임도 불명확했습니다.

### Solution 02 - useSyncExternalStore와 room hook 분리

module singleton의 socket·연결 상태·fallback 상태를 `useSyncExternalStore`로 구독하고, `useSocketRoom(prId)`에는 join/leave만 남겼습니다. 최초 token/connect 실패는 즉시, 기존 연결 장애는 8초 grace 뒤 10초 polling으로 전환합니다.

### Problem 03 - AI review의 중복 실행과 상태 공백

application의 `findFirst → create`만으로는 동시에 들어온 수동 요청과 webhook이 모두 active review를 만들 수 있습니다.

### Solution 03 - 상태 머신과 DB constraint

요청 직후 `PENDING` cache를 만들고 진행 중에는 3초 polling과 알림 invalidation을 사용했습니다. DB에는 active status만 대상으로 하는 partial unique index를 두고 race에서 발생한 unique conflict를 이미 진행 중인 요청으로 처리했습니다.

### Problem 04 - PR 첫 화면과 보조 데이터의 결합

PR metadata와 files가 모두 끝날 때까지 전체 skeleton을 보여주고 syntax highlighter를 초기 경로에 포함하면 제목 표시까지 늦어졌습니다.

### Solution 04 - dependency별 loading과 지연 로딩

metadata와 files/diff의 loading gate를 분리하고 syntax highlighter, diff viewer, issue modal, chart를 dynamic import했습니다. historical localhost Desktop 3회 평균은 여러 최적화를 묶은 전후 비교이며 특정 변경 하나의 단독 성과로 해석하지 않습니다.

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
- 측정 페이지의 synthetic 댓글 이벤트 10건 조건에서 추가 API 요청 `10→0`, 총 처리 시간 `21102→1235ms`를 기록했습니다.
- 평균 `3.57ms`, p95 `7.2ms`는 실제 network latency가 아니라 synthetic socket payload를 같은 브라우저 Query cache에 반영한 시간입니다.
- historical Lighthouse는 2026-05-09 localhost Emulated Desktop, before/after 각 3회 평균에서 Performance `54.7→81.7`, LCP `2.27→1.03s`, TBT `1060→423ms`였습니다. loading gate, memoization, highlighter, notification, socket 변경이 묶인 과거 측정입니다.

## 현재 한계와 다음 개선

- 댓글 이벤트에 sequence/version/tombstone이 없어 out-of-order payload가 최신 상태를 덮을 수 있습니다.
- reaction은 JSON read-modify-write라 동시 toggle의 lost update 가능성이 있습니다.
- room membership 검증과 일부 review API의 권한 경계를 보강해야 합니다.
- fallback 뒤 수동 retry 또는 자동 socket 복귀, 실제 두 브라우저 간 전파 E2E가 필요합니다.
- Lighthouse는 current production build의 통제된 재측정과 raw report 보관이 필요합니다.

## 회고

실시간 기능의 핵심은 WebSocket을 붙이는 일이 아니라, 영속 데이터와 transient event의 책임을 나누고 실패했을 때 어느 경로가 최종 상태를 회복하는지 정하는 일이었습니다. 성능 수치도 측정 조건과 인과 범위를 함께 공개해야 기술 선택의 근거가 됩니다.
