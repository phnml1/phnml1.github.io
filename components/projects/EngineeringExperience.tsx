import Reveal from '@/components/motion/Reveal';

const cases = [
  {
    category: 'QA · Local only',
    title: '마스터 동기화 오류를 격리 환경에서 분류',
    problem: '인증, 컬럼 매핑과 동기화 경로를 기존 데이터에 영향을 주지 않고 검증해야 했습니다.',
    action: '별도 QA 환경과 API·브라우저 검증 스크립트를 만들고, 변환 오류의 원본 열·행과 감사로그 누락 조건을 추적했습니다.',
    result: '실패·차단된 경로와 재현 조건을 남겼습니다. 검증 도구와 로컬 설정은 미커밋 산출물이며 제품 기능으로 병합됐다고 보지 않습니다.',
  },
  {
    category: 'Code analysis · No implementation',
    title: '보조마스터 연결의 데이터 경계를 확인',
    problem: '보조마스터 "취합"이 실제로 어떤 값을 바꾸고, 매일 변경분을 추적할 수 있는지 불분명했습니다.',
    action: '원본 컬럼 매핑부터 상품·점포 코드 변환, 기준 마스터 검증과 통합 주문행 저장까지 코드·테스트 경로를 따라갔습니다.',
    result: '다른 보조마스터 사이의 충돌 탐지와 일일 snapshot/diff가 현재 범위에 없음을 확인했습니다. 해당 저장소에 직접 작성한 기능 코드는 없습니다.',
  },
  {
    category: 'Device validation · Local test',
    title: '라벨 미리보기와 실물 출력의 차이를 점검',
    problem: '출고 라벨의 상품명·사업장 간격과 실제 프린터 출력이 브랜치·DB 템플릿에 따라 달라질 수 있었습니다.',
    action: 'ZPL 마이그레이션과 적용된 DB 템플릿을 대조하고, 서로 다른 줄 수의 라벨 6장을 로컬 프린터 경로에서 확인했습니다.',
    result: '당시 작업 기록에서 6장 모두 출력 접수 상태를 확인했습니다. 현장 전체 프린터와 운영 배포 결과로 일반화하지 않습니다.',
  },
] as const;

export default function EngineeringExperience({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id="engineering-experience"
      aria-labelledby="engineering-experience-title"
      className={embedded ? 'mt-24 border-t border-outline/70 pt-16' : 'w-full border-y border-outline/70 px-5 py-24 md:px-12'}
    >
      <div className={embedded ? '' : 'mx-auto w-full max-w-[1440px]'}>
        <Reveal>
          <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-end">
            <div>
              <span className="font-label text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Additional Engineering Experience
              </span>
              <h2 id="engineering-experience-title" className="mt-4 max-w-3xl font-headline text-3xl font-black leading-tight text-white md:text-5xl">
                운영 현장의 문제를 검증한 일
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-secondary">
              대표 개발 프로젝트와 별개로, 조사·QA·장비 검증에서 확인한 범위만 기록했습니다.
            </p>
          </header>
        </Reveal>

        <div className="mt-10 border-t border-outline/70">
          {cases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="grid gap-5 border-b border-outline/70 py-7 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8">
                <div className="font-label text-xs font-bold uppercase leading-5 tracking-[0.16em] text-primary">
                  {item.category}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-snug text-white">{item.title}</h3>
                  <dl className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                      <dt className="font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Problem</dt>
                      <dd className="mt-2 text-sm leading-6 text-text-secondary">{item.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Work</dt>
                      <dd className="mt-2 text-sm leading-6 text-text-secondary">{item.action}</dd>
                    </div>
                    <div>
                      <dt className="font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Confirmed scope</dt>
                      <dd className="mt-2 text-sm leading-6 text-text-secondary">{item.result}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
