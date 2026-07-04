import { Post } from "@/types";
export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

export const transformCategory = (categorys: string[]) => {
  const transformedCategory = categorys.map((name) => ({
    name: name,
    image: `/category/${name}.png`,
  }));
  return transformedCategory;
};

export function searchPosts(posts: Post[], keyword: string) {
  if (!keyword.trim()) {
    return posts;
  }

  const normalizedKeyword = keyword.toLowerCase();
  const postbytitle = posts.filter((post) => {
    
      return post.title.toLowerCase().includes(normalizedKeyword) 
  });
  if (postbytitle.length == 0) {
    return (posts.filter((post) => {
      return (
        post.summary.toLowerCase().includes(normalizedKeyword) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedKeyword))
      );
    }));
  }
  return postbytitle;
  
}
