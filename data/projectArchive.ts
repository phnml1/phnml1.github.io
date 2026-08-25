export interface ArchivedProject {
  title: string;
  period: string;
  role: string;
  summary: string;
  stack: readonly string[];
  href?: string;
  linkLabel?: string;
}

export interface CurrentPortfolioProject {
  title: string;
  period: string;
  role: string;
  summary: string;
  stack: readonly string[];
  highlights: readonly string[];
  github: string;
  blog: string;
}

export interface ProjectArchiveGroup {
  year: string;
  context: string;
  projects: readonly ArchivedProject[];
}

export const currentPortfolioProject: CurrentPortfolioProject = {
  title: 'phnml1 Portfolio & Tech Blog',
  period: '2023.12 - 현재',
  role: '개인 프로젝트 · 설계, 개발, 콘텐츠 운영 및 배포',
  summary:
    'Next.js App Router 기반으로 프로젝트 Case Study와 MDX 기술 글을 한 곳에서 관리하고, 정적 export로 GitHub Pages에 배포하는 개인 포트폴리오·기술 블로그입니다.',
  stack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Markdown / MDX', 'GitHub Pages'],
  highlights: [
    'Markdown과 MDX 기반 프로젝트·기술 글 콘텐츠 관리',
    '프로젝트와 기술 글의 정적 상세 라우트 생성',
    '검색·카테고리·태그를 통한 콘텐츠 탐색',
    'canonical·Open Graph·sitemap·robots와 정적 배포 구성',
  ],
  github: 'https://github.com/phnml1/phnml1.github.io',
  blog: '/posts/all',
};

export const projectArchive: readonly ProjectArchiveGroup[] = [
  {
    year: '2024',
    context: 'Next.js · Authentication · Location',
    projects: [
      {
        title: '아모르각코',
        period: '2024.07 - 2024.12',
        role: '팀 프로젝트 · Frontend 1 / Backend 1',
        summary:
          'Next.js middleware 기반 인증과 쿠키·토큰 관리, Kakao 지도와 Geolocation을 활용한 위치 탐색, PWA·FCM 알림을 경험한 모각코 모집 플랫폼입니다.',
        stack: ['Next.js App Router', 'TypeScript', 'React Query', 'Kakao Maps', 'PWA / FCM'],
      },
    ],
  },
  {
    year: '2023',
    context: 'React · Team Collaboration',
    projects: [
      {
        title: 'CMAP',
        period: '2023.07',
        role: '팀 프로젝트 · Frontend (3인)',
        summary: '지도 기반 장소 콘텐츠를 작성·공유하는 React 웹 프로젝트입니다.',
        stack: ['React', 'styled-components', 'CSS Modules', 'Naver Maps', 'React-Quill'],
      },
      {
        title: 'Hey Apple',
        period: '2023.01 - 2023.02',
        role: '팀 프로젝트 · FE Lead (FE 3 / BE 3 / AI 1)',
        summary:
          '이미지를 업로드하고 분석 결과를 시각화하는 웹 서비스의 프론트엔드 개발 및 FE 리드를 맡았습니다.',
        stack: ['React', 'JavaScript', 'Axios', 'Framer Motion', 'Nivo'],
      },
    ],
  },
];
