import { getAllPosts, getCategory, getPostData } from "@/utils/Post-Util";
import { useRouter } from "next/router";

export function PostDetailPage(props) {
  console.log(props.post);
  return (<></>)
}
export function getStaticProps(context) {
  const {params} = context;
  const {detail} = params;
  const detailPath = detail.join('/');
  const postData = getPostData(`${detailPath}.md`);
  return { props: {
    post: postData,
  }}
}

export function getStaticPaths() {
  const allFiles = getAllPosts();
  const slugs = allFiles.map(file => file.slug);
  return {
    paths: slugs.map(slug =>{
    const detail = slug.split('/');
    return ({params: {detail}})}),
    fallback: false,
  }
}
export default PostDetailPage;