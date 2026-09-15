---
title: 'NP WMS Picking'
slug: 'np-wms-picking'
period: '2026.06 - 2026.08'
team: '팀 프로젝트 / 익명 물류 운영사'
role: 'Frontend 중심 / Full-stack 협업'
description: 'PDA의 물리 스캔과 오프라인 작업을 서버·외부 WMS 상태에 연결한 현장 피킹 시스템'
problem: '640×480급 PDA에서 물리 스캐너 입력, 부분 피킹과 네트워크 단절을 처리하면서 로컬 작업과 서버·외부 WMS 상태를 구분해야 했습니다.'
contribution: '개인 기여는 Mobile FE의 단계 UI, scanner 정규화, offline outbox, WMS 상태 소비와 연결에 집중했고 Backend의 부분 피킹 흐름을 보강했습니다.'
implementation: 'Android dispatchKeyEvent를 WebView CustomEvent로 전달하고 IndexedDB work package·journal·command outbox에 stable clientEventId와 expectedVersion을 보존했습니다.'
decision: '로컬 저장과 서버 수락을 다른 상태로 표현하고 재연결 시 같은 명령을 순차 replay하며, version conflict는 자동 덮어쓰기 대신 차단했습니다.'
evidence: '원자료에 기록된 Mobile FE 55 tests와 Backend 224 tests를 검증 근거로 사용하며 실제 처리량·시간 단축률·오스캔 감소율은 주장하지 않습니다.'
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

창고 현장 작업자는 배정된 작업을 열고 로케이션 → 상품 → 수량 → 분류 순서로 스캔합니다. 연결이 끊기면 허용된 명령을 로컬에 저장하고, 재연결 시 순차 replay합니다. 부분 피킹은 완료분과 residual task로 나뉘며 외부 WMS의 최종 상태를 확인한 뒤 다음 단계로 이동합니다.

## 나의 역할

Frontend를 중심으로 PDA 단계 UI, scanner 입력 정규화, focus·IME 복구, barcode validation, IndexedDB outbox와 WMS 응답 상태 연결을 담당했습니다. Kotlin/Spring 영역에서는 부분 피킹과 완료 routing을 보강해 프론트엔드가 소비하는 상태 의미를 맞췄습니다.

## 팀 기여와 개인 기여의 경계

- **개인 기여 중심**: Mobile FE, scanner 입력, 단계별 validation, offline outbox, WMS 상태 소비와 화면 연결.
- **팀·기존 기반**: WMS backend import 멱등성, event outbox 전체, Android WebView shell의 초기 기반과 공동 파일.
- **범위 구분**: 현행 mainline, Android bridge 이관이 남은 기능 브랜치, 더 엄격한 ownership·inbox/outbox를 실험한 local pilot을 하나의 운영 완료 기능으로 합치지 않습니다.

## 시스템 또는 데이터 흐름

물리 Scanner → Android `dispatchKeyEvent` → WebView CustomEvent → React barcode normalization → IndexedDB work package/journal/outbox → Picking server → 외부 WMS 순서입니다. PDA의 로컬 사본은 미확정 상태이고, Picking server가 수락한 실행 사실과 외부 WMS의 최종 상태도 별도로 표시합니다.

## 핵심 상태 머신

- 화면 단계: `LOCATION → ITEM → QUANTITY → SORT → DONE`
- 오프라인 명령: `LOCAL_PENDING → REPLAYING → SERVER_ACCEPTED → LOCAL_ACKED`
- 충돌: `expectedVersion` 또는 idempotency conflict가 발생하면 자동 덮어쓰지 않고 차단 상태로 이동합니다.
- 부분 피킹: source 완료 + residual `ACTIVE`, 부족 residual은 관리자 판단이 필요한 상태로 분리합니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 물리 스캐너와 한글 IME가 같은 input을 흔드는 문제

일반 `onChange`만 사용하면 keyCode 229, `beforeinput`, paste와 suffix 입력이 중복되고 focus가 다른 control로 이동했을 때 scan을 놓칠 수 있었습니다.

### Solution 01 - Native bridge와 Web 입력 정규화

Android `dispatchKeyEvent`에서 완성된 scan을 WebView CustomEvent로 전달하고, Web에서는 keydown·beforeinput·paste를 하나의 stream으로 정규화했습니다. 한글 IME/QWERTY 복원, prefix·형식 검증, 불완전 입력 경고와 focus 재무장을 단계별로 적용했습니다.

### Problem 02 - 응답 유실 뒤 재전송의 중복 반영

