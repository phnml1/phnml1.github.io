---
title: "Career Hub"
slug: "career-hub"
category: "archive"
period: "2025.11 - 2026.02"
team: "팀 프로젝트 (FE 2 / BE 2)"
role: "Frontend"
github: "https://github.com/phnml1/Career_Hub_Frontend"
description: "취업 준비자가 채용 공고와 지원 단계, 일정, 알림을 한곳에서 관리하는 PWA 대시보드입니다."
audience: "여러 채용 전형을 관리하는 취업 준비자"
problem: "지원 단계와 최종 결과가 화면마다 다르게 보이면 현재 진행 상황을 파악하기 어려웠습니다."
contribution: "팀 프론트엔드에서 지원 단계 동기화와 상세 수정 후 화면 갱신 규칙을 구현하고, 환경별 알림 권한 흐름을 분리했습니다."
userFlow:
  - "채용 공고 저장"
  - "지원 단계 기록"
  - "일정·상태 확인"
  - "변경 알림 확인"
implementation: "지원 단계 계산을 timelineSyncRules로 분리하고, 수정 결과를 TanStack Query 캐시에 반영했습니다. 서버가 새 값을 만들어야 하는 경우에만 invalidateQueries로 다시 조회했습니다."
decision: "화면마다 지원 상태를 따로 계산하지 않고 하나의 규칙을 사용했습니다. 즉시 확정할 수 있는 필드는 setQueryData로 갱신하고, 파일 URL처럼 서버 확인이 필요한 값은 재검증하도록 구분했습니다."
evidence: "이전 프로젝트 기록입니다. 최신 채용 이력서의 검증 사례에는 포함하지 않았으며, 정량 성과를 주장하지 않습니다."
stack: ["TypeScript", "React", "Next.js App Router", "TanStack Query", "Zustand", "Firebase Cloud Messaging", "Service Worker", "Tailwind CSS"]
---

## Overview
- 이 페이지는 이전 프로젝트 기록으로 보존합니다. 현재 채용 이력서의 핵심 사례와는 구분합니다.
- 채용 공고, 지원 단계, 일정, 알림을 하나의 흐름으로 관리하는 취업 준비 대시보드입니다.
- 지원 상태가 화면마다 어긋나지 않도록 단계 규칙과 캐시 갱신 경로를 분리했습니다.
- 브라우저, iOS Safari, standalone PWA처럼 알림 권한 흐름이 달라지는 환경을 고려했습니다.

## Key Features
- **지원 상태 관리**: 서류, 과제, 면접, 최종 결과를 하나의 timeline 규칙으로 연결했습니다.
- **무한 스크롤 목록**: 필터 조건을 queryKey에 포함하고 cursor 기반 다음 페이지 조회를 구성했습니다.
- **상세 캐시 부분 갱신**: 수정 후 전체 refetch 대신 변경 필드를 `setQueryData`로 반영했습니다.
- **웹 푸시 알림**: foreground/background, 설치형/브라우저형 알림 흐름을 나눴습니다.
- **BFF 분리**: 클라이언트가 백엔드 주소와 인증 전달 규칙을 직접 알지 않도록 Route Handler를 사용했습니다.

## Technical Highlights

### Problem 01 - 화면마다 다르게 보이는 지원 진행 상태
- 사용자가 면접 결과를 입력하거나 최종 합격·불합격을 선택했을 때 목록, 상세 화면, 일정이 서로 다른 상태를 보여줄 수 있었습니다. 화면마다 다음 단계를 따로 계산하면 규칙이 조금씩 달라져 현재 진행 상황을 믿기 어려워집니다.

### Solution 01 - 하나의 단계 규칙과 변경 유형별 캐시 갱신
- `timelineSyncRules`에 서류·과제·면접·최종 결과의 연결 규칙을 모아 모든 화면이 같은 계산 결과를 사용하게 했습니다.
- 상세 수정처럼 결과를 즉시 확정할 수 있는 변경은 TanStack Query의 `setQueryData`로 화면에 바로 반영했습니다. 파일 URL처럼 서버가 값을 다시 만들어야 하는 변경만 `invalidateQueries`로 재조회해 빠른 반응과 데이터 일관성을 함께 지켰습니다.

