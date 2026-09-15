---
title: 'NP-OIS'
slug: 'np-ois'
period: '2026.05 - 2026.07'
team: '팀 프로젝트 / 익명 물류 운영사'
role: 'Frontend 중심 / Backend workflow·정합성 영역 기여'
description: '기존 Excel/VBA 주문 처리 MVP를 실행 기준을 추적하고 검수·복구할 수 있는 8단계 운영 workflow로 확장한 프로젝트'
problem: '장시간 Excel 변환이 실패하면 실행 이력이 사라질 수 있고, 변환 도중 기준정보가 바뀌면 어떤 기준으로 산출물이 만들어졌는지 설명하기 어려웠습니다.'
contribution: '기존 MVP 위에서 upload·queue/progress·review·archive 화면을 연결하고, Backend의 snapshot lock·transaction 분리·Object Storage·조회 성능 영역에 직접 기여했습니다.'
implementation: 'queue/run은 활성 시 1초, 세부 progress는 처리 중 350ms만 polling하고 상태 전이에 맞춰 cache를 갱신했습니다. Backend에서는 run 시점 snapshot id/version/hash를 고정하고 긴 storage I/O·POI parsing을 핵심 DB transaction 밖으로 분리했습니다.'
decision: '실행 기준은 snapshot으로 잠그고 실패 상태는 별도 transaction에 남겼으며, 파일 payload는 storage에 두고 DB에는 hash/key/size metadata를 저장했습니다.'
evidence: '2026-08-18 테스트 산출물에서 59 tests, 실패 0, 1 skip을 확인했으며 최신 재실행은 Gradle 환경 문제로 테스트 시작 전에 중단됐습니다. Frontend production build는 큰 chunk warning과 함께 성공했습니다.'
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

외부 주문 workbook을 업로드하고 변환 기준을 고정한 뒤 검수·보정과 목적별 산출물 보관까지 이어가는 물류 운영 웹 애플리케이션입니다.

## 해결한 업무 문제

- Excel/VBA 처리만으로는 원본, 사용 기준정보, 변환 run과 산출물의 관계를 추적하기 어려웠습니다.
- 긴 storage I/O와 POI parsing이 하나의 DB transaction에 묶이면 connection을 오래 점유하고 실패 이력도 rollback될 수 있었습니다.
- 기준정보가 계속 동기화되는 동안 `latest`만 조회하면 같은 run 안에서 판단 기준이 달라질 수 있었습니다.
- 대형 파일 payload를 DB LOB에 보관하고 전체 ZIP을 메모리에서 만들면 저장·다운로드 경계가 무거워졌습니다.

## 대상 사용자와 사용 흐름

물류 운영자는 원본을 업로드하고 workbook 양식과 preview를 확인합니다. 변환을 queue에 등록하면 서버가 그 시점의 master snapshot을 고정해 변환하고, 운영자는 오류·누락 기준정보를 검수·보정·재검증합니다. 이후 목적별 XLSX를 생성해 archive에서 개별 또는 ZIP으로 다운로드합니다.

`업로드 → workbook preview → transform queue → snapshot lock → transform → review/revalidate → output → archive/download`

## 나의 역할

Frontend에서는 upload, queue/progress, review, output archive와 이력을 하나의 업무 흐름으로 연결하고 TanStack Query의 조건부 polling·cache invalidation을 구성했습니다. Backend에서는 snapshot lock, transform transaction 분리, projection·pagination, Object Storage metadata와 streaming download를 구현했습니다.

## 팀 기여와 개인 기여의 경계

초기 MVP는 다른 팀원이 먼저 구축했습니다. 개인 기여는 기존 기반을 인수한 뒤 운영 workflow, 데이터 정합성·재현성, storage와 성능 경계를 확장한 범위입니다. 시스템 전체를 혼자 처음부터 만들었다고 표현하지 않으며, 직접 WMS API 연동 완료나 VBA 100% 동일성도 주장하지 않습니다.

## 시스템 또는 데이터 흐름

React 업무 UI가 upload와 queue 요청을 보내고 TanStack Query가 활성 상태에서 queue/run/progress를 조건부 polling합니다. Spring API는 원본 metadata와 storage key를 DB에 남기고 persistent queue를 처리합니다. Transform run은 master snapshot id/version/hash를 잠근 뒤 storage에서 workbook을 읽어 POI로 parsing하고, 표준 line과 source trace를 저장합니다. Output payload는 local/Object Storage에, DB에는 hash/key/size와 업무 metadata를 보관합니다.

