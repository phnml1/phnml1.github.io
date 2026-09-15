---
title: "Runner's High"
slug: 'runners-high'
period: '2025.02 - 2025.07'
team: '졸업작품 (FE 1 / BE 2)'
role: 'Frontend / Mobile (전담)'
github: 'https://github.com/SQUAD-RUNNERS-HIGH/frontend'
description: '실시간 위치 공유와 러닝 기록을 모바일에서 안정적으로 유지한 위치 기반 러닝 앱'
problem: '위치·러닝 모드·인증 상태가 동시에 바뀌고, 네트워크 단절과 GPS 순간 노이즈가 실시간 위치와 pace 표시를 불안정하게 만들었습니다.'
contribution: '프론트엔드를 전담해 러닝 상태를 store별로 분리하고, STOMP 재연결·인증 refresh queue·거리 기반 pace 계산을 구현했습니다.'
implementation: '모드별 Zustand store와 hook을 구성하고 STOMP heartbeat·reconnectDelay·재구독, 단절 중 위치 frame queue, Axios refresh queue와 최근 10초 거리 누적 pace 계산을 적용했습니다.'
decision: '실시간 위치는 STOMP publish/subscribe로 분리하고 GPS raw speed 대신 거리 기반 window를 사용했으며, 동시 401 요청은 하나의 refresh queue로 묶었습니다.'
evidence: '최근 10초 거리 누적값으로 pace를 계산하고, 연결 복구 후 재구독·미전송 위치 frame replay·Axios refresh queue로 복구 경로를 구성했습니다.'
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
- 불안정한 GPS와 네트워크 환경에서도 기록 흐름이 바로 깨지지 않도록 상태와 통신 복구 경로를 분리했습니다.
- 위치, 러닝 모드, 코스, 인증 상태가 동시에 바뀌는 모바일 화면의 복잡도를 다뤘습니다.
- FE 1명, BE 2명의 졸업작품 팀에서 Frontend 개발을 전담했습니다.

## Key Features

- **러닝 상태 분리**: 위치, 러닝, 코스, 인증 상태를 store 단위로 나눠 모드별 UI 책임을 분리했습니다.
- **실시간 위치 동기화**: STOMP 기반 publish/subscribe 경로를 러닝 모드별로 나눴습니다.
- **연결 복구**: heartbeat와 reconnectDelay를 설정하고 재연결 뒤 topic을 다시 구독하며, 단절 중 위치 frame은 queue에 보존했습니다.
- **GPS pace 보정**: GPS raw speed 대신 최근 `10초` 거리 누적값 기반으로 페이스를 계산했습니다.
- **인증 복구 흐름**: Axios interceptor와 refresh queue로 만료 토큰 복구를 공통 경로로 묶었습니다.

## Technical Highlights

### Problem 01 - 동시에 바뀌는 위치/러닝/인증 상태

- 위치, 러닝 모드, 코스, 인증 상태가 동시에 바뀌는 구조라 상태 책임이 섞이면 UI 분기가 빠르게 복잡해졌습니다.

### Solution 01 - Zustand store와 mode별 통신 경로

- 위치, 러닝, 코스, 인증 상태를 Zustand store 단위로 나눠 모드별 UI 책임을 분리했습니다.
- 개인·그룹·코스 러닝 모드별 상태와 UI를 분리하고 각 모드가 필요한 publish/subscribe 경로만 열었습니다.

### Problem 02 - 네트워크 흔들림과 GPS 노이즈

- 실시간 위치 동기화는 네트워크가 흔들릴 때 바로 끊겼고, GPS raw speed를 그대로 쓰면 페이스 계산이 순간 노이즈에 크게 흔들렸습니다.

### Solution 02 - heartbeat/reconnect와 pace window

- 페이스는 GPS raw speed 대신 최근 `10초` 거리 누적값 기반으로 다시 계산해 흔들림을 줄였습니다.
- STOMP 클라이언트에 `heartbeatIncoming`, `heartbeatOutgoing`, `reconnectDelay`를 두고 연결 복구 후 필요한 topic을 다시 구독했습니다.
- 단절 중 전송하지 못한 위치 frame은 queue에 보존하고 연결이 돌아오면 순서대로 전송했습니다.
- Axios interceptor와 refresh queue로 만료 토큰 복구를 공통 경로로 묶었습니다.

## Tech Stack & Reason

- **WebSocket(STOMP)**: 실시간 위치 publish/subscribe 경로를 명시적으로 분리하기 쉬워 선택했습니다.
- **expo-location**: foreground/background 위치 추적과 옵션 제어가 필요해서 사용했습니다.
- **Zustand**: 위치, 코스, 인증, 러닝 상태를 store별로 분리하기 위해 사용했습니다.
- **TanStack Query**: 코스와 기록 조회처럼 서버가 원본인 데이터만 담당하게 했습니다.

## Achievements

- 페이스 계산 기준을 GPS raw speed에서 최근 `10초` 거리 기반 계산으로 바꿨습니다.
- WebSocket 연결은 `heartbeat`와 `reconnectDelay` 설정으로 단발성 끊김 이후 자동 복구 경로를 만들었습니다.
- 연결 복구 뒤 재구독하고 단절 중 미전송 위치 frame을 queue에서 다시 전달하도록 구성했습니다.
- 동시 `401` 응답은 refresh queue 하나로 묶어 중복 재인증 요청을 줄였습니다.

## Trade-offs / Limitations

- 모바일 위치 정확도는 기기와 OS 정책의 영향을 받기 때문에 계산 로직만으로 모든 흔들림을 제거할 수는 없습니다.
- 실시간 위치 공유는 네트워크 품질에 의존하므로 heartbeat와 reconnect로 복구 경로를 두는 데 집중했습니다.
- 운영 사용자 수, 연결 성공률, GPS 정확도 개선률은 확인되지 않아 성과 수치로 사용하지 않았습니다.

## Portfolio Summary

- Runner's High는 위치, 실시간 통신, 인증 복구가 동시에 맞물리는 모바일 프로젝트입니다.
- 상태 분리, 실시간 통신 복구, 위치 데이터 보정으로 모바일 제약을 다뤘습니다.
