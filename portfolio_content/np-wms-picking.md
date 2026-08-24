---
title: "NP WMS Picking"
slug: "np-wms-picking"
period: "2026.06 - 2026.08"
team: "팀 프로젝트 / 익명 물류 운영사"
role: "Frontend / Full-stack"
description: "PDA, Android WebView, WMS 계약을 연결한 현장 피킹 운영 시스템"
problem: "작은 PDA 화면에서 물리 스캐너 입력, 오스캔, 부분 피킹, 네트워크 단절을 처리하면서 작업 단계와 서버 상태를 일치시켜야 했습니다."
contribution: "Frontend에서는 스캐너 정규화, 단계별 가드, 오프라인 outbox, WMS 계약 매핑을 맡고 Backend의 부분 피킹·완료 흐름을 보강했습니다."
implementation: "Android key event를 웹 CustomEvent로 전달하고, IndexedDB work package와 command outbox, 단계별 validation, WMS adapter를 구현했습니다."
decision: "현장 입력은 WebView bridge에서 정규화하고 오프라인 명령은 IndexedDB에 순서대로 보존했으며, 부분 피킹은 Backend transaction 경계에서 분리했습니다."
evidence: "Git author 기준 30/104 commits, Mobile FE 55 tests, Backend 224 tests와 두 프론트엔드 production build 통과를 확인했습니다."
stack: ["React", "TypeScript", "Vite", "IndexedDB", "Android WebView", "Kotlin", "Spring Boot", "Spring JDBC", "MySQL", "Apache POI", "Vitest", "JUnit"]
---

## Overview
- 관리자가 PL을 등록, 배정, 관제하고 작업자는 PDA에서 로케이션 이동, 상품 확인, 수량 피킹, 분류/완료를 수행하는 WMS 연동 피킹 운영 시스템입니다.
- 작은 PDA 화면, 물리 스캐너 입력, 오스캔, 부분 피킹, 네트워크 단절, 작업 단계 피드백 같은 현장 제약을 다뤘습니다.
- 공개 위험이 있는 내부 주소, 인증값, 실제 운영 수치, 회사별 세부 프로세스 값은 제외했습니다.

## Key Features
- **PDA 단계형 피킹 UI**: MOVE, ITEM, PICK, SORT, DONE 단계와 다음 행동을 640x480급 화면에 맞춰 정리했습니다.
- **물리 스캐너 입력 처리**: Android WebView에서 키 이벤트를 모아 웹 CustomEvent로 전달하고, 웹에서 바코드 정규화와 단계별 검증을 적용했습니다.
- **오프라인 outbox**: IndexedDB에 작업 패키지와 명령을 저장하고 재연결 시 순차 재전송하도록 구성했습니다.
- **부분 피킹과 잔여 작업**: 완료분과 잔여 task, split event, 재고 변경 로그를 분리해 오완료 경로를 줄였습니다.
- **외부 WMS 계약 매핑**: WMS의 claim, location, product, quantity, complete 응답을 기존 PDA 상태 흐름에 연결했습니다.

## Technical Highlights

### Problem 01 - 작은 PDA 화면과 스캐너 입력 제약
- 데스크톱형 화면 밀도와 일반 input 중심 흐름은 640x480급 PDA에서 현재 단계, 목표 로케이션, 상품, 수량을 동시에 보기 어렵게 만들었습니다.
- 물리 스캐너는 키보드처럼 입력되기 때문에 포커스, 소프트키보드, 입력기 상태에 따라 값이 흔들릴 수 있었습니다.

### Solution 01 - PDA UI와 Android scanner bridge
- 피킹 카드와 주요 액션을 단계 중심으로 재배치하고 Android fullscreen, visualViewport 높이 처리를 연결했습니다.
- Android dispatchKeyEvent에서 스캐너 입력을 250ms 버퍼로 모아 Enter/Tab 시 `np-wms-scan` CustomEvent로 전달했습니다.
- 웹에서는 ASCII 대문자화, 한글 입력기 QWERTY 복원, prefix/형식 검증, 불완전 스캔 경고를 적용했습니다.

### Problem 02 - 오스캔과 부분 피킹의 상태 오염
- 잘못된 바코드가 서버로 전달되거나 잔여 수량이 있는데 완료 처리되면 현장 작업 상태와 관리자 추적 데이터가 어긋날 수 있었습니다.

### Solution 02 - 검증 가드와 부분 피킹 분기
- prefix/형식 오류는 클라이언트에서 먼저 막고, 형식은 맞지만 대상이 다른 경우에는 서버 validation 응답으로 처리했습니다.
- 잔여 수량 미만 입력 시 계속 작업과 부족 보고를 분리하고, 완료분과 residual task를 backend transaction 안에서 분리했습니다.

