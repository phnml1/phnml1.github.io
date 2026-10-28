---
title: "Runner's High"
slug: 'runners-high'
period: '2025.02 - 2025.07'
team: '졸업작품 (FE 1 / BE 2)'
role: 'Frontend / Mobile (전담)'
github: 'https://github.com/SQUAD-RUNNERS-HIGH/frontend'
description: '러너가 지도로 코스를 고르고 GPS로 달리기를 기록하며 다른 참가자와 위치를 공유하는 모바일 앱입니다.'
audience: '혼자 또는 그룹으로 달리기를 기록하는 러너'
problem: '달리는 중 모바일 네트워크가 끊겼다가 돌아와도 현재 러닝 모드에 필요한 위치 공유가 자동으로 다시 이어져야 했습니다.'
contribution: '졸업작품 팀에서 모바일 프론트엔드를 전담해 코스 탐색, 모드별 화면·상태와 실시간 위치 연결·재구독 경로를 구현했습니다.'
userFlow:
  - '지도에서 코스 선택'
  - '러닝 모드 시작'
  - '위치·기록 확인'
  - '종료 후 기록 확인'
implementation: '위치·코스·러닝 상태를 Zustand store와 모드별 훅으로 나누고, STOMP heartbeat와 자동 재연결을 적용해 연결 복구 뒤 필요한 위치 topic을 다시 구독하도록 구성했습니다.'
decision: '네트워크 연결 복구와 러닝 화면의 구독 복구를 별개로 다뤘습니다. 연결은 STOMP client가 복구하고, 활성 러닝 모드가 자신에게 필요한 위치 전송·구독 경로를 다시 설정하게 했습니다.'
result: '실시간 경쟁 러닝에서 STOMP 연결이 끊겨도 위치 전송이 이어지도록 heartbeat·reconnectDelay·재구독을 적용했습니다. 프론트엔드를 전담했습니다.'
stack:
  [
    'TypeScript',
    'React Native',
    'Expo',
    'Zustand',
    'TanStack Query',
    'STOMP',
    'WebSocket',
    'expo-location',
    'Axios',
  ]
---

## Overview

- 실시간 위치 공유와 러닝 기록을 모바일에서 유지하는 위치 기반 러닝 앱입니다.
- 지도 기반 코스 탐색과 러닝 모드별 위치 처리 흐름을 구현했습니다.
- 위치, 러닝 모드, 코스, 인증 상태가 동시에 바뀌는 모바일 화면의 복잡도를 다뤘습니다.
- FE 1명, BE 2명의 졸업작품 팀에서 Frontend 개발을 전담했습니다.

## Key Features

- **러닝 상태 분리**: 위치, 러닝, 코스, 인증 상태를 store 단위로 나눠 모드별 UI 책임을 분리했습니다.
- **실시간 위치 동기화**: STOMP 기반 publish/subscribe 경로를 러닝 모드별로 나눴습니다.
- **연결 복구**: STOMP heartbeat와 재연결을 설정했습니다.
- **코스 탐색**: 지도 영역에 맞춰 코스를 조회하고 마커 선택 시 경로가 보이도록 시점을 조정했습니다.

## Technical Highlights

### Problem 01 - 위치 갱신이 다른 러닝 화면까지 다시 그리게 함

- 달리는 동안 GPS 위치는 계속 바뀌고, 사용자는 개인·그룹·코스 러닝을 오갈 수 있습니다. 위치, 코스, 인증, 러닝 진행 상태를 한곳에서 관리하면 작은 변경에도 관련 없는 화면과 통신 로직까지 함께 반응했습니다.

### Solution 01 - 상태 영역과 러닝 모드별 책임 분리

- 위치, 러닝, 코스, 인증 상태를 Zustand store 단위로 나누고 각 화면이 필요한 상태만 구독하도록 구성했습니다.
- 개인·그룹·코스 러닝은 모드별 훅으로 분리했습니다. 각 모드가 필요한 STOMP publish/subscribe 경로만 열도록 해 화면 조건문과 실시간 통신 책임이 한 컴포넌트에 쌓이지 않게 했습니다.

### Problem 02 - 연결이 돌아와도 참가자 위치가 갱신되지 않음

- 러닝 중에는 Wi-Fi와 모바일 데이터 전환이나 일시적인 음영 지역 때문에 WebSocket이 끊길 수 있습니다. 연결만 다시 맺어도 이전에 보고 있던 위치 topic 구독은 사라지므로, 화면상으로는 달리기가 계속돼도 참가자 위치가 더 이상 갱신되지 않을 수 있었습니다.

### Solution 02 - 연결 감지와 모드별 재구독을 두 단계로 복구

- STOMP client에 `heartbeatIncoming`, `heartbeatOutgoing`을 설정해 연결 이상을 감지하고, `reconnectDelay`로 자동 재접속하게 했습니다.
- 재접속이 끝나면 현재 활성화된 러닝 모드가 필요한 topic을 다시 구독하도록 연결 생명주기와 화면 생명주기를 분리했습니다. 그룹 러닝의 위치 공유와 개인 러닝의 기록 경로도 따로 두어 불필요한 전송을 막았습니다.

## Tech Stack & Reason

- **WebSocket(STOMP)**: 실시간 위치 publish/subscribe 경로를 명시적으로 분리하기 쉬워 선택했습니다.
- **expo-location**: foreground/background 위치 추적과 옵션 제어가 필요해서 사용했습니다.
- **Zustand**: 위치, 코스, 인증, 러닝 상태를 store별로 분리하기 위해 사용했습니다.
- **TanStack Query**: 코스와 기록 조회처럼 서버가 원본인 데이터만 담당하게 했습니다.

## Achievements

- 지도 영역에 맞춘 코스 조회와 마커 선택 시점 조정을 구현했습니다.
- WebSocket 연결은 `heartbeat`와 `reconnectDelay` 설정으로 단발성 끊김 이후 자동 복구 경로를 만들었습니다.
- 모드별 훅과 Zustand 공통 상태로 화면·위치 처리 책임을 구분했습니다.

## Trade-offs / Limitations

- 모바일 위치 정확도는 기기와 OS 정책의 영향을 받기 때문에 계산 로직만으로 모든 흔들림을 제거할 수는 없습니다.
- 실시간 위치 공유는 네트워크 품질에 의존하므로 heartbeat와 reconnect로 복구 경로를 두는 데 집중했습니다.
- 운영 사용자 수, 연결 성공률, GPS 정확도 개선률은 확인되지 않아 성과 수치로 사용하지 않았습니다.

## Portfolio Summary

- Runner's High는 지도·러닝 모드·실시간 위치 공유가 맞물리는 모바일 프로젝트입니다.
- 상태 분리와 STOMP 재연결 경로를 중심으로 구현했습니다.
