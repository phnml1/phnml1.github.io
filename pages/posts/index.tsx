import { Fragment } from "react";
import Head from "next/head";

export default function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>모든 포스트</title>
        <meta name = "description" content = "모든 포스트 보여주기" />
      </Head>
    </Fragment>
  )
}
