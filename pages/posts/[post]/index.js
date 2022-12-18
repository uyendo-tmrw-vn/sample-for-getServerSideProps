import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import safeJsonStringify from "safe-json-stringify";
import { SWRConfig } from "swr";

import PostContainer from "../../../containers/PostContainer";

const Post = ({ data, fallback }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={data?.title} key="ogtitle" />
        <meta property="og:description" content={data?.body} key="ogdesc" />
        <meta property="og:url" content={router?.asPath} key="ogurl" />
      </Head>
      <SWRConfig value={{ fallback }}>
        <PostContainer />
      </SWRConfig>
    </>
  );
};

export default Post;

// This gets called on every request
export async function getServerSideProps(context) {
  const { post } = context.query;
  // Fetch data from external API
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post}`
  );
  const posts = await response.json();

  const stringifiedData = safeJsonStringify(posts);
  const data = JSON.parse(stringifiedData);

  // Pass data to the page via props
  const url = `/posts/${post}`;
  return {
    props: {
      data,
      fallback: {
        [url]: data
      }
    }
  };
}
