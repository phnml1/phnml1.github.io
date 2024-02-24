import { Fragment, useState } from "react";
import Layout from "./Layout";
import Head from "next/head";
import CategoryMenus from "../posts/CategoryMenus";
import PostsContents from "../posts/PostsContents";
import Navbar from "../navbar/Navbar";
import useScroll from "@/utils/useScroll";
import SideBar from "../sidebar/SideBar";

export default function PostLayout(props) {
  const {visible,position} = useScroll('post');
  const [sidebar,setSideBar] = useState(false);
  return (
    <Layout>
      <Fragment>
      <Head>
        <title>{props.currentCategory}</title>
        <meta name="description" content={`${props.currentCategory}의 카테고리와 관련한 글 모두 보여주기`} />
      </Head>
      {/* <Navbar setSideBar={setSideBar}/> */}
      <div className='w-full relative h-auto flex items-start justify-center mb-8 md:w-4/5 pl-8 pr-8 flex-col'>
      <CategoryMenus currentCategory={props.currentCategory} categorys = {props.categorys} visible={visible} position={position}/>
      <div className='w-full h-auto mt-16'>

        <div className="mt-16 text-3xl font-extrabold w-full ml-5 mb-16">{
        (props.currentCategory==='all')? 'All Posts':props.currentCategory} ({props.posts.length})</div>
        
        <PostsContents contents = {props.posts}/>
        
        </div>
      </div>
    
      </Fragment>
    </Layout>
  );
}