### Problem 03 - 네트워크 단절 후 작업 순서 복구
- PDA 작업은 네트워크가 항상 안정적이라고 가정하기 어렵고, 재연결 후 명령 순서와 version 충돌을 보존해야 했습니다.

### Solution 03 - IndexedDB work package와 command outbox
- 네트워크 실패 시 deviceId, clientEventId, expectedVersion을 고정하고 작업 패키지와 outbox command를 같은 IndexedDB transaction으로 저장했습니다.
- 재연결 시 PENDING command를 순차 재전송하고, 연결 실패는 backoff, version/idempotency conflict는 차단 상태로 멈추게 했습니다.

### Problem 04 - 외부 WMS 계약과 기존 PDA 상태 흐름의 차이
- 외부 WMS API는 stateVersion과 assignmentVersion을 함께 다루고, BLOCK/DEFERRED 같은 응답을 기존 화면 단계와 맞춰야 했습니다.

### Solution 04 - WMS Mobile 계약 adapter
- my-work/claim, location, product, quantity, complete, pallet-full 계약을 기존 PDA 상태기계에 매핑했습니다.
- WMS backend의 import 멱등성, event outbox dispatcher는 팀 기여로 구분하고, 개인 기여는 Mobile FE 소비와 상태 연결 범위로 제한했습니다.

## Tech Stack & Reason
- **React + TypeScript**: PDA 단계 UI와 validation 상태를 명확하게 표현했습니다.
- **IndexedDB + Service Worker**: 작업 패키지와 outbox를 브라우저에 저장하고 앱 셸 캐시를 구성했습니다.
- **Android WebView + Kotlin**: 물리 스캐너, 소프트키보드 정책, native bridge가 필요한 현장 입력을 처리했습니다.
- **Kotlin/Spring + JDBC/MySQL**: task 상태 전이, 부분 피킹, 재고 변경 로그, 관리자 API를 transaction 경계에서 처리했습니다.
- **Vitest + JUnit**: offline store, WMS mapping, validation, MobileTaskService 회귀 시나리오를 검증했습니다.

## Achievements
- Git author 기준 `mj-juyeong` 30 / 전체 104 commits를 확인했습니다. 30개에는 merge commit 2개와 정리 commit 1개가 포함되어 기능 commit 수로 표현하지 않았습니다.
- Backend `26 suites`, `224 tests` 통과를 확인했습니다.
- Mobile FE `7 files`, `55 tests` 통과를 확인했습니다.
- Mobile production build는 JS `292.39 kB`, gzip `91.56 kB`; Admin production build는 JS `393.62 kB`, gzip `106.43 kB`로 확인했습니다.
- 실제 작업시간 단축률, 오류율 감소, 현장 처리량은 확인되지 않아 수치로 표현하지 않았습니다.

## What I Focused On
- 현장 작업자가 다음 행동을 놓치지 않도록 PDA UI, 스캔 피드백, TTS 중복 억제, 상태 전이를 맞추는 데 집중했습니다.
- Frontend에서는 스캐너 정규화, 단계별 가드, 오프라인 outbox, WMS 계약 매핑을 주도했습니다.
- Backend에서는 전체 피킹 집계, 재고 변경 XLSX export, MobileTaskService의 부분 피킹과 완료 라우팅을 구현 또는 보강했습니다.

## Trade-offs / Limitations
- Mobile UI와 API는 공동 파일이 많아 단독 구현으로 표현하지 않았고, Git blame과 commit 기준으로 개인 범위를 제한했습니다.
- Android WebView 셸과 native TTS 원형은 팀 기여이며, 개인 Android 기여는 scanner key capture, keyboard policy, 후반 라벨 인쇄 bridge 범위로 구분했습니다.
- 실제 PDA 모델, 제조사 스캐너 suffix, 장시간 오프라인, Bluetooth 프린터, 외부 WMS 장애 상황은 코드 테스트만으로 대체할 수 없습니다.

## Portfolio Summary
- NP WMS Picking은 PDA, WMS, Android WebView, Spring backend를 연결한 실무형 물류 피킹 운영 시스템입니다.
- CRUD 화면보다 스캐너 입력, 오프라인 복구, 부분 피킹, WMS version 충돌 같은 현장 문제를 중심으로 정리했습니다.
- 개인 기여와 팀 기여를 Git author 기준으로 구분했고, 공개 위험이 있는 정보와 확인되지 않은 운영 성과 수치는 제외했습니다.
