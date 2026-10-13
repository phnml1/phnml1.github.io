---
title: 'Cell Label Kiosk'
slug: 'np-cell-label-kiosk'
period: '2026.07'
team: '팀 프로젝트 / 물류 현장 시스템'
role: 'React 키오스크 Frontend · WCS/Local Agent 연동'
description: '현장 작업자가 셀 주문의 QR 라벨을 선택해 발행하거나 재출력하는 React 키오스크 화면입니다.'
audience: '로더 셀의 주문 라벨을 출력하는 현장 작업자'
problem: '라벨 데이터 발행, 현장 프린터 요청, 출력 결과 기록이 서로 다른 단계라 한 단계의 성공을 전체 출력 성공으로 오해하면 안 됐습니다.'
contribution: 'React 키오스크의 셀 조회와 단건 발행·재출력 화면을 만들고 WCS·Windows Local Agent 요청과 결과 기록을 연결했습니다.'
userFlow:
  - '작업 셀 선택'
  - '라벨 발행·재출력'
  - '현장 Agent에 출력 요청'
  - '결과 기록·상태 확인'
implementation: 'WCS가 반환한 `agentRequest`를 Windows Local Agent에 전달하고, Agent의 항목별 응답을 라벨 ID와 연결해 WCS print-result API에 기록했습니다. 기능 브랜치에서는 여러 셀의 라벨·Agent 요청을 batch로 묶고 항목별 결과를 다시 라벨에 mapping했습니다.'
decision: 'QR·라벨 payload의 source of truth는 WCS로 유지하고, Frontend는 셀 선택과 WCS → Local Agent → 결과 기록의 orchestration을 담당하게 했습니다. 라벨 발행, Agent 요청, 결과 기록을 별도 상태로 다뤄 한 단계의 성공을 전체 출력 성공으로 오해하지 않게 했습니다. Agent의 성공은 Windows spooler가 요청을 접수했다는 뜻이며, 실제 종이 배출 완료와는 구분했습니다.'
evidence: '키오스크 초기 구조와 단건 발행·재출력은 main 커밋에 있습니다. 배치 출력·종속 필터·설정 화면은 기능 브랜치에만 있으며, 자동화된 FE 테스트와 현장 프린터 E2E 결과는 확인되지 않았습니다.'
stack:
  - React
  - TypeScript
  - Vite
  - REST API
  - Kotlin
  - Spring Boot
  - C# / .NET
  - Windows Local Agent
---

## 프로젝트 한 줄 설명

작업자가 로더 셀을 고르고 주문 라벨을 발행·재출력할 때, WCS의 라벨 상태와 키오스크 PC의 출력 요청 결과를 연결하는 React 업무 화면입니다. 이름과 달리 일반 택배 송장보다 셀-주문 QR 라벨이 중심입니다.

## 해결한 업무 문제

- 라벨 발행, Local Agent 접수, WCS 결과 기록은 서로 다른 요청입니다. 한 단계의 실패를 전체 출력 성공으로 표시하면 재시도 판단이 어렵습니다.
- 같은 로더라도 날짜·작업 차수·서브차수가 다르면 셀과 주문이 달라집니다. 수동 식별자 입력만으로는 잘못된 셀을 선택할 수 있습니다.
- 복수 셀 출력에서 일부 WCS 발행만 실패한 경우와 프린터·Agent 전체가 준비되지 않은 경우는 다른 대응이 필요합니다.

## 나의 역할과 시스템 경계

**Frontend main:** React/TypeScript SPA, WCS·Agent API client, 셀 목록·상세, 단건 발행·재출력과 결과 기록을 직접 구현했습니다. WCS가 반환한 요청을 Agent에 전달하고, 실패가 WCS 발행·Agent 접수·결과 기록 중 어디에서 발생했는지 구분했습니다.

**Frontend 기능 브랜치:** 날짜 → 차수 → 서브차수 → 로더 → 셀 선택, 복수 셀 batch, 프린터 상태·설정·대기열 화면, 상품·수량 상세를 추가했습니다. 이 기능들의 `main` 병합과 설치본 반영은 확인되지 않았습니다.

**연계 백엔드:** 별도 WES/WCS 저장소에서 셀 주문 라벨 발행·재출력·스캔 API와 주문세트 동기화를 직접 구현했습니다. 기본 라벨 API는 해당 저장소의 `main`에 있지만 서브차수 필터는 기능 브랜치에만 있습니다. Windows Local Agent도 별도 저장소에서 직접 구성했으나, batch·대기열 제어는 그 저장소의 기능 브랜치 범위입니다. 저장소마다 반영 상태가 같다고 주장하지 않습니다.

## Technical Highlights · 대표 기술 문제

### Problem 01 - 라벨 발행·Agent 접수·결과 기록의 성공 경계가 다른 문제

출력은 하나의 API로 끝나지 않습니다. WCS가 라벨 ID를 발행해도 Local Agent나 프린터가 요청을 받지 못할 수 있고, Agent가 접수했더라도 결과를 WCS에 기록하는 요청은 실패할 수 있습니다. 중간 단계 하나를 '출력 성공'으로 표시하면 키오스크와 WCS의 상태가 어긋날 수 있었습니다.

