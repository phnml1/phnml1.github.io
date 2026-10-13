---
title: 'NP WMS Picking'
slug: 'np-wms-picking'
period: '2026.07 - 2026.08'
team: '팀 프로젝트 / 익명 물류 운영사'
role: 'PDA Frontend 중심 / 초기 Backend·관리자 화면 기여'
description: '창고 작업자가 PDA와 물리 스캐너로 위치·상품·수량을 확인하며 피킹을 진행하는 현장 작업 화면입니다.'
audience: '창고 현장 작업자'
problem: '스캔 입력이 흔들리거나 네트워크가 끊겨도 작업 기록을 잃거나 같은 수량을 중복 반영하지 않아야 했습니다.'
contribution: 'PDA 단계 UI, Android 스캐너 입력 연결, IndexedDB 오프라인 명령 보존과 WMS 응답 표시를 구현했습니다. 초기 Backend·관리자 화면에도 일부 기여했습니다.'
userFlow:
  - '배정된 작업 확인'
  - '위치·상품 스캔'
  - '수량·분류 확인'
  - '연결 복구 후 전송'
implementation: 'Android native layer에서 물리 스캐너 키 이벤트를 완성된 scan으로 변환해 WebView에 전달했습니다. 네트워크 요청 전에는 IndexedDB outbox에 clientEventId·expectedVersion·payload를 저장해 재연결 후에도 같은 명령을 복구했습니다.'
decision: 'PDA에 명령을 저장한 상태와 WMS가 수락한 상태를 분리했습니다. 응답이 유실되어도 새 요청을 만들지 않고 같은 clientEventId를 가진 명령을 ordered outbox에서 순차 재전송했습니다. version conflict는 자동으로 덮어쓰지 않고 사용자가 확인할 차단 상태로 보존했습니다.'
stack:
  [
    'React',
    'TypeScript',
    'Vite',
    'IndexedDB',
    'Android WebView',
    'Kotlin',
    'Spring Boot',
    'Spring JDBC',
    'MySQL',
    'Vitest',
    'JUnit',
  ]
---

## 프로젝트 한 줄 설명

창고 작업자가 작은 PDA와 물리 스캐너로 로케이션 → 상품 → 수량 → 분류 단계를 수행하고, 연결이 끊겨도 작업 사실과 재시도 순서를 보존하는 현장 실행 프론트엔드입니다.

## 해결한 업무 문제

- 데스크톱 전제의 화면은 640×480급 PDA에서 현재 단계와 다음 행동을 동시에 파악하기 어려웠습니다.
- Android 물리 키, 키보드 wedge, paste, 한글 IME와 Enter/Tab suffix가 섞여 스캔 값이 중복되거나 유실될 수 있었습니다.
- 네트워크 응답이 유실됐을 때 새 ID로 재전송하면 피킹 수량이 중복 반영될 수 있었습니다.
- 부분 완료분과 남은 수량을 한 task에 덮어쓰면 residual 작업과 감사 이력이 사라질 수 있었습니다.

## 대상 사용자와 사용 흐름

창고 현장 작업자는 배정된 작업을 열고 로케이션 → 상품 → 수량 → 분류 순서로 스캔합니다. 연결이 끊기면 허용된 명령을 로컬에 저장하고, 재연결 시 순차 replay합니다. 별도 WMS 저장소의 기능 브랜치에서는 부분 피킹의 완료분과 잔여 작업을 분리하는 서버 흐름도 구현했습니다.

## 나의 역할

`np-wms-picking`에서는 PDA 단계 UI, scanner 입력 정규화, focus·IME 복구, barcode validation, IndexedDB outbox와 WMS 응답 상태 연결을 담당했습니다. 같은 저장소의 초기 Kotlin/Spring API와 관리자 QA 화면도 일부 구현했습니다. 피킹 정책·부분 피킹 서버 로직은 별도 `np-wms-tmp` 기능 브랜치의 작업입니다.

## 팀 기여와 개인 기여의 경계

