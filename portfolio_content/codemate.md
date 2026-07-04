---
title: "CodeMate"
period: "2026.02 - 2026.04"
team: "개인 프로젝트"
role: "Frontend / Full-stack"
github: "https://github.com/phnml1/CodeMate"
stack: ["TypeScript", "React", "Next.js App Router", "TanStack Query", "Socket.io", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS", "Recharts", "Anthropic Claude API", "GitHub API"]
relatedPosts:
  - "posts/React/Next.js 서버 컴포넌트에서 Promise.all()로 대시보드 응답 시간 2배 단축하기"
---

## 🧩 Overview
- GitHub PR을 연동해 AI 코드 리뷰와 실시간 댓글 협업을 제공하는 개발자용 플랫폼입니다.
- 소규모 팀이나 주니어 개발자가 리뷰 피드백을 빠르게 받고, PR 단위로 논의를 이어가기 어렵다는 문제를 다뤘습니다.
- PR 분석, 리뷰 결과, 댓글, 알림을 한 흐름에서 확인하게 만들어 코드 리뷰 대기와 커뮤니케이션 비용을 줄이는 데 초점을 맞췄습니다.

##  Key Features
- **GitHub Repository / PR 연동**: 사용자가 연동한 저장소의 PR 목록과 상세 diff를 조회해 리뷰 대상 흐름을 구성했습니다.
- **AI 코드 리뷰 요청**: PR diff를 기반으로 Claude API에 분석을 요청하고, 이슈와 품질 점수를 리뷰 UI로 제공합니다.
- **실시간 댓글 동기화**: PR별 socket room을 사용해 새 댓글, 수정, 삭제 이벤트를 클라이언트 캐시에 반영합니다.
- **알림 시스템**: 리뷰 완료, PR 상태 변경, 댓글 이벤트를 알림으로 연결해 사용자가 후속 액션을 놓치지 않게 했습니다.
- **통계 대시보드**: PR 상태, 리뷰 품질 점수, 이슈 분포를 차트로 보여줘 코드 리뷰 흐름을 수치로 확인하게 했습니다.
- **측정 페이지**: 캐시 갱신 방식별 API 요청 수와 실시간 이벤트 반영 latency를 측정해 개선 효과를 검증했습니다.

## 🧠 Technical Highlights

### Problem 01 - 실시간 댓글 refetch 폭주
![CodeMate 댓글 입력과 반영 흐름](/projects/codemate/codemate-comment.gif)
- PR 상세 화면에서 댓글이 달릴 때마다 refetch에 의존하면 이벤트 수만큼 API 요청이 다시 발생했다.

### Solution 01 - 댓글 캐시 직접 갱신
- Socket.io 이벤트를 받은 뒤 TanStack Query의 `setQueryData`로 댓글 캐시를 직접 갱신해 refetch 경로를 제거했다.
- `/measurements/comments` 페이지에서 `invalidate/refetch`와 같은 조건으로 비교 측정도 함께 진행했다.
- 댓글 이벤트 10회 기준 API 요청을 10회 -> 0회로 줄였고, 총 소요 시간을 21102ms -> 1235ms로 단축했다.
- synthetic socket 이벤트 10회 기준 클라이언트 반영 latency 평균 3.57ms, p95 7.2ms를 확인했다.
  ![댓글 캐시 동기화 측정 결과](/projects/codemate/comment-cache-sync-1.png)
  ![댓글 캐시 동기화 측정 요약](/projects/codemate/comment-cache-sync-2.png)
  ![댓글 이벤트 반영 latency 측정](/projects/codemate/comment-event-latency.png)

### Problem 02 - AI 리뷰 비동기 상태 공백
- AI 리뷰는 비동기 작업이라 요청 직후부터 완료 시점까지 상태가 비어 있었고, 중복 요청도 막기 어려웠다.

### Solution 02 - 상태 머신과 중복 방지
- 리뷰 요청 즉시 `PENDING` 상태를 만들고, 분석 완료 후 `PENDING -> IN_PROGRESS -> COMPLETED/FAILED` 흐름으로 상태를 갱신했다.
- 분석 대기 중에도 요청 접수 상태를 표시하고, 완료 시점에 결과 확인으로 연결했다.
- PR당 활성 리뷰 1건만 허용하는 partial unique index를 적용해 중복 생성을 막았다.

### Problem 03 - socket 책임 분산
- socket 연결과 이벤트 핸들러가 컴포넌트별로 분산되면 연결 상태와 room 구독 책임이 흐려졌다.

### Solution 03 - 연결/store/room 분리
- `useSyncExternalStore` 기반 단일 socket store를 만들고, room join/leave는 `useSocketRoom`으로 분리했다.
- 연결 상태와 room 구독 책임을 한 계층에서 관리하도록 정리했다.

### Problem 04 - 대시보드 초기 렌더링 비용
- 대시보드 데이터가 여러 API와 차트 렌더링에 의존해 초기 응답 흐름이 무거웠다.

### Solution 04 - 병렬화와 분리
- 서버 데이터 요청을 `Promise.all`로 병렬화하고, 무거운 차트와 diff viewer는 `next/dynamic`으로 분리했다.
- 데이터 대기와 초기 렌더링 비용을 분리해 페이지 응답 흐름을 관리했다.

##  Tech Stack & Reason
- **Next.js App Router**: 인증이 필요한 페이지, API Route, 서버 데이터 조회를 같은 프로젝트 안에서 관리하기 위해 사용했습니다.
- **TypeScript**: GitHub PR, 리뷰, 댓글, 알림 데이터의 타입을 명확히 유지하기 위해 사용했습니다.
- **TanStack Query**: PR 상세, 댓글, 알림처럼 자주 갱신되는 서버 상태를 캐싱하고, 실시간 이벤트 반영 시 캐시를 직접 갱신하기 위해 사용했습니다.
- **Socket.io**: PR room 기반 댓글, 타이핑, 알림 이벤트를 실시간으로 전달하기 위해 사용했습니다.
- **Prisma + PostgreSQL**: 사용자, 저장소, PR, 리뷰, 댓글, 알림 데이터를 관계형 구조로 관리하기 위해 사용했습니다.
- **NextAuth + GitHub OAuth**: GitHub 계정 기반 인증과 사용자 세션 관리를 위해 사용했습니다.
- **Anthropic Claude API**: PR diff를 분석하고 코드 리뷰 이슈를 생성하기 위해 사용했습니다.
- **Recharts**: 리뷰 품질, PR 상태, 이슈 분포를 대시보드 차트로 보여주기 위해 사용했습니다.
- **Tailwind CSS**: 대시보드, 목록, 상세 화면의 UI를 빠르게 구성하고 반응형 레이아웃을 관리하기 위해 사용했습니다.

## 📈 Achievements
- 댓글 이벤트 10회 기준 `invalidate/refetch` 대비 API 요청을 10회 -> 0회로 줄였습니다.
- 동일 측정에서 총 소요 시간을 21102ms -> 1235ms로 줄였습니다.
- 배포환경에서 synthetic socket 이벤트 10회 기준 클라이언트 반영 latency 평균 3.57ms, p95 7.2ms를 측정했습니다.
- `useSyncExternalStore` 기반 socket store로 실시간 연결과 구독 책임을 컴포넌트 외부로 분리했습니다.
- 리뷰 요청 직후 `PENDING` 상태를 제공해 AI 분석 대기 중에도 사용자가 처리 흐름을 확인할 수 있게 했습니다.

## 🧪 What I Focused On
- API 요청 수를 줄이는 캐싱 전략을 실제 측정값으로 검증했습니다.
- 실시간 이벤트를 단순 수신하는 데서 끝내지 않고, React Query 캐시와 UI 데이터 반영 흐름까지 연결했습니다.
- 비동기 AI 분석의 대기 상태를 사용자에게 드러내는 흐름을 설계했습니다.
- PR 상세, 댓글, 알림, 리뷰 결과가 서로 끊기지 않도록 데이터 흐름을 기준으로 화면을 구성했습니다.

##  Trade-offs / Limitations
- `setQueryData`는 즉시 반영이 빠르지만, 서버 응답을 다시 받지 않기 때문에 캐시 일관성 관리 책임이 클라이언트에 생깁니다.
- socket 이벤트 반영 latency 측정은 이벤트 수신 이후 클라이언트 반영 구간을 측정합니다. 서버 emit부터 브라우저 수신까지의 전체 네트워크 latency는 별도 계측이 필요합니다.
- AI 리뷰 분석은 외부 API 응답 품질과 지연 시간의 영향을 받습니다. 이를 줄이기 위해 요청 직후 `PENDING` 상태와 완료 알림 흐름을 분리했습니다.
- 개인 프로젝트라 실제 팀 규모의 동시 협업 부하까지 검증하지는 못했습니다.

## 🔥 Portfolio Summary
- CodeMate는 GitHub PR 기반 AI 코드 리뷰와 실시간 댓글 협업을 제공하는 개발자용 플랫폼입니다.
- Next.js App Router, Prisma, GitHub API, Claude API를 사용해 PR 분석부터 리뷰 결과 저장까지 구현했습니다.
- Socket.io와 TanStack Query를 연결해 댓글 이벤트를 refetch 없이 캐시에 직접 반영했습니다.
- 댓글 이벤트 10회 기준 API 요청을 10회 -> 0회로 줄이고 총 소요 시간을 21102ms -> 1235ms로 단축했습니다.
- 배포환경에서 클라이언트 반영 latency 평균 3.57ms, p95 7.2ms를 측정했습니다.
- `useSyncExternalStore` 기반 socket store로 연결과 구독 책임을 분리했습니다.
- AI 분석 대기 중에도 `PENDING` 상태와 알림 흐름을 제공해 사용자가 처리 상태를 확인할 수 있게 했습니다.

## 💡 Highlight Points
- **캐싱 전략을 수치로 검증**: refetch 제거 효과를 API 요청 수, 처리 시간, 이벤트 반영 latency로 측정했습니다.
- **실시간 이벤트와 서버 상태 캐시 연결**: Socket.io 이벤트를 TanStack Query 캐시에 직접 반영해 UI 반영 지연을 줄였습니다.
- **비동기 작업 UX 설계**: AI 리뷰 요청, 분석 대기, 완료 알림을 분리해 긴 작업의 상태를 사용자에게 노출했습니다.
