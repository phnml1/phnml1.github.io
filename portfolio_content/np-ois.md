---
title: 'NP-OIS'
slug: 'np-ois'
period: '2026.05 - 2026.07'
team: '팀 프로젝트 / 익명 물류 운영사'
role: 'Frontend 중심 / 변환 기준·실패 기록·파일 저장 방식 개선'
description: '물류 운영자가 주문 Excel 파일을 업로드하고, 변환 결과를 검수·수정한 뒤 업무용 파일로 내려받는 웹 도구입니다.'
audience: '주문 파일을 처리하고 검수하는 물류 운영자'
problem: '처리 중에 상품·주문 기준이 바뀌거나 변환이 실패하면, 결과가 어떤 원본과 기준으로 만들어졌는지 알기 어려웠습니다.'
contribution: '기존 MVP를 인수해 업로드부터 변환, 검수, 다운로드까지 한 흐름으로 연결했습니다. 변환에 쓴 기준과 실패 이유가 남도록 서버 처리 방식도 개선했습니다.'
userFlow:
  - '주문 Excel 업로드'
  - '양식 확인·변환 요청'
  - '오류 검수·보정'
  - '산출물 생성·보관'
implementation: 'Frontend는 활성 queue·run에만 조건부 polling을 적용하고, 상태가 바뀌면 관련 Query cache를 갱신했습니다. Backend는 transform run 시작 시 snapshot id·version·hash를 고정하고, 시간이 오래 걸리는 Storage I/O·POI parsing을 DB transaction에서 분리했습니다.'
decision: '변환 도중 기준정보가 바뀌어도 결과의 근거를 추적하기 위해 변환 시작 시점의 기준정보 snapshot을 고정했습니다. 진행 중에만 polling한 이유는 [입력 필요]입니다.'
result: '업로드 → 변환 → 검수 → 다운로드를 한 화면 흐름으로 연결했습니다. 운영 효과는 [입력 필요]입니다.'
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

## 프로젝트 한 줄 설명

주문 Excel을 업로드하면 회사의 처리 기준에 맞게 변환해 주고, 운영자가 결과를 검수·수정·다운로드할 수 있게 한 물류 업무 도구입니다.

## 해결한 업무 문제

- 처리 중에 상품·주문 기준이 바뀌면, 파일 앞부분과 뒷부분이 서로 다른 기준으로 변환될 수 있었습니다.
- 파일을 읽는 데 오래 걸리다 오류가 나면, 실패했다는 기록까지 사라져 원인을 찾기 어려웠습니다.
- 누락된 주문과 상품 정보가 많아질수록 검수 목록을 불러오는 비용이 커졌습니다.
- Excel과 ZIP 파일을 DB에 직접 쌓으면 저장과 다운로드 모두 DB에 큰 부담을 주게 됩니다.

## 대상 사용자와 사용 흐름

물류 운영자는 주문 파일을 업로드하고 양식과 미리보기를 확인합니다. 변환을 시작하면 서버는 그 시점의 상품·주문 기준을 기록하고 끝까지 같은 기준을 사용합니다. 운영자는 누락·오류를 수정하고 다시 확인한 뒤, 목적별 Excel 또는 ZIP 파일을 다운로드합니다.

`업로드 → workbook preview → transform queue → snapshot lock → transform → review/revalidate → output → archive/download`

## 나의 역할

프론트엔드에서는 업로드, 진행 상태, 검수, 결과 보관 화면을 하나의 업무 흐름으로 연결했습니다. 서버에서는 변환에 사용한 기준이 바뀌지 않게 기록하고, 오래 걸리는 파일 처리와 상태 저장을 분리했습니다. 파일은 별도 저장소에 두고 다운로드할 때 필요한 부분만 순서대로 전달하게 했습니다.

## 팀 기여와 개인 기여의 경계

초기 MVP는 다른 팀원이 먼저 구축했습니다. 개인 기여는 기존 기반을 인수한 뒤 운영 workflow, 데이터 정합성·재현성, storage와 성능 경계를 확장한 범위입니다. 시스템 전체를 혼자 처음부터 만들었다고 표현하지 않으며, 직접 WMS API 연동 완료나 VBA 100% 동일성도 주장하지 않습니다.

## 추가로 확인된 직접 구현 범위

