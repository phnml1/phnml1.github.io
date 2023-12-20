import fs from 'fs';
import path from 'path';

const matter = require('gray-matter');

const dir = 'posts';

const postsDirectory = (category) => path.join(process.cwd(), `posts/${category}`);

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

function getPostData(filePath) {
  const postSlug = convertFilePathToURL(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const {data,content} = matter(fileContent);
  const postData = {
      slug: postSlug,
      ...data,
      content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getAllFiles(dir);
  const PostData = postFiles.map((postFile) => { return getPostData(postFile)});
  const sortedPosts = PostData.sort((postA, postB) => postA.date > postB.date ? -1: 1);
  return sortedPosts;
}

export function getPostsByCategory(category) {
  const postFiles = getFilePaths(category);
  const postData = postFiles.map((postFile) => getPostData(postFile));
  return postData;
}

export function getCategory() {
  const categorys = fs.readdirSync(dir);
  return categorys;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}