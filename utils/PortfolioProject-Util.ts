import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PortfolioProjectFrontmatter {
  title: string;
  period?: string;
  team?: string;
  role?: string;
  stack: string[];
  slug?: string;
  category?: string;
  github?: string;
  description?: string;
  relatedPosts?: string[];
}

export interface PortfolioScreenImage {
  alt: string;
  src: string;
}

export interface PortfolioScreenGroup {
  title: string;
  category?: string;
  images: PortfolioScreenImage[];
}

export type PortfolioSectionKind =
  | 'overview'
  | 'features'
  | 'technical'
  | 'screens'
  | 'stack'
  | 'achievements'
  | 'focus'
  | 'tradeoffs'
  | 'summary'
  | 'highlights'
  | 'default';

export interface PortfolioMarkdownSection {
  title: string;
  displayTitle: string;
  kind: PortfolioSectionKind;
  content: string;
}

export interface PortfolioProject {
  slug: string;
  sourcePath: string;
  frontmatter: PortfolioProjectFrontmatter;
  sections: PortfolioMarkdownSection[];
  overview: PortfolioMarkdownSection | null;
  summary: string;
  screens: PortfolioScreenGroup[];
}

const cwd = process.cwd();
const contentCandidates = [
  path.join(cwd, 'content', 'portfolio_content'),
  path.join(cwd, 'portfolio_content'),
];

function getPortfolioContentDir() {
  const existingPath = contentCandidates.find((candidate) => fs.existsSync(candidate));

  if (!existingPath) {
    throw new Error('portfolio_content directory was not found.');
  }

  return existingPath;
}

export function getPortfolioProjectSlugs() {
  return getPortfolioProjects().map((project) => project.slug);
}

export function getPortfolioProjects() {
  const contentDir = getPortfolioContentDir();
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .sort();

  return files
    .map((file) => parsePortfolioProject(path.join(contentDir, file)))
    .sort((a, b) => getPeriodSortValue(b.frontmatter.period) - getPeriodSortValue(a.frontmatter.period));
}

export function getPortfolioProject(slug: string) {
  return getPortfolioProjects().find((project) => project.slug === slug);
}

function parsePortfolioProject(filePath: string): PortfolioProject {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(data);
  const sections = parseSections(content);
  const overview = sections.find((section) => section.kind === 'overview') ?? null;
  const slug = frontmatter.slug ?? createProjectSlug(frontmatter.title, filePath);
  const screens = getProjectScreens(sections);

  return {
    slug,
    sourcePath: filePath,
    frontmatter,
    sections,
    overview,
    summary: createSummary(frontmatter, overview),
    screens,
  };
}

function normalizeFrontmatter(data: Record<string, unknown>): PortfolioProjectFrontmatter {
  const title = typeof data.title === 'string' ? data.title : 'Untitled Project';
  const stack = Array.isArray(data.stack) ? data.stack.filter((item): item is string => typeof item === 'string') : [];

  return {
    title,
    period: typeof data.period === 'string' ? data.period : undefined,
    team: typeof data.team === 'string' ? data.team : undefined,
    role: typeof data.role === 'string' ? data.role : undefined,
    stack,
    slug: typeof data.slug === 'string' ? data.slug : undefined,
    category: typeof data.category === 'string' ? data.category : undefined,
    github: typeof data.github === 'string' ? data.github : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
    relatedPosts: Array.isArray(data.relatedPosts)
      ? data.relatedPosts.filter((item): item is string => typeof item === 'string')
      : undefined,
  };
}

