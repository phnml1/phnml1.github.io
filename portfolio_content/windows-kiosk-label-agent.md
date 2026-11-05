---
title: 'Windows 키오스크 라벨 Agent'
slug: 'windows-kiosk-label-agent'
period: '2026.06 - 2026.08'
team: '회사 프로젝트 / Windows 현장 프로그램'
role: 'C#/.NET 로컬 API · 라벨 출력 경로 · 프린터 설정 정책'
description: '웹 화면의 라벨 요청 → ASP.NET Core localhost API → PMS 템플릿 또는 WMS ZPL 처리 → Zebra ZPL·Bixolon ESC/POS 출력 경로를 연결한 Windows Agent입니다.'
audience: 'Windows 키오스크에서 PMS·WMS 라벨을 출력하는 현장 작업자'
problem: '웹 화면은 Windows 프린터를 직접 다루기 어렵고, PMS·WMS 라벨의 데이터 출처와 Bixolon·Zebra의 출력 형식, 라벨 규격이 달랐습니다.'
contribution: 'WinUI 3·WebView2 키오스크의 로컬 API에서 라벨 요청을 처리하고, PMS 템플릿 조회·WMS ZPL 우선 사용·Zebra/Bixolon 출력 분기와 프린터 선택값 복원 정책을 구현했습니다.'
decision: 'WMS가 준비한 ZPL 레이아웃을 우선 보존하고, 장비가 이해하는 출력 형식에 맞춰 전송 경로를 나눴습니다.'
result: '프린터 유형별 출력 경로를 연결하고, 저장된 프린터 선택값의 복원 정책을 MSTest로 검증했습니다.'
userFlow:
  - '웹 화면에서 PMS·WMS 라벨 요청'
  - 'ASP.NET Core localhost API가 요청 접수'
  - 'PMS 템플릿 조회 또는 전달된 WMS ZPL 처리'
  - 'Zebra ZPL / Bixolon 이미지·ESC/POS 경로'
stack:
  - 'C# / .NET'
  - 'WinUI 3'
  - 'WebView2'
  - 'ASP.NET Core'
  - 'ZPL'
  - 'ESC/POS'
  - 'MSTest'
---

## 현장 문제

PMS·WMS 웹 화면에서 라벨 출력 버튼을 눌러도 브라우저만으로는 Windows PC에 연결된 프린터를 직접 제어하거나 장비별 명령을 안정적으로 전달하기 어려웠습니다.

라벨 데이터가 만들어지는 방식도 달랐습니다. PMS 상품·팔레트 라벨은 PMS 백엔드에서 템플릿을 조회해 만들지만, WMS 라벨은 WMS 백엔드가 생성해 웹 화면에서 전달한 ZPL을 우선 사용합니다. 따라서 모든 라벨 요청을 하나의 변환 방식으로 처리할 수 없었습니다.

현장에서 다룬 프린터는 **Bixolon과 Zebra**입니다. **Bixolon**에는 **40×30 mm 상품 라벨**과 **80×80 mm 팔레트 라벨**, **Zebra**에는 **100×100 mm WMS 출고 라벨·팔레트 라벨**을 사용했습니다. 웹에서 요청이 들어오면 라벨의 출처·프린터 종류·용지 규격을 구분하고, 현장 PC에서 올바른 출력 경로로 연결할 로컬 프로그램이 필요했습니다.

## 내가 구현한 처리 흐름

1. **요청 접수:** 웹 화면이 보낸 라벨 요청을 Agent의 ASP.NET Core localhost API에서 받습니다. `localhost`는 키오스크가 실행 중인 같은 Windows PC를 뜻합니다.
2. **라벨 데이터·템플릿 처리:** PMS 상품·팔레트 라벨은 설정된 PMS 백엔드에서 필요한 템플릿을 조회해 라벨 데이터에 적용합니다. WMS 라벨은 웹 화면이 전달한 WMS 생성 ZPL을 우선 사용합니다. 전달된 ZPL이 없을 때만 PMS 템플릿 조회 경로를 적용합니다.
3. **출력 경로 선택:** 라벨 유형과 프린터에 맞춰 전송 형식을 정합니다. Zebra 계열에는 ZPL 경로를, Bixolon 계열에는 ZPL을 이미지로 변환한 ESC/POS 경로를 연결했습니다.

제가 맡은 범위는 로컬 API의 라벨 요청 처리, 데이터 출처에 맞는 템플릿·ZPL 적용, 프린터별 출력 경로, 그리고 프린터 설정 복원 정책입니다.

## 프린터별 분기가 필요했던 이유

같은 라벨 내용도 프린터가 해석하는 명령이 다릅니다. Zebra 계열은 라벨 배치 정보가 담긴 **ZPL**을 받습니다. Bixolon 계열의 해당 출력 경로는 ZPL을 그대로 보내는 대신, 라벨을 그림으로 렌더링한 뒤 **ESC/POS**(이미지를 전송하는 프린터 명령 형식)로 보냅니다. 상품·팔레트·WMS 출고 라벨은 용도와 용지 크기도 서로 달라, 라벨 유형과 프린터에 맞는 출력을 선택해야 했습니다.

따라서 WMS가 준비한 ZPL의 라벨 내용을 우선 보존하되, 출력 직전에 프린터 유형에 맞는 경로로 분기했습니다. Bixolon의 40×30·80×80 mm와 Zebra의 100×100 mm 용지 구분도 이 경계에 포함됩니다.

## 검증

프린터 목록이 일시적으로 비어도 저장된 선택값을 지우지 않도록 복원 정책을 분리했습니다. 목록이 다시 나타났을 때의 재선택과 대소문자 차이도 포함해 **MSTest 7개**로 정책을 검증했습니다.
