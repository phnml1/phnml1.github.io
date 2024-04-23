export interface Post {
    slug: string;
    title: string;
    date: Date;
    image: string;
    summary: string;
    tags: string[];
    isFeatured: boolean;
    content: string;
    readingMinutes?: number;
}