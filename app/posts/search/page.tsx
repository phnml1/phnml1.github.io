import SearchPageClient from '@/components/posts/SearchPageClient';
import { getAllPosts } from '@/utils/Post-Util';

export const metadata = {
  title: 'Search Posts',
  description: 'Search phnml1 tech journal posts',
};

export default function PostSearchPage() {
  const allPosts = JSON.parse(JSON.stringify(getAllPosts()));
  return <SearchPageClient allPosts={allPosts} />;
}
