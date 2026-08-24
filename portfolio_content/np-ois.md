---
title: "NP-OIS"
slug: "np-ois"
period: "2026.06 - 2026.07"
team: "팀 프로젝트 / 익명 물류 운영사"
role: "Frontend / Full-stack"
description: "Excel VBA 주문 처리 업무를 React와 Kotlin/Spring 기반 웹 워크플로로 전환한 실무 프로젝트"
problem: "Excel VBA 처리에서는 어떤 원본과 기준정보로 산출물이 만들어졌는지 추적하기 어렵고 실패 후 재처리 흐름도 화면에서 이어지지 않았습니다."
contribution: "업로드·변환 큐·검수·산출물·이력 화면을 연결하고, 기준정보 snapshot lock과 Object Storage 기반 산출물 흐름을 구현했습니다."
implementation: "React 화면에서 업로드부터 이력까지 연결하고, Kotlin/Spring API에 기준정보 snapshot, 변환 큐, XLSX 생성과 streaming download를 구현했습니다."
decision: "서버 상태는 TanStack Query로 동기화하고 변환 당시 기준은 snapshot으로 고정했으며, 큰 산출물은 DB LOB 대신 Object Storage에 보관했습니다."
evidence: "Git author 기준 57/93 commits, Backend 59 tests와 Frontend production build 통과를 확인했으며 운영 성과 수치는 공개하지 않았습니다."
stack: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Kotlin", "Spring Boot", "JPA", "MySQL", "Apache POI", "Object Storage"]
---

## Overview
- 기존 Excel VBA로 처리하던 주문 원본 수집, 표준화, 검수, 산출물 생성을 웹 워크플로로 전환한 물류 운영 도구입니다.
- 주문 원본 업로드, workbook preview, transform queue, master snapshot 고정, 검수/보정, 산출물 다운로드와 작업 이력 조회까지 이어지는 운영 흐름을 다뤘습니다.
- 공개 위험이 있는 회사 운영 수치, 내부 주소, 인증값, 환경 설정 값은 제외했습니다.

## Key Features
- **주문 원본 업로드와 변환 큐**: Excel 원본을 batch로 묶고 변환 진행 상태를 화면에서 추적할 수 있게 구성했습니다.
- **검수/보정 화면**: 표준 주문 라인과 원본 행, 누락 기준정보, 제외 행을 분리해 운영자가 실패 원인을 확인할 수 있게 했습니다.
- **기준정보 snapshot lock**: 변환 run마다 사용한 기준정보 snapshot을 고정해 이후 기준정보가 바뀌어도 변환 당시 기준을 추적할 수 있게 했습니다.
- **산출물 보관과 다운로드**: 표준주문, 피킹, 라벨, Scan Upload, 작업서 산출물을 생성하고 개별/ZIP 다운로드 흐름을 구성했습니다.
- **성능/안정성 개선**: N+1 가능성이 있는 기준정보 조회를 projection으로 줄이고, 일부 목록을 DB pagination 중심으로 정리했습니다.

## Technical Highlights

### Problem 01 - VBA 결과 추적과 재처리 어려움
- Excel VBA 기반 처리에서는 어떤 원본과 기준정보로 산출물이 만들어졌는지 추적하기 어렵고, 실패 후 재처리 경로도 화면에서 이어지기 어려웠습니다.

### Solution 01 - 업로드부터 산출물까지 웹 워크플로 구성
- React Router와 TanStack Query 기반으로 업로드, 큐, 검수, 산출물, 이력 화면을 연결했습니다.
- Kotlin/Spring API와 Apache POI 기반 파싱/생성 로직을 연결해 Excel 중심 업무를 웹에서 추적 가능한 단계로 나눴습니다.
- 개인 기여는 Git author 기준 57 commits이며, 초기 MVP와 일부 기반 기능은 팀 기여로 구분했습니다.

### Problem 02 - 기준정보 변경 후 결과 재현성 부족
- 기준정보가 계속 갱신되는 업무에서는 과거 변환 결과가 어떤 기준으로 만들어졌는지 설명할 근거가 필요했습니다.

### Solution 02 - Master snapshot lock
- 변환 run 생성 시점의 최신 snapshot id/version/hash를 별도로 저장하고, lookup 범위를 해당 snapshot으로 제한했습니다.
- 기준정보 전체 이력을 매번 훑는 방식보다 변환 당시 기준을 명확하게 남기는 구조를 선택했습니다.