## 핵심 상태 머신

- Queue: `QUEUED → RUNNING → SUCCESS / FAILED`, cancel과 requeue 경로를 별도 제공.
- Transform run: `RUNNING → REVIEW_PENDING / COMPLETED` 또는 독립 failure transaction의 `FAILED`.
- Review: pending → correction/revalidate → complete, 필요하면 reopen.
- Transaction timeline: start TX → I/O·parsing outside TX → success TX 또는 failure TX.

## Frontend 상태 동기화와 검수 UX

| 화면 상태 | 동기화 조건 | 완료·실패 이후 처리 |
|---|---|---|
| Queue | 활성 queue가 있을 때 1초 polling | terminal 상태에서 polling 중단, queue·job query 갱신 |
| Transform run | 생성 중이거나 활성 run이 있을 때 1초 polling | 성공 run을 cache에 반영하고 review 문맥으로 연결 |
| Detailed progress | 실제 처리 중에만 350ms polling | stage·처리 행 수의 마지막 상태를 유지하고 polling 중단 |
| Output | review 완료와 산출물 mutation 이후 갱신 | pending/completed 목록을 invalidate하고 최근 run 문맥 유지 |

검수 화면에서는 원본 `source row`와 변환된 `standard line`을 같은 run 문맥에서 비교하고, 누락 기준정보 수정·manual mapping·재검증·review reopen을 이어서 수행할 수 있게 했습니다. 요청별 loading state와 마지막 성공 run을 분리해 긴 작업이 진행 중이어도 사용자가 현재 단계와 다음 행동을 판단하도록 구성했습니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 변환 도중 바뀌는 기준정보

source별 최신 기준정보를 매 lookup마다 조회하면 긴 run 안에서 서로 다른 snapshot이 섞이거나 같은 파일을 재처리했을 때 결과가 달라질 수 있었습니다.

### Solution 01 - Run 시점의 snapshot lock

run 시작 transaction에서 source별 snapshot id/version/hash를 관계 row로 저장하고 이후 lookup을 locked snapshot ID로 제한했습니다. 이 결정은 master data 범위의 추적성을 높이지만 manual mapping과 mutable config까지 완전히 잠그지는 않습니다.

### Problem 02 - 긴 I/O와 실패 이력의 transaction 결합

원본 파일 읽기와 POI parsing을 run 생성·상태 변경과 같은 transaction에 두면 장시간 DB 자원을 점유하고 예외 때 run row도 사라질 수 있었습니다.

### Solution 02 - 시작·연산·완료/실패 transaction 분리

짧은 start TX에서 run과 snapshot을 commit하고 storage I/O·parsing·mapping은 transaction 밖에서 수행했습니다. 성공 저장과 실패 상태는 각각 별도 write transaction으로 처리해 rollback과 실패 이력을 분리했습니다.

### Problem 03 - 기준정보 목록의 N+1·전체 로딩 후보

source별 최신 snapshot과 큰 raw CSV를 entity graph로 읽거나 누락 line을 메모리에서 집계하면 데이터가 늘수록 목록 비용이 커집니다.

### Solution 03 - Projection과 DB pagination

source/run ID 집합의 summary projection을 batch 조회하고 normalized row table과 native aggregate pagination을 사용했습니다. 다만 work history와 일부 review/output 경로에는 전체 로딩이 남아 있습니다.

### Problem 04 - 파일 payload와 업무 metadata의 결합

XLSX를 DB LOB에 저장하고 다운로드 때 한 번에 읽으면 DB와 응답 메모리 부담이 함께 커집니다.

### Solution 04 - Storage metadata와 streaming download

local/Object Storage 아래에 payload를 저장하고 DB에는 storage type/key, SHA-256, size와 supersede 관계를 남겼습니다. 개별 파일과 ZIP은 stream으로 응답하고 DB 저장 실패 시 신규 object를 보상 삭제합니다.

### Problem 05 - 제한 없는 workbook preview

업로드 직후 workbook 전체를 미리보기 위해 읽으면 비정상적으로 큰 파일·행·열·문자열이 서버 자원과 화면 응답을 함께 점유할 수 있었습니다.

### Solution 05 - Parsing과 UI에 같은 방어 한도 적용

