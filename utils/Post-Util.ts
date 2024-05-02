import { compareDesc } from 'date-fns';
import path from 'path';
import fs from 'fs';
const matter = require('gray-matter');

const dir = 'posts';

const postsDirectory = (category:string) => path.join(process.cwd(), `posts/${category}`);

const getAllFiles = (dir:string) =>
    fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);

const getFilePaths = (category:string) => {
  const postsDir  = postsDirectory(category);
  const postFiles = fs.readdirSync(postsDir);
  const filePaths = postFiles.map((postFile) => `${dir}/${category}/${postFile}`);
  return filePaths;
}

function convertFilePathToURL(filePath) {
  const relativePath = path.relative('posts', filePath);
  const urlPath = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  return urlPath;
}

export function getPostData(filePath) {
  const postSlugs = convertFilePathToURL(filePath).split('/');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const {data,content} = matter(fileContent);
  const postData = {
      slug: `${dir}/${postSlugs[0]}/${postSlugs[1].split('.')[0]}`,
      ...data,
      content,
  };
  return postData;
}

export function getAllPosts() {
  const allFiles = getAllFiles(dir);
  const postFiles = allFiles.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const PostData = postFiles.map((postFile) => { return getPostData(postFile)});
  const sortedPosts = PostData.sort((postA, postB) => postA.date > postB.date ? -1: 1);
  return sortedPosts;
 
}

export function getPostsByCategory(category:string) {
  if (category != 'all'){
  const postFiles = getFilePaths(category);
  const postData = postFiles.map((postFile) => getPostData(postFile));
  return postData;
  }
  return getAllPosts();
}


export const getPrevData = (filePath:string) => {
  const blogposts = getAllPosts();
  const index =  blogposts.findIndex((file) => file.slug==filePath)-1;
  if (index>=0) {
    return {
      posts: blogposts, 
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

export const getNextData = (filePath:string) => {
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

export const allTags = Array.from(
  getAllPosts().reduce((ac, v) => {
    v.tags.forEach((tag) => ac.add(tag));
    return ac;
  }, new Set<string>([])),
).filter(Boolean);

export const getPostsByTags = (tag:string) => {
  const posts = getAllPosts();
  if (tag === 'all') {
    return posts;
  } else {
  return posts.filter(post => post.tags.includes(tag));
}
}

export function getCategory() {
  const categorys = fs.readdirSync(dir);
  return categorys;
}

export const recentPosts = getAllPosts().slice(0,3);
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