- 한 파일에 집중돼 있던 React SPA를 공통 컴포넌트·업무 페이지·타입으로 나누고, 원본 등록부터 queue·검수·산출물까지 이동하는 화면 흐름을 확장했습니다.
- 여러 원본 파일을 배치로 등록해 storage metadata와 DB 관계를 연결하고, 같은 배치의 활성 변환을 중복 실행하지 않도록 서버 guard와 테스트를 추가했습니다.
- 검수 화면에서 원본 행·표준 주문·제외 행을 구분하고, 누락 매핑 보정·재검증·검수 재개를 연결했습니다.
- 상세 패널 query dedupe, route lazy loading과 행 렌더링 최적화는 별도 프론트 성능 기능 브랜치의 코드입니다. 이 변경을 현재 운영 버전의 개선 수치로 표현하지 않습니다.

## 시스템 또는 데이터 흐름

React 업무 UI가 upload와 queue 요청을 보내고 TanStack Query가 활성 상태에서 queue/run/progress를 조건부 polling합니다. Spring API는 원본 metadata와 storage key를 DB에 남기고 persistent queue를 처리합니다. Transform run은 master snapshot id/version/hash를 잠근 뒤 storage에서 workbook을 읽어 POI로 parsing하고, 표준 line과 source trace를 저장합니다. Output payload는 local/Object Storage에, DB에는 hash/key/size와 업무 metadata를 보관합니다.

## 핵심 상태 머신

- Queue: `QUEUED → RUNNING → SUCCESS / FAILED`, cancel과 requeue 경로를 별도 제공.
- Transform run: `RUNNING → REVIEW_PENDING / COMPLETED` 또는 독립 failure transaction의 `FAILED`.
- Review: pending → correction/revalidate → complete, 필요하면 reopen.
- Transaction timeline: start TX → I/O·parsing outside TX → success TX 또는 failure TX.

## Frontend 상태 동기화와 검수 UX

| 화면 상태         | 동기화 조건                                  | 완료·실패 이후 처리                                        |
| ----------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Queue             | 활성 queue가 있을 때 1초 polling             | terminal 상태에서 polling 중단, queue·job query 갱신       |
| Transform run     | 생성 중이거나 활성 run이 있을 때 1초 polling | 성공 run을 cache에 반영하고 review 문맥으로 연결           |
| Detailed progress | 실제 처리 중에만 350ms polling               | stage·처리 행 수의 마지막 상태를 유지하고 polling 중단     |
| Output            | review 완료와 산출물 mutation 이후 갱신      | pending/completed 목록을 invalidate하고 최근 run 문맥 유지 |

검수 화면에서는 원본 `source row`와 변환된 `standard line`을 같은 run 문맥에서 비교하고, 누락 기준정보 수정·manual mapping·재검증·review reopen을 이어서 수행할 수 있게 했습니다. 요청별 loading state와 마지막 성공 run을 분리해 긴 작업이 진행 중이어도 사용자가 현재 단계와 다음 행동을 판단하도록 구성했습니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 같은 파일인데 변환 기준이 중간에 바뀔 수 있음

주문 변환은 상품, 판매처, 수량 단위 같은 기준정보를 계속 참조합니다. 각 행을 처리할 때마다 최신값(`latest`)을 조회하면, 처리 중 기준이 수정된 순간부터 파일 앞·뒷부분에 서로 다른 기준이 적용될 수 있었습니다. 같은 원본을 재실행해도 결과가 달라져 오류 원인을 추적하기 어려운 구조였습니다.

### Solution 01 - Run-scoped snapshot으로 기준정보 고정

변환 작업(run)을 시작할 때 source별 snapshot id·version·hash를 저장하고, 이후 모든 조회를 고정된 snapshot ID로 제한했습니다. snapshot은 '이 작업이 시작할 때 사용한 기준 버전'을 의미합니다. 이로써 처리 중 최신 기준이 바뀌어도 하나의 run은 동일한 기준을 유지하고, 결과와 사용 기준을 함께 추적할 수 있습니다.

### Problem 02 - 파일 변환에 실패하면 실패 기록도 사라짐

원본 Excel을 Storage에서 읽고 Apache POI로 parsing하는 작업은 시간이 오래 걸립니다. 이 과정을 run 생성·상태 변경과 하나의 DB transaction으로 묶으면 connection을 오래 점유하게 됩니다. 예외가 발생해 transaction 전체가 rollback되면 '실패함'이라는 run 기록까지 사라져, 운영자가 원인을 확인하지 못할 수 있었습니다.

### Solution 02 - 시작·연산·완료/실패 transaction 분리

짧은 start transaction에서 run과 snapshot을 먼저 commit한 뒤, 긴 Storage I/O·parsing·mapping은 transaction 밖에서 수행했습니다. 처리가 끝나면 성공 데이터를, 오류가 나면 실패 상태와 원인을 각각 별도 transaction으로 저장했습니다. 이렇게 transaction 경계를 나눠 DB 점유 시간을 줄이고, 파일 처리가 실패해도 추적할 run 이력은 보존했습니다.