### Solution 01 - 단계별 상태 분리와 print-result 보상 기록

Frontend가 WCS 발행·재출력 응답의 `agentRequest`를 Local Agent에 전달하고, Agent 응답과 오류 코드를 라벨별 print-result API에 보상 기록했습니다. 발행 실패, Agent 요청 실패, 결과 기록 실패를 서로 다른 상태와 안내로 표시하고, 처리 후에는 셀 목록·상세를 refetch해 WCS 상태와 재조정했습니다. Agent 성공은 Windows spooler 접수까지만 보장하므로 물리 인쇄 완료로 확대 해석하지 않았습니다.

### Problem 02 - Batch 출력의 부분 실패와 안전한 재시도 범위

여러 셀을 한번에 출력할 때는 성공과 실패가 항목별로 섞일 수 있습니다. 응답을 batch 전체의 성공·실패로만 표현하면 어느 라벨을 다시 요청해야 할지 알 수 없고, 응답 유실 후 전체를 재시도하면 이미 처리된 라벨이 중복 출력될 수 있습니다.

### Solution 02 - 기능 브랜치의 셀별 batch 결과

기능 브랜치에서 현재 면·전체·실패 셀 선택을 나누고, WCS 단건 발행으로 얻은 라벨 ID와 Agent 요청을 batch payload로 구성했습니다. Agent의 항목별 결과는 라벨 ID를 우선으로, ID가 없을 때는 요청 순서를 기준으로 mapping해 WCS에 기록했습니다. Agent가 batch route를 지원하지 않는 404·405일 때만 단건 순차 요청으로 fallback했습니다. timeout·5xx·응답 유실은 실제 처리 여부가 불명확해 자동 재시도 대상에서 제외했습니다.

### Problem 03 - 셀 조회 범위와 라벨 원본의 권위가 불명확한 문제

로더 ID만으로 셀을 조회하면 작업 날짜·차수·서브차수가 다른 주문이 섞일 수 있습니다. 또한 Frontend가 QR이나 라벨 payload를 임의로 조합하면 WCS의 주문·상품·수량 원본과 어긋나 잘못된 라벨을 출력할 수 있었습니다.

### Solution 03 - 기능 브랜치의 종속 필터와 서버 권위 데이터

기능 브랜치에서 날짜 → 차수 → 서브차수 → 로더의 dependent filter로 셀 범위를 단계적으로 좁혔습니다. 주문·상품·수량·QR·출력 payload는 WCS 응답을 source of truth로 사용하고, Frontend는 해당 관계를 선택·확인하는 책임만 담당했습니다. 다만 구현 당시 일부 신규 WCS endpoint가 404를 반환한 기록이 있어, Frontend 구현과 전체 연동 완료는 구분했습니다.

## 시스템 또는 데이터 흐름

작업자가 셀을 선택하면 WCS가 주문 정보를 기준으로 라벨 ID와 출력 요청을 만듭니다. React 키오스크는 이 요청을 Windows Local Agent에 전달하고, Agent가 반환한 접수·실패 결과를 다시 WCS에 기록합니다. 마지막에는 셀 목록과 상세를 다시 조회해 화면을 WCS의 최신 상태와 맞춥니다.

## 선택한 해결 방법

- QR과 라벨 내용은 Frontend에서 조합하지 않고 WCS 응답을 그대로 사용했습니다.
- 라벨 발행, Agent 요청, 결과 기록을 서로 다른 상태로 표시해 실패 지점을 구분했습니다.
- 여러 셀을 출력할 때는 라벨별 결과를 대응시켜 실패한 항목만 확인할 수 있게 구성했습니다.

## 고려한 대안과 Trade-offs

- Frontend에서 라벨 payload를 만들면 화면 개발은 단순해지지만 WCS의 주문 원본과 어긋날 수 있어 서버 응답을 기준으로 삼았습니다.
- 실패한 batch를 무조건 다시 보내면 이미 접수된 라벨이 중복 출력될 수 있어, 처리 여부가 불명확한 timeout과 응답 유실은 자동 재시도하지 않았습니다.
- Agent 성공은 Windows spooler 접수를 뜻하며 실제 용지 배출까지 보장하지는 않습니다.

## 검증과 남은 경계

- 초기 SPA와 단건 출력 연결은 해당 FE 저장소의 `main` 커밋에서 확인됩니다. 기능 브랜치의 batch·설정·종속 필터는 별도 범위입니다.
- FE 저장소에는 자동화된 unit·E2E 테스트 파일이 확인되지 않았습니다. 과거 typecheck·build·로컬 브라우저 점검 기록을 운영 검증으로 바꾸어 말하지 않습니다.
- WCS API, FE, Agent의 브랜치와 설치 버전이 일치하는지, timeout 뒤 중복 출력이 없는지, 실제 프린터가 종이를 배출했는지는 추가 확인이 필요합니다.

## 회고

이 화면의 핵심은 인쇄 버튼보다 책임 경계입니다. WCS가 어떤 셀의 라벨을 만들었는지, Agent가 어느 요청을 받았는지, WCS에 어떤 결과가 기록됐는지를 분리해야 현장에서 실패한 단계만 다시 판단할 수 있습니다.