파일 30MB, scan 10,000 rows, preview 8 rows·80 columns, data 160 columns, cell 220 characters 등의 상한을 두고 한도 초과를 명시적인 오류로 반환했습니다. 이 수치는 운영 최대 처리량이 아니라 preview 경로의 자원 방어 기준입니다.

## 선택한 해결 방법

- 활성 queue와 run에만 polling을 켜고 상태 전이 때 관련 Query를 invalidate해 긴 작업과 화면 cache를 연결했습니다.
- 변환 기준을 `latest`가 아니라 run에 고정된 snapshot으로 조회해 감사 가능한 실행 단위를 만들었습니다.
- DB transaction은 상태·업무 데이터 commit에 집중시키고 긴 파일 I/O·parsing을 분리했습니다.
- 입력 workbook은 Apache POI로 해석하고, 출력 계약은 custom OOXML writer와 부분적인 VBA compatibility test로 고정했습니다.

## 고려한 대안과 Trade-offs

- message broker나 SSE/WebSocket 대신 DB queue와 polling을 선택해 운영 구성을 단순화했지만, progress는 process memory이고 multi-instance lease가 부족합니다.
- DB LOB는 일관성이 단순하지만 데이터베이스가 파일 저장소 역할까지 맡습니다. Object Storage 분리는 download 경계를 가볍게 하지만 object와 DB 사이 보상·대사가 필요합니다.
- custom OOXML writer는 sheet contract를 통제하기 쉽지만 style·formula 표현이 제한되고 생성 중 전체 XML/ZIP ByteArray가 메모리에 남습니다.
- snapshot lock은 master data 재현성을 높이지만 manual mapping과 mutable output config까지 포함한 완전한 실행 snapshot은 아닙니다.

## Excel/VBA 호환성 검증 범위

| 업무 계약 | 현재 근거 | 아직 확인하지 못한 범위 |
|---|---|---|
| 주문·상품 식별자를 text로 유지 | parsing·출력 helper test | 모든 실고객 workbook 변형 |
| 중복 key의 source row 순 첫 매칭 | synthetic fixture 기반 test | 운영 기준정보 전체 조합 |
| RoundUp, EA/BOX와 label·scan 분리 규칙 | 주요 sheet/header/수량 규칙 test | 실제 VBA 결과와 cell-by-cell 전수 비교 |
| sheet 이름·header·row 순서 | VBA 지향 compatibility test | style·formula·print area·macro 결과 |

따라서 이 프로젝트는 VBA의 주요 업무 계약을 서버 코드와 test로 옮긴 사례이며, VBA와 100% 동일한 결과를 검증했다고 표현하지 않습니다.

## 검증 방법과 결과

- 2026-08-18 Backend 테스트 산출물에서 `59 tests`, 실패 `0`, `1 skip`을 확인했습니다.
- 최신 Backend 재실행은 Gradle 환경 문제로 테스트 시작 전에 중단됐습니다. 코드 테스트 실패로 판정하지도, 현재 59 tests 통과로 표현하지도 않습니다.
- Frontend production build는 성공했고 JavaScript `966.51kB`의 큰 chunk warning이 남았습니다.
- VBA 관련 테스트는 주요 sheet/header/분리 규칙의 synthetic fixture를 검증합니다. 실제 승인 workbook의 모든 cell·formula·style을 비교하는 golden E2E는 아닙니다.

## 현재 한계와 다음 개선

- stale transform run lease, multi-instance atomic claim과 durable progress가 필요합니다.
- manual mapping과 설정 version까지 포함하는 immutable execution snapshot을 설계해야 합니다.
- XLSX 생성 시 전체 ByteArray가 남아 있어 writer 자체의 streaming 또는 메모리 상한 검증이 필요합니다.
- 실제 VBA 결과와 승인 fixture를 cell-level로 비교하고, work history의 전체 로딩과 schema migration drift를 개선해야 합니다.
- 직접 WMS API client는 확인되지 않았으며 운영 처리량·업무 시간 단축률·오류 감소율도 측정되지 않았습니다.

## 회고

기존 운영 도구를 웹으로 옮길 때 중요한 것은 화면을 늘리는 일이 아니라 실행 기준, 실패 이력, 파일과 DB의 책임을 추적 가능하게 만드는 일이었습니다. 해결한 범위와 남은 재현성·메모리·queue 한계를 함께 보여주는 편이 실제 운영 프론트엔드 경험을 더 정확히 설명합니다.
