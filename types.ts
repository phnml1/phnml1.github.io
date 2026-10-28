export interface Post {
  slug: string;
  aliases?: string[];
  assetSlug?: string;
  title: string;
  date: Date;
  image: string;
  summary: string;
  tags: string[];
  isFeatured: boolean;
  content: string;
  readingMinutes?: number;
  project?: {
    title: string;
    slug: string;
  };
}

export interface PrevNextDataInfo {
  title: string;
  summary: string;
  slug: string;
}
