---
title: 'Fly:On'
slug: 'fly-on'
period: '2025.06 - 2025.11'
team: '팀 프로젝트 (FE 2 / BE 2 / Design 1)'
role: 'Frontend / Mobile'
github: 'https://github.com/SQUAD-FLY-ON/FLY-ON'
store: 'https://m.onestore.co.kr/v2/ko-kr/app/0001002231'
description: '패러글라이딩 비행과 관광 일정을 모바일에서 만들고 순서를 바꿔 편집하는 여행 계획 앱입니다.'
audience: '비행·관광 일정을 계획하는 모바일 사용자'
problem: '일정 카드를 끌어 순서를 바꿀 때 목록 전체가 반복해서 다시 그려지면 손가락 움직임보다 화면이 늦게 따라오는 문제가 있었습니다.'
contribution: '팀의 모바일 프론트엔드에서 일정 Drag & Drop과 편집 상태 관리를 구현하고, Profiler로 렌더링 병목을 측정·개선했습니다.'
userFlow:
  - '비행·관광지 선택'
  - '일정 생성'
  - '카드 이동·순서 편집'
  - '저장된 일정 확인'
implementation: 'PanResponder로 제스처를 추적하고 카드 위치를 측정해 이동 중인 카드만 별도 레이어에 표시했습니다. React.memo와 Zustand selector로 드래그 중 다시 그리는 컴포넌트 범위를 줄였습니다.'
decision: '제스처 좌표와 일정 데이터의 변경 책임을 분리하고, 감으로 최적화하지 않도록 React DevTools Profiler의 전후 측정값을 기준으로 병목을 좁혔습니다.'
evidence: '동일 시나리오의 total commit duration 211.5→72.9ms, 평균 commit duration 17.6→6.6ms를 측정했습니다.'
stack:
  [
    'TypeScript',
    'React Native',
    'Expo',
    'TanStack Query',
    'Zustand',
    'PanResponder',
    'SecureStore',
    'Jest',
  ]
---

## Overview

- 패러글라이딩 비행·관광 일정을 생성하고 모바일에서 편집하는 React Native 앱입니다.
- 복잡한 일정 편집 경험을 모바일 제스처와 상태 분리, 성능 측정 기준까지 맞춰 구현했습니다.
- 일정 생성 단계와 서버 조회 데이터를 분리해 캐시와 임시 상태가 충돌하지 않도록 설계했습니다.
- FE 2명, BE 2명, Designer 1명의 팀에서 모바일 Frontend를 담당했습니다.

## Key Features

- **일정 Drag & Drop**: `PanResponder`, layout 측정, floating layer를 조합해 일정 카드 이동을 구현했습니다.
- **일정 생성 단계 관리**: 단계별 선택값은 Zustand store로, 서버 조회 데이터는 TanStack Query로 분리했습니다.
- **인증 상태 복원**: SecureStore에 보관한 token을 앱 시작 시 복원해 인증 준비 전 화면 분기를 안정화했습니다.
- **지도 탐색 범위 제어**: 선택 지역 좌표를 기준으로 boundary를 제한하고 요청 조건을 제어했습니다.
- **성능 측정과 개선**: React DevTools Profiler로 Drag 중 렌더 비용을 측정하고 memoization과 store selector로 줄였습니다.

## Technical Highlights

### Problem 01 - 드래그할 때 손가락보다 늦게 따라오는 일정 카드

- 사용자는 여러 비행·관광 일정을 손가락으로 끌어 원하는 순서에 놓아야 했습니다. React Native에는 이 흐름을 그대로 제공하는 Drag & Drop API가 없어 제스처, 카드 위치 계산, 목록 순서 변경을 직접 연결해야 했습니다.
- 이 과정에서 드래그 좌표가 바뀔 때마다 목록 전체가 다시 렌더링되면 카드가 손가락 움직임을 늦게 따라왔습니다.

### Solution 01 - 이동 중인 카드와 목록 렌더링 분리

- `PanResponder`로 손가락 이동을 추적하고 각 카드의 layout을 측정해 어느 위치로 옮길지 계산했습니다. 이동 중인 카드는 floating layer에서 따로 그려 목록 전체가 제스처 좌표를 따라 갱신되지 않게 했습니다.
- React DevTools Profiler로 같은 동작을 전후 비교한 뒤 `React.memo`와 Zustand selector를 적용했습니다. 그 결과 total commit duration은 `211.5ms → 72.9ms`, 평균 commit duration은 `17.6ms → 6.6ms`로 줄었습니다.