- **np-wms-picking main**: Mobile FE, Android scanner bridge, 단계별 validation, offline outbox, WMS 모바일 API 소비와 초기 Backend·관리자 기능에 직접 기여했습니다.
- **np-wms-tmp 기능 브랜치**: 작업자·장비 배정 정책, 모바일 명령의 멱등성·버전, 부분 피킹·팔레트 복구와 출력 상태를 구현했습니다. 최신 작업 다수의 `origin/main` 포함과 운영 반영은 확인되지 않았습니다.
- **np-picking-execution 로컬 Pilot**: WMS와 실행 책임을 나눈 계약, React PDA·IndexedDB, Kotlin/Spring 상태 저장을 별도 저장소에서 구현했습니다. 원격·PR·운영 배포 근거가 없어 이 페이지의 본편과 합치지 않습니다.

## 시스템 또는 데이터 흐름

`np-wms-picking`의 주 경로는 물리 Scanner → Android `dispatchKeyEvent` → WebView CustomEvent → React barcode normalization → IndexedDB work package/outbox → WMS 모바일 API입니다. 로컬 저장은 서버 수락이 아니며, WMS의 배정·버전·완료 응답을 화면에 따로 반영합니다. 독립 Picking server는 별도 로컬 Pilot의 구조이지 이 main 경로의 배포 구성으로 주장하지 않습니다.

## 핵심 상태 머신

- 화면 단계: `LOCATION → ITEM → QUANTITY → SORT → DONE`
- 오프라인 명령: `LOCAL_PENDING → REPLAYING → SERVER_ACCEPTED → LOCAL_ACKED`
- 충돌: `expectedVersion` 또는 idempotency conflict가 발생하면 자동 덮어쓰지 않고 차단 상태로 이동합니다.
- 부분 피킹: 별도 WMS 기능 브랜치에서 완료분과 residual task를 분리하고 부족 상태를 일반 완료와 다르게 처리했습니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 물리 스캐너와 한글 IME 입력이 충돌하는 문제

현장 PDA의 물리 스캐너는 바코드 문자와 완료 키를 입력 이벤트로 보냅니다. 웹의 `onChange`만 사용하면 한글 IME의 keyCode 229, `beforeinput`, paste, suffix가 중복 처리되거나 focus가 다른 control에 있을 때 scan을 놓칠 수 있었습니다.

### Solution 01 - Native bridge와 Web input stream 정규화

Android `dispatchKeyEvent`에서 문자를 모아 하나의 완성된 scan을 만든 뒤 WebView CustomEvent로 전달했습니다. Web에서는 keydown·beforeinput·paste를 하나의 input stream으로 정규화하고, 한글 IME/QWERTY 복원·prefix 검증·불완전 입력 경고·focus 재무장을 단계별로 적용했습니다. Native bridge가 장치 입력을 안정화하고, React 화면은 정규화된 scan만 처리하게 책임을 나눴습니다.

### Problem 02 - 응답 유실 후 재전송이 수량을 중복 반영할 수 있는 문제

WMS가 피킹 수량을 정상 반영한 뒤 네트워크 문제로 응답만 유실될 수 있습니다. PDA는 이를 실패로 판단하고 새 요청을 보내기 쉽지만, 서버에서는 같은 수량이 두 번 반영될 수 있었습니다. 즉, 재시도 가능성과 명령의 멱등성(idempotency)을 함께 보장해야 했습니다.

### Solution 02 - Idempotency key와 ordered outbox로 재전송 제어

첫 전송 전 `deviceId`, `clientEventId`, `expectedVersion`, payload를 IndexedDB outbox에 저장했습니다. `clientEventId`를 멱등성 키로 사용해 재연결 후에도 같은 명령을 순서대로 replay했고, WMS 응답(ACK)을 받기 전에는 outbox에서 삭제하지 않았습니다. 연결 실패에는 backoff를 적용하고 version conflict는 quarantine 상태로 분리해, 자동 재시도가 서버의 최신 상태를 덮어쓰지 않게 했습니다.

### Problem 03 - 부분 피킹 후 완료분과 미처리 수량의 출처가 사라지는 문제

작업자가 지정 수량의 일부만 피킹했을 때 기존 task의 `remaining`만 0으로 바꾸면, 얼마나 완료했고 얼마나 남았는지와 원래 allocation의 귀속을 추적하기 어렵습니다.

