import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
export const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

export const allCategorys = Array.from(new Set(posts.map((post) => (post.category)))).sort();

export const recentPosts = posts.slice(0,3);

export const getPostsByCategory = (category:string) => (posts.filter(post => post.category == category));

export const getPostData = (filePath:string) => (
  posts.filter((file:Post) => file._raw.sourceFilePath==filePath)[0]
)

export const getPrevData = (filePath:string) => {
  const blogposts = posts;
  const index =  blogposts.findIndex((file:Post) => file._raw.sourceFilePath==filePath)-1;
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

export const getNextData = (filePath:string) => {
  const blogposts = posts;
  const index =  blogposts.findIndex((file:Post) => file._raw.sourceFilePath==filePath)+1;
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
// const matter = require('gray-matter');

// const dir = 'posts';

// const postsDirectory = (category) => path.join(process.cwd(), `posts/${category}`);

// const getAllFiles = (dir:string) =>
//     fs.readdirSync(dir).reduce((files, file) => {
//         const name = path.join(dir, file);
//         const isDirectory = fs.statSync(name).isDirectory();
//     return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
//     }, []);

// const getFilePaths = (category:string) => {
//   const postsDir  = postsDirectory(category);
//   const postFiles = fs.readdirSync(postsDir);
//   const filePaths = postFiles.map((postFile) => `${dir}/${category}/${postFile}`);
//   return filePaths;
// }

// function convertFilePathToURL(filePath) {
//   const relativePath = path.relative('posts', filePath);
//   const urlPath = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
//   return urlPath;
// }

// export function getPostData(filePath) {
//   const postSlug = convertFilePathToURL(filePath);
//   const fileContent = fs.readFileSync(filePath, 'utf-8');
//   const {data,content} = matter(fileContent);
//   const postData = {
//       slug: `${dir}/${postSlug}`,
//       ...data,
//       content,
//   };
//   return postData;
// }

// export function getAllPosts() {
//   const postFiles = getAllFiles(dir);
//   const PostData = postFiles.map((postFile) => { return getPostData(postFile)});
//   const sortedPosts = PostData.sort((postA, postB) => postA.date > postB.date ? -1: 1);
//   return sortedPosts;
// }

// export function getPostsByCategory(category) {
//   const postFiles = getFilePaths(category);
//   const postData = postFiles.map((postFile) => getPostData(postFile));
//   return postData;
// }

// export function getCategory() {
//   const categorys = fs.readdirSync(dir);
//   return categorys;
// }

// export function getFeaturedPosts() {
//   const allPosts = getAllPosts();

//   const featuredPosts = allPosts.filter(post => post.isFeatured);

//   return featuredPosts;
// }