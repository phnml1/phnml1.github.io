import { Post } from '@/.contentlayer/generated';

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
  const postbytitle = posts.filter((post) => {
    
      return post.title.toLowerCase().includes(keyword.toLowerCase()) 
  });
  if (postbytitle.length == 0) {
    return (posts.filter((post) => { return post.summary.toLowerCase().includes(keyword.toLowerCase()) }));
  }
  return postbytitle;
  
}
