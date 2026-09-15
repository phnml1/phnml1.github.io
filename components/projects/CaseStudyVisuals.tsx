type ContributionOwner = 'personal' | 'shared' | 'external';

type FlowStep = {
  label: string;
  detail: string;
  owner: ContributionOwner;
};

type VisualConfig = {
  eyebrow: string;
  flowTitle: string;
  flowDescription: string;
  steps: FlowStep[];
  timelineTitle: string;
  timeline: { label: string; detail: string; connector?: '→' | 'or' }[];
  comparison: { label: 'Before' | 'Decision' | 'After'; title: string; body: string }[];
  evidence: { title: string; body: string }[];
  limitations: { title: string; body: string }[];
  focusPanels?: {
    eyebrow: string;
    title: string;
    description: string;
    items: { label: string; value: string; detail: string }[];
  }[];
};

const visualConfigs: Record<string, VisualConfig> = {
  codemate: {
    eyebrow: 'Realtime Data Flow',
    flowTitle: '이벤트를 다시 조회하지 않고 UI까지 전달하는 경로',
    flowDescription:
      'PostgreSQL이 영속 상태의 원본이고 Socket.io는 변경 이벤트만 전달합니다. 연결이 실패하면 같은 Query가 polling으로 DB 상태를 다시 읽습니다.',
    steps: [
      { label: 'DB write', detail: '댓글 변경을 먼저 영속화', owner: 'personal' },
      { label: 'Socket event', detail: 'PR room으로 payload 전달', owner: 'personal' },
      { label: 'Query cache', detail: '재귀·불변 patch와 ID 중복 방지', owner: 'personal' },
      { label: 'React UI', detail: '추가 refetch 없이 화면 반영', owner: 'personal' },
    ],
    timelineTitle: 'AI review 상태 머신',
    timeline: [
      { label: 'PENDING', detail: '요청 접수와 대기 UI' },
      { label: 'IN_PROGRESS', detail: '파일 조회·분석 stage' },
      { label: 'COMPLETED', detail: '결과 저장·cache 갱신', connector: 'or' },
      { label: 'FAILED', detail: '실패 상태와 재시도 경로' },
    ],
    comparison: [
      {
        label: 'Before',
        title: '이벤트마다 전체 refetch',
        body: '댓글 10건이면 같은 Query의 추가 요청도 10회 발생했습니다.',
      },
      {
        label: 'Decision',
        title: 'payload를 cache에 직접 반영',
        body: 'create/update/delete/reaction을 댓글 tree에 immutable하게 적용했습니다.',
      },
      {
        label: 'After',
        title: '추가 요청 10→0',
        body: '측정 페이지의 synthetic 댓글 이벤트 10건 조건에서 확인했습니다.',
      },
    ],
    evidence: [
      {
        title: 'Current verification',
        body: '23 suites / 133 Jest tests, Playwright 3 flows, ESLint와 production build를 2026-09-07에 확인했습니다.',
      },
      {
        title: 'Synthetic measurement',
        body: '댓글 이벤트 10건에서 요청 10→0, 총 21102→1235ms, cache 반영 평균 3.57ms·p95 7.2ms를 측정했습니다.',
      },
    ],
    limitations: [
      {
        title: '측정 범위',
        body: 'cache 측정은 실제 Socket.io network·DB 왕복 latency가 아닌 같은 브라우저의 synthetic event 조건입니다.',
      },
      {
        title: '남은 경계',
        body: 'event sequence/version, reaction 동시성, room 권한, fallback 뒤 자동 socket 복귀는 추가 검증이 필요합니다.',
      },
    ],
  },
  'np-wms-picking': {
    eyebrow: 'Field Execution Flow',
    flowTitle: '물리 스캔부터 외부 WMS 상태까지',
    flowDescription:
      '로컬 저장, Picking 서버 수락, 외부 WMS 반영을 하나의 성공으로 합치지 않고 각 경계의 상태와 복구 책임을 분리했습니다.',
    steps: [
      { label: 'Scanner', detail: '물리 키·suffix 입력', owner: 'external' },
      { label: 'Android WebView', detail: 'dispatchKeyEvent → CustomEvent', owner: 'personal' },
      { label: 'PDA React UI', detail: 'IME 복원·barcode validation', owner: 'personal' },
      { label: 'IndexedDB outbox', detail: 'stable clientEventId·순차 보존', owner: 'personal' },
      { label: 'Picking server', detail: 'expectedVersion·residual 처리', owner: 'shared' },
      { label: 'External WMS', detail: '최종 상태의 권위 시스템', owner: 'external' },
    ],
    timelineTitle: '오프라인 명령 상태',
    timeline: [
      { label: 'LOCAL_PENDING', detail: '로컬 transaction에 먼저 저장' },
      { label: 'REPLAYING', detail: '같은 ID로 순차 재전송·backoff' },
      {
        label: 'SERVER_ACCEPTED → LOCAL_ACKED',
        detail: '수락 확인 뒤 local outbox 정리',
        connector: 'or',
      },
      { label: 'CONFLICT', detail: 'version 충돌 시 자동 덮어쓰기 차단' },
    ],
    comparison: [
      {
        label: 'Before',
        title: '성공 상태가 하나',
        body: '로컬 저장과 서버·WMS 반영을 같은 완료로 보면 응답 유실에서 중복·유실 위험이 생깁니다.',
      },
      {
        label: 'Decision',
        title: '상태와 식별자를 분리',
        body: 'work package, journal, outbox와 stable ID·expectedVersion으로 경계를 명시했습니다.',
      },
      {
        label: 'After',
        title: '복구 가능한 작업 흐름',
        body: '재연결은 순차 replay하고 conflict는 차단해 작업자가 다음 행동을 판단하게 했습니다.',
      },
    ],
    evidence: [
      {
        title: 'Automated verification',
        body: '원자료에 기록된 Mobile FE 55 tests와 Backend 224 tests를 프로젝트 검증 근거로 사용했습니다.',
      },
      {
        title: 'Contribution boundary',
        body: '개인 기여는 PDA UI·scanner 입력·offline outbox·WMS 상태 소비와 연결에 한정해 설명합니다.',
      },
    ],
    limitations: [
      {
        title: 'Release boundary',
        body: '현행 구현, 기능 브랜치의 native 이관, local pilot 아키텍처를 하나의 운영 완료 버전으로 합치지 않았습니다.',
      },
      {
        title: 'Field validation',
        body: '실물 PDA, 장시간 오프라인, Bluetooth printer, 외부 WMS 장애와 처리량·오스캔 변화는 확인되지 않았습니다.',
      },
    ],
  },
  'np-ois': {
    eyebrow: 'Long-running Workflow',
    flowTitle: '업로드부터 보관까지 이어지는 8단계',
    flowDescription:
      '기존 MVP 위에서 운영자가 실패 위치와 사용 기준을 추적하고 검수·재처리할 수 있도록 장기 실행 workflow를 확장했습니다.',
    steps: [
      { label: 'Upload', detail: '원본·hash·metadata 저장', owner: 'shared' },
      { label: 'Workbook preview', detail: '양식 감지와 제한된 미리보기', owner: 'personal' },
      { label: 'Transform queue', detail: '비동기 요청·조건부 polling', owner: 'personal' },
      { label: 'Snapshot lock', detail: 'id·version·hash 고정', owner: 'personal' },
      { label: 'Transform', detail: 'I/O·POI parsing·mapping', owner: 'personal' },
      { label: 'Review', detail: '보정·재검증·실패 확인', owner: 'personal' },
      { label: 'Output', detail: '목적별 XLSX 생성', owner: 'shared' },
      { label: 'Archive', detail: '개별·ZIP streaming download', owner: 'personal' },
    ],
    timelineTitle: 'Transform transaction timeline',
    timeline: [
      { label: 'Start TX', detail: 'run과 snapshot 기준을 commit' },
      { label: 'Outside TX', detail: '긴 storage I/O와 POI parsing' },
      { label: 'Success TX', detail: 'line·trace·완료 상태 저장', connector: 'or' },
      { label: 'Failure TX', detail: 'rollback과 분리해 실패 이력 보존' },
    ],
    comparison: [
      {
        label: 'Before',
        title: '긴 작업과 이력이 한 transaction',
        body: 'I/O·파싱 실패가 run 상태까지 함께 사라지고 DB 자원을 오래 점유할 수 있었습니다.',
      },
      {
        label: 'Decision',
        title: '시작·연산·완료/실패 분리',
        body: '긴 연산은 transaction 밖으로 옮기고 실패 기록은 별도 transaction에 남겼습니다.',
      },
      {
        label: 'After',
        title: '기준·실패 이력이 남는 run',
        body: '사용 snapshot과 실패 상태가 남아 검수·재처리의 판단 근거가 생겼습니다.',
      },
    ],
    focusPanels: [
      {
        eyebrow: 'Frontend state sync',
        title: '필요한 동안만 서버 상태를 따라갑니다',
        description:
          '긴 변환을 request-local loading으로 감추지 않고 queue, run, progress를 서로 다른 갱신 조건으로 관리했습니다.',
        items: [
          { label: 'Queue', value: '1s', detail: '활성 항목이 있을 때만 polling' },
          { label: 'Run', value: '1s', detail: '생성·실행 중에 동기화' },
          { label: 'Progress', value: '350ms', detail: '처리 중 stage·행 수 갱신' },
          { label: 'Transition', value: 'invalidate', detail: '완료·실패 후 관련 cache 갱신' },
        ],
      },
      {
        eyebrow: 'Review workspace',
        title: '원본에서 산출물까지 run 문맥을 유지합니다',
        description:
          '운영자가 오류의 원본 위치를 찾고 보정한 뒤 같은 흐름에서 재검증과 산출물 생성을 이어가도록 구성했습니다.',
        items: [
          { label: 'Compare', value: 'source ↔ standard', detail: '원본 row와 변환 line 비교' },
          { label: 'Correct', value: 'mapping', detail: '누락 기준정보·수동 mapping 보정' },
          { label: 'Validate', value: 'revalidate', detail: '수정 결과 재검증·review reopen' },
          { label: 'Deliver', value: 'output', detail: '목적별 XLSX와 archive 연결' },
        ],
      },
    ],
    evidence: [
      {
        title: 'Backend artifact',
        body: '2026-08-18 테스트 산출물에서 59 tests, 실패 0, 1 skip을 확인했습니다.',
      },
      {
        title: 'Frontend build',
        body: '2026-09-07 production build는 성공했고 JS 966.51kB의 큰 chunk warning이 남았습니다.',
      },
    ],
    limitations: [
      {
        title: 'Current rerun',
        body: '최신 Backend 재실행은 Gradle 환경 문제로 테스트 시작 전에 중단되어 현재 통과로 표현하지 않습니다.',
      },
      {
        title: 'Scope',
        body: 'VBA 100% 동일성, 직접 WMS API 연동, 전체 설정의 완전한 불변 재현성과 운영 개선률은 검증되지 않았습니다.',
      },
    ],
  },
};