### Problem 03 - 대용량 기준정보 조회와 목록 화면 비용
- 기준정보 source, sync run, missing reference 조회가 늘어나면 source별 최신 snapshot 조회와 전체 row 로딩이 병목이 될 수 있었습니다.

### Solution 03 - Projection과 DB pagination
- source/run id 목록으로 필요한 요약 데이터를 한 번에 가져오는 projection 조회를 적용했습니다.
- missing reference와 snapshot row 조회는 DB pagination과 index 중심으로 개선했습니다.

### Problem 04 - 산출물 저장과 다운로드의 메모리 부담
- 산출물 XLSX/ZIP을 DB LOB와 ByteArray 중심으로 다루면 파일 크기가 커질수록 다운로드와 저장 비용이 커질 수 있었습니다.

### Solution 04 - Object Storage와 streaming download
- 신규 산출물은 OCI/local Object Storage에 저장하고 DB에는 metadata 중심으로 기록했습니다.
- 개별 파일과 ZIP 다운로드는 StreamingResponseBody 기반으로 응답하도록 개선했습니다.

## Tech Stack & Reason
- **React + TypeScript**: 운영 화면의 업로드, 검수, 이력, 산출물 상태를 타입 기반으로 연결했습니다.
- **TanStack Query**: transform queue polling, loading/error 상태, 화면별 서버 상태 동기화를 담당했습니다.
- **Kotlin/Spring Boot**: 주문 변환 API, 큐, 기준정보, 산출물 생성 로직을 계층화했습니다.
- **JPA + MySQL**: 원본 파일, 변환 run, 기준정보 snapshot, 산출물 metadata를 DB로 추적했습니다.
- **Apache POI**: 기존 Excel 산출물 contract를 웹 전환 후에도 유지하기 위해 사용했습니다.
- **Object Storage + StreamingResponseBody**: DB LOB 중심 저장을 완화하고 다운로드 경로의 메모리 부담을 줄이기 위해 적용했습니다.

## Achievements
- Git author 기준 `mj-juyeong` 57 / 전체 93 commits를 확인했습니다. 이 값은 코드 기여율이 아니라 author 기준 커밋 수입니다.
- 백엔드 테스트 `59 tests` 통과를 확인했습니다.
- 프론트 production build 성공을 확인했습니다. JS bundle은 `966.51 kB`, gzip은 `243.85 kB`이며 chunk warning이 남아 있습니다.
- 운영 처리량, 시간 절감률, 오류 감소율은 코드와 Git으로 확인되지 않아 수치로 표현하지 않았습니다.

## What I Focused On
- VBA 중심 업무를 업로드, 변환, 검수, 산출물, 이력이라는 추적 가능한 화면 흐름으로 바꾸는 데 집중했습니다.
- 기준정보가 변경되는 운영 환경에서도 변환 당시의 판단 근거가 남도록 snapshot lock을 설계했습니다.
- CRUD 화면 나열보다 실패 이력, 재처리, 다운로드, 성능 비용 같은 운영자의 실제 문제를 먼저 다뤘습니다.

## Trade-offs / Limitations
- 초기 MVP와 일부 기반 기능은 팀원이 구현했고, 개인 기여는 Git author 기준으로 확인된 확장, 정합성, 운영 UX, 성능 개선 범위로 제한했습니다.
- 운영 사용자 수, 실제 주문 row 수, 시간 절감률은 확인되지 않아 공개 포트폴리오에는 넣지 않았습니다.
- FE build에는 500 kB chunk warning이 남아 있어 추후 code splitting 개선 여지가 있습니다.

## Portfolio Summary
- NP-OIS는 Excel VBA 주문 처리 업무를 React + Kotlin/Spring 웹 워크플로로 전환한 실무 프로젝트입니다.
- 업로드, 변환 큐, 검수/보정, 기준정보 snapshot, 산출물 보관 흐름을 하나의 운영 화면으로 연결했습니다.
- 개인 기여와 팀 기여를 Git author 기준으로 구분했고, 공개 위험이 있는 정보와 확인되지 않은 운영 성과 수치는 제외했습니다.
