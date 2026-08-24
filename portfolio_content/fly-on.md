---
title: "Fly:On"
slug: "fly-on"
period: "2025.06 - 2025.11"
team: "팀 프로젝트 (FE 2 / BE 2 / Design 1)"
role: "Frontend / Mobile"
github: "https://github.com/SQUAD-FLY-ON/FLY-ON"
description: "여행 일정 생성과 편집을 모바일에서 직접 조작할 수 있게 만든 React Native 플래너"
problem: "React Native에서 일정 Drag & Drop을 직접 구현해야 했고, 드래그 상태 변경이 넓게 전파되면서 렌더링 시간이 증가했습니다."
contribution: "PanResponder 기반 Drag & Drop을 구현하고, 편집 상태와 서버 캐시를 분리한 뒤 React Profiler로 렌더링 병목을 줄였습니다."
implementation: "PanResponder, layout 측정, floating layer를 연결하고 React.memo와 Zustand selector로 드래그 중 렌더링 범위를 제한했습니다."
decision: "즉시 바뀌는 편집 상태는 Zustand, 서버가 원본인 일정·관광지 데이터는 TanStack Query로 분리하고 Profiler 측정값으로 최적화 여부를 판단했습니다."
evidence: "동일 시나리오의 total commit duration 211.5→72.9ms, 평균 commit duration 17.6→6.6ms를 측정했습니다."
stack: ["TypeScript", "React Native", "Expo", "TanStack Query", "Zustand", "PanResponder", "Jest"]
---

## Overview
- 여행 일정을 생성하고 모바일에서 직접 편집할 수 있게 만든 React Native 플래너입니다.
- 복잡한 일정 편집 경험을 모바일 제스처와 상태 분리, 성능 측정 기준까지 맞춰 구현했습니다.
- 일정 생성 단계와 서버 조회 데이터를 분리해 캐시와 임시 상태가 충돌하지 않도록 설계했습니다.

## Key Features
- **일정 Drag & Drop**: `PanResponder`, layout 측정, floating layer를 조합해 일정 카드 이동을 구현했습니다.
- **일정 생성 단계 관리**: 단계별 선택값은 Zustand store로, 서버 조회 데이터는 TanStack Query로 분리했습니다.
- **지도 탐색 범위 제어**: 선택 지역 좌표를 기준으로 boundary를 제한하고 요청 조건을 제어했습니다.
- **성능 측정과 개선**: React DevTools Profiler로 Drag 중 렌더 비용을 측정하고 memoization과 store selector로 줄였습니다.

## Technical Highlights

### Problem 01 - React Native Drag & Drop 구현 제약
- React Native에는 웹처럼 바로 가져다 쓸 Drag & Drop API가 없어 일정 카드 이동을 직접 구현해야 했습니다.

### Solution 01 - PanResponder와 floating layer
- `PanResponder`, layout 측정, floating layer를 조합해 카드 이동을 구현했습니다.
- Drag 중 렌더 비용은 React DevTools Profiler로 먼저 측정한 뒤 `React.memo`, Zustand selector, drag layer 분리로 줄였습니다.

### Problem 02 - 생성 단계 상태와 서버 캐시 충돌
- 일정 생성 단계 상태와 서버 조회 데이터가 섞이면 캐시와 UI 임시 상태가 충돌했습니다.

### Solution 02 - Client state와 server state 분리
- 일정 생성 단계와 선택값은 `useScheduleStore`로, 일정/관광지/숙소 조회 데이터는 TanStack Query로 분리했습니다.
- 단계 이동 조건은 `validateNextStepEnabled` 순수 함수와 Jest 테스트로 검증했습니다.

### Problem 03 - 지도 탐색 범위 확장
- 지도 탐색이 사용자가 고른 지역 밖까지 열리면 탐색 비용이 커졌습니다.

### Solution 03 - Boundary와 요청 조건 제어
- 지도는 선택 지역 좌표로 boundary를 제한하고 marker 조회에 `enabled`, `staleTime`을 적용했습니다.

## Tech Stack & Reason
- **React Native + Expo**: 모바일 제스처, 지도, 라우팅을 같은 런타임에서 구성했습니다.
- **PanResponder**: 제스처 이벤트와 위치 계산을 직접 제어하기 위해 사용했습니다.
- **Zustand**: 일정 생성 단계와 드래그 상태 같은 클라이언트 상태를 분리했습니다.
- **TanStack Query**: 관광지, 숙소, 일정 조회 캐시와 요청 조건 제어를 담당하게 했습니다.

## Achievements
- 동일 Drag & Drop 시나리오 기준 total commit duration을 `211.5ms -> 72.9ms`로 줄였습니다.
- 평균 commit duration은 `17.6ms -> 6.6ms`로 줄였습니다.
- 지도 기반 탐색 조건은 선택 지역 boundary와 query `enabled` 조건으로 제어했습니다.

## Trade-offs / Limitations
- 직접 구현한 Drag & Drop은 자유도가 높지만, 제스처 충돌과 layout 측정 책임이 커집니다.
- 지도 탐색은 외부 지도 SDK와 디바이스 성능 영향을 받기 때문에 boundary와 요청 조건으로 비용을 제한했습니다.

## Portfolio Summary
- FlyOn은 여행 일정을 모바일에서 직접 편집할 수 있게 만든 React Native 프로젝트입니다.
- 인터랙션 구현 후 프로파일링 데이터로 렌더링 병목을 줄인 점에 초점을 맞췄습니다.
