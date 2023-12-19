import fs from 'fs';
import path from 'path';

const matter = require('gray-matter');

const dir = 'posts';

const getAllFiles = (dir:string) =>
    fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);

const getFiles = (category:string) => {
  const postsDirectory  = path.join(process.cwd(),`posts/${category}`);
  const postFiles = fs.readdirSync(postsDirectory);
  console.log(postFiles);
}

function convertFilePathToURL(filePath) {
  const relativePath = path.relative('posts', filePath);
  const urlPath = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  return urlPath;
}

export function getPostData(filePath) {
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
  const postFiles = getFiles(category);
  console.log(postFiles);
}

export function getCategory() {
  const categorys = fs.readdirSync(dir);
  return categorys;
}