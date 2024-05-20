import path from 'path';
import fs from 'fs';
import {Post, PrevNextDataInfo} from '@/types';
const matter = require('gray-matter');

const dir:string = 'posts';

const postsDirectory = (category:string):string => path.join(process.cwd(), `posts/${category}`);

const getAllFilePaths = (dir: string): string[] => 
  fs.readdirSync(dir).reduce<string[]>((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFilePaths(name)] : [...files, name];
  }, []);

const getFilePaths = (category:string) : string[] => {
  const postsDir:string  = postsDirectory(category);
  const postFiles:string[] = fs.readdirSync(postsDir);
  const filePaths = postFiles.map((postFile) => `${dir}/${category}/${postFile}`);
  return filePaths;
}

function convertFilePaths(filePath:string):string {
  const relativePath:string = path.relative('posts', filePath);
  const urlPath:string = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  return urlPath;
}

export function getPostData(filePath:string):Post {
  const postSlugs:string[] = convertFilePaths(filePath).split('/');
  const fileContent:string = fs.readFileSync(filePath, 'utf-8');
  const {data,content} = matter(fileContent);
  const postData = {
      slug: `${dir}/${postSlugs[0]}/${postSlugs[1].split('.')[0]}`,
      ...data,
      content,
  };
  return postData;
}

export function getAllPosts():Post[] {
  const allFilePaths:string[] = getAllFilePaths(dir);
  const PostData:Post[] = allFilePaths.map((postFile:string) => getPostData(postFile));
  const sortedPosts:Post[] = PostData.sort((postA, postB) => postA.date > postB.date ? -1: 1);
  return sortedPosts;
 
}

export function getPostsByCategory(category:string):Post[] {
  if (category != 'all'){
  const postFiles:string[] = getFilePaths(category);
  const postData:Post[] = postFiles.map((postFile) => getPostData(postFile));
  return postData;
  }
  return getAllPosts();
}


export const getPrevData = (filePath:string):PrevNextDataInfo => {
  const blogposts = getAllPosts();
  const index =  blogposts.findIndex((file) => file.slug==filePath)-1;
  if (index>=0) {
    return {
      title: blogposts[index].title,
      slug: blogposts[index].slug,
      summary: blogposts[index].summary,
    }
  }
  else {
    return { 
      title: blogposts[blogposts.length-1].title,
      slug: blogposts[blogposts.length-1].slug,
      summary: blogposts[blogposts.length-1].summary,
    }
  }
}

export const getNextData = (filePath:string):PrevNextDataInfo => {
  const blogposts = getAllPosts();
  const index =  blogposts.findIndex((file) => file.slug==filePath)+1;
  if (index<blogposts.length) {
    return { 
      title: blogposts[index].title,
      slug: blogposts[index].slug,
      summary: blogposts[index].summary,
    }
  }
  else {
    return { 
      title: blogposts[0].title,
      slug: blogposts[0].slug,
      summary: blogposts[0].summary,
    }
  }
}

export const allTags:string[] = Array.from(
  getAllPosts().reduce((ac, v) => {
    v.tags.forEach((tag) => ac.add(tag));
    return ac;
  }, new Set<string>([])),
).filter(Boolean);

export const getPostsByTags = (tag:string):Post[] => {
  const posts:Post[] = getAllPosts();
  if (tag === 'all') {
    return posts;
  } else {
  return posts.filter(post => post.tags.includes(tag));
}
}

export function getCategorys():string[] {
  const categorys:string[] = fs.readdirSync(dir);
  return categorys;
}

export const recentPosts:Post[] = getAllPosts().slice(0,3);
// export const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

// export const allCategorys = Array.from(new Set(posts.map((post) => (post.category)))).sort();



// export const getPostsByCategory = (category:string) => {
//   if (category === 'all') {
//     return posts;
//   } else {
//     return posts.filter(post => post.category == category)
//   }
// };


// export const getPostData = (filePath:string) => (
//   posts.filter((file:Post) => file._raw.sourceFilePath==filePath)[0]
// )






// export function getFeaturedPosts() {
//   const allPosts = getAllPosts();

//   const featuredPosts = allPosts.filter(post => post.isFeatured);

//   return featuredPosts;
// }
// export const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

// export const allCategorys = Array.from(new Set(posts.map((post) => (post.category)))).sort();



// export const getPostsByCategory = (category:string) => {
//   if (category === 'all') {
//     return posts;
//   } else {
//     return posts.filter(post => post.category == category)
//   }
// };


// export const getPostData = (filePath:string) => (
//   posts.filter((file:Post) => file._raw.sourceFilePath==filePath)[0]
// )






// export function getFeaturedPosts() {
//   const allPosts = getAllPosts();

//   const featuredPosts = allPosts.filter(post => post.isFeatured);

//   return featuredPosts;
// }