### Problem 02 - 지원 기록이 늘수록 느려지는 목록과 필터
- 모든 지원 기록을 한 번에 불러오면 첫 화면이 늦게 열리고, 회사명이나 진행 단계 필터를 바꿀 때마다 이미 받은 데이터까지 다시 정리해야 했습니다.

### Solution 02 - 필요한 페이지만 이어서 불러오는 목록
- `useInfiniteQuery`와 `IntersectionObserver`를 조합해 사용자가 목록 끝에 가까워졌을 때 다음 페이지를 불러왔습니다. 커서 기반 페이지네이션을 사용해 마지막으로 받은 항목 다음부터 이어서 조회했습니다.
- 검색어와 진행 단계 같은 필터를 `queryKey`에 포함해 조건별 캐시를 분리했습니다. 사용자가 이전 필터로 돌아오면 이미 받은 목록을 재사용할 수 있습니다.

### Problem 03 - 같은 알림 기능이 기기마다 다르게 동작
- 일반 브라우저, iOS Safari, 홈 화면에 설치한 PWA는 알림 권한을 요청할 수 있는 조건과 메시지 수신 방식이 달랐습니다. 하나의 흐름으로 처리하면 지원하지 않는 환경에서 권한 버튼이 노출되거나 사용자가 허용했는데도 알림을 받지 못할 수 있었습니다.

### Solution 03 - 실행 환경과 앱 상태별 권한 흐름 분리
- iOS Safari와 standalone PWA 여부를 먼저 판별하고, 각 환경에서 실제로 권한 요청이 가능한 시점에만 안내와 버튼을 노출했습니다.
- Firebase Cloud Messaging과 Service Worker를 연결하되, 앱을 보고 있을 때의 foreground 알림과 닫혀 있을 때의 background 알림을 별도 경로로 처리했습니다.

### Problem 04 - 모든 화면이 백엔드 연결 방식을 알아야 하는 구조
- 브라우저의 각 화면이 백엔드 주소, 인증 정보 전달, 오류 응답 형식을 직접 처리하면 같은 코드가 반복되고 백엔드 규칙이 바뀔 때 수정 범위가 커졌습니다.

### Solution 04 - 프론트엔드 전용 API 계층으로 연결 규칙 통합
- Next.js Route Handler를 BFF(Backend for Frontend)로 두어 브라우저는 동일한 내부 API만 호출하게 했습니다. BFF가 백엔드 주소, 인증 전달, 응답 형식 변환을 맡아 화면 컴포넌트는 사용자 흐름에 집중할 수 있게 했습니다.

## Tech Stack & Reason
- **TanStack Query**: 목록 무한 스크롤, 상세 캐시 부분 갱신, 수정 후 재검증을 한 체계로 관리했습니다.
- **Next.js Route Handler**: 클라이언트가 백엔드 주소와 인증 전달 규칙을 직접 알지 않도록 분리했습니다.
- **Firebase Cloud Messaging + Service Worker**: foreground/background 알림 경로를 통합했습니다.
- **Zustand**: 필터 UI와 입력 상태처럼 서버 상태와 분리해야 하는 클라이언트 상태를 담당하게 했습니다.

## Achievements
- 상세 수정 흐름에서 변경 필드의 캐시 반영과 서버 재검증이 필요한 변경을 분리했습니다. 실제 요청 수 감소는 검증 자료가 없어 수치로 제시하지 않습니다.
- 목록 로딩은 페이지 단위로 분리해 필요한 페이지까지만 조회하도록 구성했습니다.
- 푸시 권한 흐름은 `iOS Safari / standalone PWA / 일반 브라우저 / 권한 거부 상태`로 분기했습니다.

## Trade-offs / Limitations
- 브라우저 푸시 알림은 플랫폼 정책의 영향을 받기 때문에 동일한 UX를 모든 환경에 강제하지 않았습니다.
- 캐시 부분 갱신은 빠르지만 서버 응답과의 일관성 확인이 필요한 케이스에서는 재검증을 함께 사용했습니다.

## Portfolio Summary
- Career Hub는 지원 상태, 일정, 알림을 한 화면 흐름으로 관리하는 PWA 프로젝트입니다.
- CRUD 구현보다 상태 규칙, 캐시 전략, 플랫폼 제약을 먼저 분리한 뒤 화면을 연결했습니다.