const ownerStyles: Record<ContributionOwner, string> = {
  personal: 'border-primary/70 bg-primary/5',
  shared: 'border-outline bg-surface-high/70',
  external: 'border-dashed border-outline bg-surface-low',
};

const ownerLabels: Record<ContributionOwner, string> = {
  personal: '개인 기여 중심',
  shared: '팀·기존 기반',
  external: '외부·권위 시스템',
};

export default function CaseStudyVisuals({ slug }: { slug: string }) {
  const config = visualConfigs[slug];

  if (!config) return null;

  return (
    <section className="mt-14 grid gap-6" aria-labelledby={`${slug}-visual-title`}>
      <header className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {config.eyebrow}
          </span>
          <h2
            id={`${slug}-visual-title`}
            className="mt-3 max-w-4xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl"
          >
            {config.flowTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-text-secondary">
            {config.flowDescription}
          </p>
        </div>
        <ContributionLegend />
      </header>

      <div className="rounded-3xl border border-outline/70 bg-background/55 p-5 md:p-7">
        <ol className="case-flow-grid" aria-label={config.flowTitle}>
          {config.steps.map((step, index) => (
            <li
              key={step.label}
              className={`case-flow-step min-w-0 rounded-xl border p-4 ${ownerStyles[step.owner]}`}
            >
              <div className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Step {String(index + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 break-words text-base font-black text-white">{step.label}</div>
              <p className="mt-2 break-words text-xs leading-5 text-text-secondary">
                {step.detail}
              </p>
              <span className="sr-only">{ownerLabels[step.owner]}</span>
            </li>
          ))}
        </ol>
      </div>

      {config.focusPanels?.length ? (
        <div className="grid gap-4 xl:grid-cols-2" aria-label="핵심 구현 상세">
          {config.focusPanels.map((panel) => (
            <article
              key={panel.title}
              className="min-w-0 rounded-3xl border border-outline/70 bg-surface-container p-5 md:p-7"
            >
              <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {panel.eyebrow}
              </span>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-white">
                {panel.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{panel.description}</p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {panel.items.map((item) => (
                  <div key={item.label} className="rounded-xl bg-surface-low p-4">
                    <dt className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </dt>
                    <dd className="mt-2 break-words text-lg font-black text-white">{item.value}</dd>
                    <dd className="mt-1 text-xs leading-5 text-text-secondary">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      ) : null}

      <div className="rounded-3xl border border-outline/70 bg-surface-container p-5 md:p-7">
        <h3 className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
          {config.timelineTitle}
        </h3>
        <ol className="mt-5 grid gap-3 md:grid-cols-4">
          {config.timeline.map((item, index) => (
            <li key={item.label} className="relative min-w-0 rounded-xl bg-surface-low p-4 md:pr-8">
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-2 break-words text-sm font-black text-white">{item.label}</div>
              <p className="mt-2 text-xs leading-5 text-text-secondary">{item.detail}</p>
              {index < config.timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="mt-3 block text-primary md:absolute md:right-3 md:top-1/2 md:mt-0 md:-translate-y-1/2"
                >
                  {item.connector ?? '→'}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4 lg:grid-cols-3" aria-label="Before Decision After 비교">
        {config.comparison.map((item) => (
          <article
            key={item.label}
            className="min-w-0 rounded-2xl border border-outline/70 bg-surface-container p-5"
          >
            <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {item.label}
            </span>
            <h3 className="mt-3 break-words text-xl font-black tracking-[-0.025em] text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EvidenceColumn title="Verified evidence" items={config.evidence} accent />
        <EvidenceColumn title="Limits & next checks" items={config.limitations} />
      </div>
    </section>
  );
}

function ContributionLegend() {
  return (
    <div className="flex max-w-full flex-wrap gap-2" aria-label="기여 범례">
      {(Object.keys(ownerLabels) as ContributionOwner[]).map((owner) => (
        <span
          key={owner}
          className={`rounded-full border px-3 py-1.5 text-[10px] font-bold text-text-secondary ${ownerStyles[owner]}`}
        >
          {ownerLabels[owner]}
        </span>
      ))}
    </div>
  );
}

function EvidenceColumn({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: { title: string; body: string }[];
  accent?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border p-5 md:p-6 ${
        accent ? 'border-primary/45 bg-primary/5' : 'border-outline/70 bg-surface-container'
      }`}
    >
      <h3 className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {title}
      </h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="min-w-0 border-t border-outline/60 pt-4 first:border-t-0 first:pt-0"
          >
            <h4 className="text-sm font-black text-white">{item.title}</h4>
            <p className="mt-2 text-sm leading-7 text-text-secondary">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
