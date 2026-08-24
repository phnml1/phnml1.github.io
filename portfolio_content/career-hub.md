---
title: "Career Hub"
slug: "career-hub"
period: "2025.11 - 2026.02"
team: "팀 프로젝트 (FE 2 / BE 2)"
role: "Frontend"
github: "https://github.com/phnml1/Career_Hub_Frontend"
description: "채용 공고, 지원 단계, 일정, 알림을 하나의 PWA 흐름으로 묶은 취업 준비 대시보드"
problem: "전형 결과와 현재 단계가 화면마다 어긋날 수 있었고, 상세 수정마다 전체 재조회가 발생해 변경 범위보다 큰 요청 비용이 생겼습니다."
contribution: "지원 단계 동기화 규칙과 수정 유형별 TanStack Query 캐시 갱신 전략을 설계하고 PWA 알림 권한 흐름을 분리했습니다."
implementation: "timelineSyncRules를 UI 밖으로 분리하고, 안전한 변경은 setQueryData로 반영하며 서버 재생성이 필요한 변경만 invalidateQueries로 처리했습니다."
decision: "서버 데이터는 TanStack Query, 입력·필터 상태는 Zustand, 인증 전달과 API 응답 규칙은 Next.js Route Handler 기반 BFF로 분리했습니다."
evidence: "상세 수정 후 전체 refetch를 1→0회로 줄였고, 서버 재생성이 필요한 변경만 invalidateQueries로 재검증했습니다."
stack: ["TypeScript", "React", "Next.js App Router", "TanStack Query", "Zustand", "Firebase Cloud Messaging", "Service Worker", "Tailwind CSS"]
---

## Overview
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

### Problem 01 - 지원 단계와 최종 결과 불일치
- 서류, 과제, 면접, 최종 결과가 서로 다른 시점에 바뀌면서 현재 단계와 최종 결과가 쉽게 어긋났습니다.

### Solution 01 - timelineSyncRules 분리
- `timelineSyncRules`로 단계 동기화 규칙을 분리해 상태 계산을 UI 밖으로 빼냈습니다.
- 상세 수정은 `setQueryData`로 변경된 필드만 반영하고, 파일 URL처럼 서버 재생성이 필요한 케이스만 `invalidateQueries`로 분기했습니다.

### Problem 02 - 목록 데이터 증가에 따른 탐색 비용
- 지원 목록은 데이터가 늘어날수록 초기 로딩과 탐색 비용이 커졌습니다.

### Solution 02 - Infinite query와 IntersectionObserver
- `useInfiniteQuery`와 `IntersectionObserver`를 조합하고 필터 조건을 queryKey에 포함했습니다.
- 필터 변경 시 목록 캐시가 조건별로 분리되고, 다음 페이지는 커서 기준으로 이어서 로드됩니다.

### Problem 03 - 플랫폼별 푸시 권한 흐름 차이
- 브라우저와 설치 상태에 따라 웹 푸시 권한 요청 UX가 달라 같은 기능이 환경마다 다르게 동작했습니다.

### Solution 03 - 권한 흐름 분기
- FCM, Service Worker, iOS Safari/PWA 분기를 별도 권한 흐름으로 나눴습니다.
- 알림은 foreground/background, 설치형/브라우저형 UX를 분리해 다뤘습니다.

### Problem 04 - 클라이언트의 API 주소와 인증 책임 노출
- 브라우저에서 백엔드 API 주소와 인증 전달 방식을 직접 다루면 보안과 응답 처리 책임이 섞였습니다.

### Solution 04 - Next.js Route Handler 기반 BFF
- Next.js Route Handler 기반 BFF를 두고 클라이언트 요청과 백엔드 응답 처리 규칙을 분리했습니다.

## Tech Stack & Reason
- **TanStack Query**: 목록 무한 스크롤, 상세 캐시 부분 갱신, 수정 후 재검증을 한 체계로 관리했습니다.
- **Next.js Route Handler**: 클라이언트가 백엔드 주소와 인증 전달 규칙을 직접 알지 않도록 분리했습니다.
- **Firebase Cloud Messaging + Service Worker**: foreground/background 알림 경로를 통합했습니다.
- **Zustand**: 필터 UI와 입력 상태처럼 서버 상태와 분리해야 하는 클라이언트 상태를 담당하게 했습니다.

## Achievements
- 상세 수정 흐름에서 전체 상세 refetch `1회` 대신 변경 필드만 캐시에 반영해 불필요한 재요청을 `0회`로 줄였습니다.
- 목록 로딩은 페이지 단위로 분리해 필요한 페이지까지만 조회하도록 구성했습니다.
- 푸시 권한 흐름은 `iOS Safari / standalone PWA / 일반 브라우저 / 권한 거부 상태`로 분기했습니다.

## Trade-offs / Limitations
- 브라우저 푸시 알림은 플랫폼 정책의 영향을 받기 때문에 동일한 UX를 모든 환경에 강제하지 않았습니다.
- 캐시 부분 갱신은 빠르지만 서버 응답과의 일관성 확인이 필요한 케이스에서는 재검증을 함께 사용했습니다.

## Portfolio Summary
- Career Hub는 지원 상태, 일정, 알림을 한 화면 흐름으로 관리하는 PWA 프로젝트입니다.
- CRUD 구현보다 상태 규칙, 캐시 전략, 플랫폼 제약을 먼저 분리한 뒤 화면을 연결했습니다.