서버가 업무 효과를 적용한 뒤 응답만 사라지면 사용자는 실패로 보고 다시 시도하지만 새 request는 같은 수량을 두 번 반영할 수 있습니다.

### Solution 02 - Stable ID와 ordered outbox

첫 요청 전 `deviceId`, `clientEventId`, `expectedVersion`과 payload를 IndexedDB에 저장하고 같은 ID로 순차 replay했습니다. ACK 전 outbox를 지우지 않고 연결 실패에는 backoff를 적용했으며 version conflict는 quarantine했습니다.

### Problem 03 - 부분 피킹에서 남은 수량의 출처 유실

기존 task의 remaining 수량만 0으로 만들면 실제 완료분과 미처리분, allocation 귀속을 추적하기 어렵습니다.

### Solution 03 - 완료분과 residual task 분리

source task에는 완료 수량을 확정하고 residual task와 allocation split을 같은 transaction에서 생성했습니다. 일반 partial과 shortage를 다른 후속 상태로 두어 부족 수량이 정상 완료로 사라지지 않게 했습니다.

### Problem 04 - 외부 WMS 상태와 PDA 단계의 의미 차이

외부 WMS의 claim·location·product·quantity·complete 응답과 version이 기존 PDA 화면 단계와 일대일로 맞지 않았습니다.

### Solution 04 - 소비 경계의 상태 mapping

WMS 응답을 PDA state machine에 mapping하고 BLOCKED·DEFERRED·conflict를 별도 UI 상태로 노출했습니다. WMS의 계획·마스터·최종 상태는 권위 값으로 두고 PDA는 실행 명령과 로컬 projection만 소유하게 했습니다.

## 선택한 해결 방법

- 한 화면에 모든 정보를 넣기보다 단계마다 목표 값과 다음 행동을 고정했습니다.
- native는 물리 입력을 안정된 event 계약으로 바꾸고, 업무 validation과 상태 전이는 React·server에 남겼습니다.
- IndexedDB transaction에 명령과 화면 projection을 함께 저장해 앱 재시작 때 torn state를 줄였습니다.
- 네트워크 전달은 at-least-once로 보고 같은 event ID를 재사용해 업무 효과를 멱등 처리하도록 설계했습니다.

## 고려한 대안과 Trade-offs

- online-only는 단순하지만 현장 네트워크 단절 동안 작업을 멈춰야 합니다. local-first outbox는 복구가 가능하지만 상태와 충돌 UX가 복잡해집니다.
- 모든 스캐너를 keyboard wedge 설정에 맞출 수 있지만 장비·IME 차이를 UI가 떠안습니다. native bridge는 안정적이지만 Android 런타임 의존성이 생깁니다.
- conflict를 항상 자동 rebase하면 작업은 빨리 이어지지만 수량과 소유권이 왜곡될 수 있어, 권위가 불명확한 경우는 차단을 선택했습니다.

## 검증 방법과 결과

- 원자료에 기록된 Mobile FE `55 tests`와 Backend `224 tests`를 이 Case Study의 검증 근거로 사용합니다.
- scanner·offline·부분 피킹·상태 mapping은 unit/contract 시나리오로 확인했습니다.
- commit 수는 개인 기여 범위를 추적하는 보조 근거일 뿐 사용자 성과나 코드 기여율로 노출하지 않습니다.
- 실제 처리량, 작업 시간 단축률, 오스캔 감소율은 확인되지 않아 작성하지 않았습니다.

## 현재 한계와 다음 개선

- 실물 PDA의 장시간 사용, 실제 scanner suffix·한글 키보드 조합, 장시간 오프라인 replay를 추가 검증해야 합니다.
- Bluetooth printer와 외부 WMS 장애를 포함한 end-to-end smoke가 필요합니다.
- 현행 구현과 feature branch·local pilot의 상태 머신이 완전히 같지 않아 공개 화면에는 범위 badge가 필요합니다.
- offline conflict와 수동 대사 시간을 관측할 수 있는 event ledger를 다음 측정 기준으로 삼아야 합니다.

## 회고

현장 프론트엔드의 성공은 버튼 클릭이 아니라 물리 입력, 로컬 영속, 서버 수락, 외부 시스템 반영이 서로 어긋나지 않는 데 있습니다. 모든 단계를 하나의 `success`로 뭉개지 않고, 사용자가 다음 행동을 판단할 수 있도록 실패 의미를 UI와 계약에 함께 담는 것이 핵심이었습니다.