### Problem 03 - 검수 목록이 데이터가 쌓일수록 느려짐

운영자가 필요한 것은 '어느 작업에 누락이 몇 개 있는지'와 같은 요약 정보입니다. 하지만 목록을 열 때마다 원본 데이터 전체를 불러와 개수를 계산하면 데이터가 쌓일수록 화면 응답이 느려집니다.

### Solution 03 - Summary projection과 DB pagination 적용

목록에 필요한 상태·누락 개수만 summary projection으로 모아 batch 조회했습니다. 원본 행 같은 상세 데이터는 사용자가 해당 run을 열었을 때만 불러오고, 누락 항목은 DB aggregate pagination으로 페이지 단위로 나눴습니다. 필요한 컬럼만 한번에 조회해 목록 비용을 줄였지만, 일부 이력·검수 경로에는 전체 로딩이 남아 있습니다.

### Problem 04 - 파일을 DB에 쌓아 저장과 다운로드가 무거워짐

Excel 원본과 결과물은 크기가 크고 계속 쌓입니다. 파일 자체를 DB에 저장하고 다운로드할 때 한 번에 메모리로 읽으면, 검색을 담당해야 할 DB와 서버 메모리 모두 부담이 커집니다.

### Solution 04 - Object Storage와 streaming download로 책임 분리

실제 Excel·ZIP payload는 local/Object Storage에 저장하고, DB에는 storage key·size·SHA-256·업무 상태 같은 metadata만 남겼습니다. 개별 파일과 ZIP은 전체를 메모리에 올리지 않고 stream으로 응답했습니다. DB metadata 저장이 실패하면 방금 생성한 object를 보상 삭제해, 업무 기록 없이 파일만 남는 상태를 방지했습니다.

### Problem 05 - 큰 Excel 파일 미리보기가 서버를 오래 점유함

업로드 직후 파일 전체를 미리보기로 보여 주려면 서버가 모든 행과 열을 읽어야 합니다. 잘못 만든 파일에 수만 개의 행이나 지나치게 긴 문자열이 들어 있으면 서버 메모리와 화면 응답을 동시에 점유할 수 있었습니다.

### Solution 05 - Parsing과 UI에 동일한 resource guardrail 적용

파일 30MB, scan 10,000행, preview 8행·80열, cell 220자로 parsing 상한을 고정했습니다. Backend와 UI가 같은 제한을 사용하고, 한도를 넘는 파일은 무리하게 열지 않고 명시적인 validation error를 반환했습니다. 이 수치는 전체 변환 용량이 아니라, 업로드 직후 미리보기 경로의 메모리와 응답 시간을 보호하는 방어 기준입니다.

## 선택한 해결 방법

- 활성 queue·run에만 polling(주기 조회)을 켜고, 완료·실패 시 관련 Query cache를 갱신해 화면이 최신 상태를 보여 주도록 했습니다.
- 변환 기준을 `latest`로 매번 조회하지 않고 run-scoped snapshot으로 고정해, 각 결과가 어떤 기준으로 만들어졌는지 추적할 수 있게 했습니다.
- DB transaction은 상태·업무 데이터 저장에 집중시키고, 긴 파일 I/O·parsing을 분리해 connection 점유와 rollback 범위를 줄였습니다.
- 입력 workbook은 Apache POI로 해석하고, 출력 Excel은 custom OOXML writer와 부분적인 VBA compatibility test로 sheet·header·수량 규칙을 검증했습니다.

## 고려한 대안과 Trade-offs

- message broker나 SSE/WebSocket 대신 DB queue와 polling을 선택해 운영 구성을 단순화했지만, progress는 process memory이고 multi-instance lease가 부족합니다.
- DB LOB는 일관성이 단순하지만 데이터베이스가 파일 저장소 역할까지 맡습니다. Object Storage 분리는 download 경계를 가볍게 하지만 object와 DB 사이 보상·대사가 필요합니다.
- custom OOXML writer는 sheet contract를 통제하기 쉽지만 style·formula 표현이 제한되고 생성 중 전체 XML/ZIP ByteArray가 메모리에 남습니다.
- snapshot lock은 master data 재현성을 높이지만 manual mapping과 mutable output config까지 포함한 완전한 실행 snapshot은 아닙니다.

## 회고

기존 운영 도구를 웹으로 옮길 때 중요한 것은 화면을 늘리는 일이 아니라 실행 기준, 실패 이력, 파일과 DB의 책임을 추적 가능하게 만드는 일이었습니다. 해결한 범위와 남은 재현성·메모리·queue 한계를 함께 보여주는 편이 실제 운영 프론트엔드 경험을 더 정확히 설명합니다.