function parseSections(content: string): PortfolioMarkdownSection[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const sections: PortfolioMarkdownSection[] = [];
  let currentTitle = '';
  let currentContent: string[] = [];

  const flush = () => {
    if (!currentTitle) {
      return;
    }

    const displayTitle = cleanSectionTitle(currentTitle);
    sections.push({
      title: currentTitle,
      displayTitle,
      kind: getSectionKind(displayTitle),
      content: currentContent.join('\n').trim(),
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);

    if (headingMatch) {
      flush();
      currentTitle = headingMatch[1].trim();
      currentContent = [];
      continue;
    }

    currentContent.push(line);
  }

  flush();
  return sections;
}

function cleanSectionTitle(title: string) {
  return title
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSectionKind(title: string): PortfolioSectionKind {
  const normalized = title.toLowerCase();

  if (normalized.includes('overview')) return 'overview';
  if (normalized.includes('key features')) return 'features';
  if (normalized.includes('technical highlights')) return 'technical';
  if (normalized === 'screens' || normalized.includes('screen flow') || normalized.includes('screen gallery')) return 'screens';
  if (normalized.includes('tech stack')) return 'stack';
  if (normalized.includes('achievements')) return 'achievements';
  if (normalized.includes('what i focused on')) return 'focus';
  if (normalized.includes('trade-offs') || normalized.includes('tradeoffs') || normalized.includes('limitations')) {
    return 'tradeoffs';
  }
  if (normalized.includes('portfolio summary') || normalized === 'summary') return 'summary';
  if (normalized.includes('highlight points')) return 'highlights';

  return 'default';
}

function createSummary(frontmatter: PortfolioProjectFrontmatter, overview: PortfolioMarkdownSection | null) {
  if (frontmatter.description) {
    return frontmatter.description;
  }

  if (!overview) {
    return `${frontmatter.title} 프로젝트 상세`;
  }

  const firstLine = overview.content
    .split('\n')
    .map((line) => line.replace(/^-\s+/, '').trim())
    .find(Boolean);

  return firstLine ?? `${frontmatter.title} 프로젝트 상세`;
}

function createProjectSlug(title: string, filePath: string) {
  const titleSlug = slugify(title);

  if (titleSlug) {
    return titleSlug;
  }

  const fileSlug = path
    .basename(filePath, path.extname(filePath))
    .replace(/\.(project|portfolio|data)$/i, '')
    .replace(/(_portfolio_project|_project|_data|-project-data|\.project)$/i, '');

  return slugify(fileSlug) || fileSlug.toLowerCase();
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getPeriodSortValue(period?: string) {
  if (!period) {
    return 0;
  }

  const match = period.match(/(\d{4})\.(\d{2})/);

  if (!match) {
    return 0;
  }

  return Number(`${match[1]}${match[2]}`);
}

function getProjectScreens(sections: PortfolioMarkdownSection[]) {
  const screenSection = sections.find((section) => section.kind === 'screens');

  if (!screenSection) {
    return [];
  }

  return parseScreenGroups(screenSection.content);
}

function parseScreenGroups(content: string): PortfolioScreenGroup[] {
  const groups: PortfolioScreenGroup[] = splitByH3(content)
    .map<PortfolioScreenGroup | null>(({ title, body }) => {
      const category = extractScreenCategory(body);
      const images = extractMarkdownImages(body);

      if (!title || images.length === 0) {
        return null;
      }

      return {
        title: cleanMarkdownLabel(title),
        category,
        images,
      };
    })
    .filter((group): group is PortfolioScreenGroup => group !== null);

  return dedupeScreenGroups(groups);
}

function extractScreenCategory(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const boldMatch = line.match(/^\*\*([^*]+?)\*\*:?\s*(.*)$/);
    const plainMatch = line.match(/^([^:：]+)\s*[:：]\s*(.*)$/);
    const sourceLabel = boldMatch ? boldMatch[1].trim() : plainMatch?.[1].trim() ?? '';
    const sourceValue = boldMatch ? boldMatch[2].trim() : plainMatch?.[2].trim() ?? '';
    const normalizedLabel = sourceLabel.toLowerCase().replace(/\s+/g, '');

    if (normalizedLabel === 'category' || normalizedLabel === '카테고리') {
      return cleanMarkdownLabel(sourceValue);
    }
  }

  return undefined;
}

function extractMarkdownImages(content: string) {
  const images: PortfolioScreenImage[] = [];
  const seen = new Set<string>();
  const normalized = content.replace(/\r\n/g, '\n');

  const pushImage = (src: string, alt = '') => {
    const trimmedSrc = src.trim();

    if (!trimmedSrc || seen.has(trimmedSrc)) {
      return;
    }

    seen.add(trimmedSrc);
    images.push({
      src: trimmedSrc,
      alt: alt.trim(),
    });
  };

  normalized.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_, alt: string, src: string) => {
    pushImage(src, alt);
    return '';
  });

  const imgTags = normalized.match(/<img\b[^>]*>/g) ?? [];

  imgTags.forEach((tag) => {
    const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i);
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);

    if (srcMatch) {
      pushImage(srcMatch[1], altMatch?.[1] ?? '');
    }
  });

  return images;
}

function dedupeScreenGroups(groups: PortfolioScreenGroup[]) {
  const seen = new Set<string>();

  return groups.filter((group) => {
    const key = `${group.category ?? ''}:${group.title}:${group.images.map((image) => image.src).join('|')}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function cleanMarkdownLabel(value: string) {
  return value.replace(/\*\*/g, '').replace(/`/g, '').replace(/<br\s*\/?>/gi, ' ').trim();
}

function splitByH3(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const items: { title: string; body: string }[] = [];
  let currentTitle = '';
  let currentContent: string[] = [];

  const flush = () => {
    if (!currentTitle) {
      return;
    }

    items.push({
      title: currentTitle.trim(),
      body: currentContent.join('\n').trim(),
    });
  };

  for (const line of lines) {
    const match = line.match(/^###\s+(.+)$/);

    if (match) {
      flush();
      currentTitle = match[1].trim();
      currentContent = [];
      continue;
    }

    if (currentTitle) {
      currentContent.push(line);
    }
  }

  flush();
  return items;
}
