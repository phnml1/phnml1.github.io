---
title: 'NP-OIS'
slug: 'np-ois'
period: '2026.05 - 2026.07'
team: '팀 프로젝트 / 익명 물류 운영사'
role: 'Frontend 직접 구현 / 서버 변환 기준·실패 기록 처리 기여'
description: '물류 운영자가 주문 Excel을 같은 기준으로 변환하고, 오류를 검수해 업무용 파일로 내려받는 웹 도구입니다.'
audience: '주문 파일을 처리하고 검수하는 물류 운영자'
problem: '처리 중에 상품·주문 기준이 바뀌거나 변환이 실패하면, 결과가 어떤 원본과 기준으로 만들어졌는지 알기 어려웠습니다.'
contribution: '기존 MVP를 인수해 Frontend의 진행 상태·검수·다운로드 흐름을 연결했습니다. 서버에서는 변환 기준 고정과 실패 이력 저장 방식을 다뤘습니다.'
userFlow:
  - '주문 Excel 업로드'
  - '양식 확인·변환 요청'
  - '오류 검수·보정'
  - '산출물 생성·보관'
implementation: 'Frontend는 활성 queue·run에만 조건부 polling을 적용하고, 상태가 바뀌면 관련 Query cache를 갱신했습니다. Backend는 transform run 시작 시 snapshot id·version·hash를 고정하고, 시간이 오래 걸리는 Storage I/O·POI parsing을 DB transaction에서 분리했습니다.'
decision: '변환 시작 시점의 기준정보 snapshot을 고정해, 처리 중 기준이 바뀌어도 결과에 사용한 기준을 추적할 수 있게 했습니다.'
result: '업로드 → 변환 → 검수 → 다운로드를 한 화면 흐름으로 연결했습니다. 주문서 양식마다 VBA를 작성·실행하던 변환 과정을 자동화해 반복 작업에 드는 시간을 줄였습니다.'
stack:
  [
    'React',
    'TypeScript',
    'Vite',
    'TanStack Query',
    'Kotlin',
    'Spring Boot',
    'JPA',
    'MySQL',
    'Apache POI',
    'Object Storage',
  ]
---

## 기여 범위와 협업 경계

### Frontend 직접 구현

- 기존 React SPA를 공통 컴포넌트·업무 페이지·타입으로 나누고, 파일 등록부터 검수·산출물까지 화면을 연결했습니다.
- 활성 queue·run에서만 진행 상태를 조회하고, 종료 시 polling을 멈춘 뒤 관련 Query cache를 갱신했습니다. 운영자는 완료 상태를 확인하고 해당 run의 검수로 이어갈 수 있습니다.
- 검수 화면에서 원본 행·표준 주문·제외 행을 비교하고, 누락 매핑 보정·재검증·검수 재개를 연결했습니다.

### 서버 직접 기여

- 변환 run의 기준정보 snapshot 고정, 여러 원본 파일의 배치 등록과 storage metadata 관계, 동일 배치의 중복 변환 방지 guard·테스트, 파일 저장·streaming download를 다뤘습니다.

### 팀·협업·기능 브랜치 경계

- 초기 MVP는 다른 팀원이 먼저 구축했습니다. 현업 담당자와 주문 파일별 양식 차이와 데이터 활용 방식을 확인한 뒤 기존 흐름을 확장했습니다.
- 긴 파일 I/O·parsing과 상태 저장 transaction의 분리는 원재료 감사 당시 서버 기능 브랜치의 로컬 커밋으로 확인됐습니다. 당시 기본 브랜치 병합과 운영 반영은 확인되지 않았습니다.
- 상세 패널 query dedupe, route lazy loading, 행 렌더링 최적화는 별도 Frontend 성능 브랜치의 코드입니다. 운영 버전의 개선 수치로 표현하지 않습니다.

## 시스템 또는 데이터 흐름

- React 화면에서 파일을 등록하고 변환을 요청합니다. 활성 작업의 queue/run/progress만 TanStack Query로 주기 조회합니다.
- Spring API는 원본 metadata와 storage key를 DB에 남기고 변환 요청을 queue에서 처리합니다.
- 변환 run은 시작 시 기준정보 snapshot id/version/hash를 고정한 뒤 파일을 읽고 표준 주문과 원본 행의 연결 정보를 저장합니다.
- Excel·ZIP 파일은 local/Object Storage에 보관하고 DB에는 저장 위치·hash·크기와 업무 상태를 남깁니다.

## 핵심 상태 머신

- Queue: `QUEUED → RUNNING → SUCCESS / FAILED`, cancel과 requeue 경로를 별도 제공.
- Transform run: `RUNNING → REVIEW_PENDING / COMPLETED` 또는 독립 failure transaction의 `FAILED`.
- Review: pending → correction/revalidate → complete, 필요하면 reopen.
- Transaction timeline: start TX → I/O·parsing outside TX → success TX 또는 failure TX.

## Frontend 상태 동기화와 검수 UX

- **대기열:** 활성 queue가 있을 때 1초 간격으로 조회합니다. 완료·실패하면 조회를 멈추고 queue·job cache를 갱신합니다.
- **변환 작업:** run 생성 중이거나 활성 run이 있을 때 1초 간격으로 조회합니다. 성공한 run을 cache에 반영해 검수 화면으로 이어갑니다.
- **세부 진행:** 실제 처리 중에만 350ms 간격으로 단계와 처리 행 수를 조회하고, 종료 시 마지막 상태를 남깁니다.
- **산출물:** 검수 완료와 산출물 생성 이후 목록을 갱신하고, 최근 run 문맥을 파일 보관 화면까지 유지합니다.