### Problem 02 - 작성 중인 일정과 서버에서 받은 일정의 충돌

- 사용자가 아직 저장하지 않은 선택값과 서버에 이미 저장된 일정 데이터를 같은 상태로 관리하면, 단계 이동이나 재조회 때 작성 중인 값이 덮일 수 있었습니다.

### Solution 02 - 작성 상태와 서버 데이터의 책임 분리

- 일정 생성 단계와 사용자의 선택값은 Zustand의 `useScheduleStore`가 관리하고, 일정·관광지·숙소처럼 서버가 원본인 데이터는 TanStack Query가 관리하도록 나눴습니다.
- 다음 단계로 이동할 수 있는 조건은 `validateNextStepEnabled` 순수 함수로 분리하고 Jest 테스트를 작성해 화면과 무관하게 검증했습니다.

### Problem 03 - 선택 지역 밖의 장소까지 불필요하게 조회

- 사용자가 제주 지역을 골랐는데도 지도가 전국 범위로 열리거나 이동할 때마다 장소를 다시 요청하면, 원하는 장소를 찾기 어렵고 네트워크 요청도 늘어났습니다.

### Solution 03 - 지도 범위와 조회 시점 제한

- 지도 이동 범위를 선택 지역의 boundary로 제한했습니다. marker 조회에는 TanStack Query의 `enabled`와 `staleTime`을 적용해 좌표가 준비된 뒤 요청하고, 짧은 시간 안에는 같은 데이터를 다시 가져오지 않게 했습니다.

### Problem 04 - 앱을 다시 열 때 로그인 화면이 잠시 보이는 현상

- 앱을 시작하자마자 로그인 여부를 판단하면 보안 저장소에서 token을 읽기 전까지 기존 사용자도 비로그인 상태로 처리됐습니다. 이때 로그인 화면이 잠시 나타나거나 인증이 필요한 API가 먼저 실행될 수 있었습니다.

### Solution 04 - 인증 복원이 끝난 뒤 화면과 요청 활성화

- 앱 시작 시 SecureStore에서 token을 복원하는 준비 상태를 두었습니다. 복원이 끝난 뒤에만 인증이 필요한 화면과 Query를 활성화해 화면 깜빡임과 불필요한 요청을 막았습니다.

## Tech Stack & Reason

- **React Native + Expo**: 모바일 제스처, 지도, 라우팅을 같은 런타임에서 구성했습니다.
- **PanResponder**: 제스처 이벤트와 위치 계산을 직접 제어하기 위해 사용했습니다.
- **Zustand**: 일정 생성 단계와 드래그 상태 같은 클라이언트 상태를 분리했습니다.
- **TanStack Query**: 관광지, 숙소, 일정 조회 캐시와 요청 조건 제어를 담당하게 했습니다.

## Achievements

- 동일한 profiling 시나리오에서 total commit duration을 `211.5ms → 72.9ms`로 줄였습니다.
- 같은 시나리오의 평균 commit duration은 `17.6ms → 6.6ms`로 줄였습니다.
- 지도 기반 탐색 조건은 선택 지역 boundary와 query `enabled` 조건으로 제어했습니다.

## Trade-offs / Limitations

- 직접 구현한 Drag & Drop은 자유도가 높지만, 제스처 충돌과 layout 측정 책임이 커집니다.
- 지도 탐색은 외부 지도 SDK와 디바이스 성능 영향을 받기 때문에 boundary와 요청 조건으로 비용을 제한했습니다.
- Profiler 수치는 동일한 로컬 시나리오의 전후 비교이며 실제 사용자 기기 전체의 성능을 대표하지 않습니다.

## Portfolio Summary

- Fly:On은 패러글라이딩 비행·관광 일정을 모바일에서 편집하는 React Native 프로젝트입니다. 원스토어에 게시된 앱을 확인할 수 있습니다.
- 인터랙션 구현 후 프로파일링 데이터로 렌더링 병목을 줄인 점에 초점을 맞췄습니다.