### Solution 03 - 완료분과 residual task 분리

별도 `np-wms-tmp` 기능 브랜치에서 source task에는 실제 완료분을 남기고, 미처리 수량은 residual task와 allocation으로 split했습니다. 일반 partial과 재고 부족(shortage)은 서로 다른 후속 상태로 분리했습니다. 다만 이 서버 작업은 `np-wms-picking` main 배포 기능으로 포함하지 않습니다.

### Problem 04 - 외부 WMS 상태와 PDA 단계의 의미 차이

외부 WMS는 claim·location·product·quantity·complete로 작업 상태를 표현했지만, 기존 PDA 화면은 작업자가 보는 단계 중심이었습니다. 두 상태 모델이 일대일로 맞지 않아 어떤 응답을 다음 화면으로 연결할지 명시적인 변환 규칙이 필요했습니다.

### Solution 04 - 소비 경계의 상태 mapping

WMS 응답을 PDA 작업 단계로 mapping하고, 진행할 수 없는 `BLOCKED`, 나중에 처리할 `DEFERRED`, 버전이 어긋난 `conflict`를 별도 UI 상태로 표시했습니다. 배정·버전·완료 여부는 WMS 응답을 권위 값(source of truth)으로 두고, PDA는 아직 전송하지 못한 명령과 화면용 로컬 상태만 관리하게 책임을 분리했습니다.

## 연관 개발과 반영 단계

- **WMS 기능 브랜치:** React PDA·관리자 설정과 Kotlin/Spring 모바일 명령 서비스에서 작업자·장비 호환 정책, assignment version, 부분 피킹, 팔레트 복구, 출력 요청 상태를 다뤘습니다. 여러 `dev-v*`·`fix/*` 브랜치에 코드·테스트가 있지만 최신 기능의 main 병합과 현장 설치 버전은 확인되지 않았습니다.
- **독립 Picking 실행 Pilot:** WMS의 계획·최종 상태와 Picking의 Work Grant·Journal·Commit 소유권을 분리하고 React PDA·IndexedDB와 Kotlin/Spring API를 로컬에서 검증했습니다. 별도 저장소에 원격이 없고 일부 후속 로더 기능은 미커밋이므로 운영 시스템으로 소개하지 않습니다.
- **실기기·출력 확인:** 라벨 템플릿은 로컬 DB와 프린터로 일부 검증했지만, 같은 QR 연속 2회 출력·장시간 오프라인·전체 장비 조합은 확인되지 않았습니다.

## 선택한 해결 방법

- 한 화면에 모든 정보를 넣기보다 단계마다 목표 값과 다음 행동을 고정했습니다.
- native는 물리 입력을 안정된 event 계약으로 바꾸고, 업무 validation과 상태 전이는 React·server에 남겼습니다.
- IndexedDB transaction에 명령과 화면 projection을 함께 저장해 앱 재시작 때 torn state를 줄였습니다.
- 네트워크 전달은 at-least-once로 보고 같은 event ID를 재사용해 업무 효과를 멱등 처리하도록 설계했습니다.

## 고려한 대안과 Trade-offs

- online-only는 단순하지만 현장 네트워크 단절 동안 작업을 멈춰야 합니다. local-first outbox는 복구가 가능하지만 상태와 충돌 UX가 복잡해집니다.
- 모든 스캐너를 keyboard wedge 설정에 맞출 수 있지만 장비·IME 차이를 UI가 떠안습니다. native bridge는 안정적이지만 Android 런타임 의존성이 생깁니다.
- conflict를 항상 자동 rebase하면 작업은 빨리 이어지지만 수량과 소유권이 왜곡될 수 있어, 권위가 불명확한 경우는 차단을 선택했습니다.

## 회고

현장 프론트엔드의 성공은 버튼 클릭이 아니라 물리 입력, 로컬 영속, 서버 수락, 외부 시스템 반영이 서로 어긋나지 않는 데 있습니다. 모든 단계를 하나의 `success`로 뭉개지 않고, 사용자가 다음 행동을 판단할 수 있도록 실패 의미를 UI와 계약에 함께 담는 것이 핵심이었습니다.