검수 화면에서는 원본 `source row`와 변환된 `standard line`을 같은 run 문맥에서 비교하고, 누락 기준정보 수정·manual mapping·재검증·review reopen을 이어서 수행할 수 있게 했습니다. 요청별 loading state와 마지막 성공 run을 분리해 긴 작업이 진행 중이어도 사용자가 현재 단계와 다음 행동을 판단하도록 구성했습니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 한 주문 파일에 서로 다른 변환 기준이 적용될 수 있음

주문 변환은 상품, 판매처, 수량 단위 같은 기준정보를 계속 참조합니다. 각 행을 처리할 때마다 최신값(`latest`)을 조회하면, 처리 중 기준이 수정된 순간부터 파일 앞·뒷부분에 서로 다른 기준이 적용될 수 있었습니다. 같은 원본을 재실행해도 결과가 달라져 오류 원인을 추적하기 어려운 구조였습니다.

### Solution 01 - Run-scoped snapshot으로 기준정보 고정

변환 작업(run)을 시작할 때 source별 snapshot id·version·hash를 저장하고, 이후 모든 조회를 고정된 snapshot ID로 제한했습니다. snapshot은 '이 작업이 시작할 때 사용한 기준 버전'을 의미합니다. 이로써 처리 중 최신 기준이 바뀌어도 하나의 run은 동일한 기준을 유지하고, 결과와 사용 기준을 함께 추적할 수 있습니다.

### Problem 02 - 파일 변환이 실패해도 원인 기록을 남겨야 함

원본 Excel을 Storage에서 읽고 Apache POI로 parsing하는 작업은 시간이 오래 걸립니다. 이 과정을 run 생성·상태 변경과 하나의 DB transaction으로 묶으면 connection을 오래 점유하게 됩니다. 예외가 발생해 transaction 전체가 rollback되면 '실패함'이라는 run 기록까지 사라져, 운영자가 원인을 확인하지 못할 수 있었습니다.

### Solution 02 - 시작·연산·완료/실패 transaction 분리

짧은 start transaction에서 run과 snapshot을 먼저 commit한 뒤, 긴 Storage I/O·parsing·mapping은 transaction 밖에서 수행했습니다. 처리가 끝나면 성공 데이터를, 오류가 나면 실패 상태와 원인을 각각 별도 transaction으로 저장했습니다. 이렇게 transaction 경계를 나눠 DB 점유 시간을 줄이고, 파일 처리가 실패해도 추적할 run 이력은 보존했습니다.

### Problem 03 - 검수 목록이 데이터가 쌓일수록 느려짐

운영자가 필요한 것은 '어느 작업에 누락이 몇 개 있는지'와 같은 요약 정보입니다. 하지만 목록을 열 때마다 원본 데이터 전체를 불러와 개수를 계산하면 데이터가 쌓일수록 화면 응답이 느려집니다.

### Solution 03 - Summary projection과 DB pagination 적용

목록에 필요한 상태·누락 개수만 summary projection으로 모아 batch 조회했습니다. 원본 행 같은 상세 데이터는 사용자가 해당 run을 열었을 때만 불러오고, 누락 항목은 DB aggregate pagination으로 페이지 단위로 나눴습니다.

### Problem 04 - 파일을 DB에 쌓아 저장과 다운로드가 무거워짐

Excel 원본과 결과물은 크기가 크고 계속 쌓입니다. 파일 자체를 DB에 저장하고 다운로드할 때 한 번에 메모리로 읽으면, 검색을 담당해야 할 DB와 서버 메모리 모두 부담이 커집니다.

### Solution 04 - Object Storage와 streaming download로 책임 분리

실제 Excel·ZIP payload는 local/Object Storage에 저장하고, DB에는 storage key·size·SHA-256·업무 상태 같은 metadata만 남겼습니다. 개별 파일과 ZIP은 전체를 메모리에 올리지 않고 stream으로 응답했습니다. DB metadata 저장이 실패하면 방금 생성한 object를 보상 삭제해, 업무 기록 없이 파일만 남는 상태를 방지했습니다.

### Problem 05 - 큰 Excel 파일 미리보기가 서버를 오래 점유함

업로드 직후 파일 전체를 미리보기로 보여 주려면 서버가 모든 행과 열을 읽어야 합니다. 잘못 만든 파일에 수만 개의 행이나 지나치게 긴 문자열이 들어 있으면 서버 메모리와 화면 응답을 동시에 점유할 수 있었습니다.

### Solution 05 - Parsing과 UI에 동일한 resource guardrail 적용

파일 30MB, scan 10,000행, preview 8행·80열, cell 220자로 parsing 상한을 고정했습니다. Backend와 UI가 같은 제한을 사용하고, 한도를 넘는 파일은 무리하게 열지 않고 명시적인 validation error를 반환했습니다. 이 수치는 전체 변환 용량이 아니라, 업로드 직후 미리보기 경로의 메모리와 응답 시간을 보호하는 방어 기준입니다.
