---
title: "Runner's High"
slug: 'runners-high'
period: '2025.02 - 2025.07'
team: '졸업작품 (FE 1 / BE 2)'
role: 'Frontend / Mobile (전담)'
github: 'https://github.com/SQUAD-RUNNERS-HIGH/frontend'
description: 'GPS 기반 러닝 기록과 실시간 경쟁 기능을 구현한 React Native 앱'
problem: '솔로·코스·경쟁·크루 러닝의 화면과 위치 처리 흐름이 달라 모드별 책임을 분리해야 했습니다.'
contribution: '프론트엔드 개발을 전담하며 지도 기반 코스 탐색, 모드별 훅과 공통 러닝 상태, STOMP 연결 경로를 구현했습니다.'
implementation: '지도 영역에 맞춘 코스 조회와 마커 선택 시점 조정, 모드별 훅, Zustand 공통 상태, STOMP heartbeat·재연결을 적용했습니다.'
decision: '모드별 UI와 위치 처리를 분리하고 크루 러닝과 개인 러닝의 구독·위치 전송 경로를 구분했습니다.'
evidence: '지도·코스 화면과 모드별 상태, STOMP 재연결·구독 경로를 구현했습니다. 운영 성과 수치는 확인되지 않았습니다.'
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

### Problem 01 - 동시에 바뀌는 위치/러닝/인증 상태

- 위치, 러닝 모드, 코스, 인증 상태가 동시에 바뀌는 구조라 상태 책임이 섞이면 UI 분기가 빠르게 복잡해졌습니다.

### Solution 01 - Zustand store와 mode별 통신 경로

- 위치, 러닝, 코스, 인증 상태를 Zustand store 단위로 나눠 모드별 UI 책임을 분리했습니다.
- 개인·그룹·코스 러닝 모드별 상태와 UI를 분리하고 각 모드가 필요한 publish/subscribe 경로만 열었습니다.

### Problem 02 - 네트워크 단절과 모드별 위치 전송

- 실시간 위치 동기화에는 연결 복구와 러닝 모드별 구독 경로가 필요했습니다.

### Solution 02 - heartbeat/reconnect와 구독 경로 분리

- STOMP 클라이언트에 `heartbeatIncoming`, `heartbeatOutgoing`, `reconnectDelay`를 두고 연결 복구 후 필요한 topic을 다시 구독했습니다.
- 크루 러닝과 개인 러닝의 구독·위치 전송 경로를 분리했습니다.

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
