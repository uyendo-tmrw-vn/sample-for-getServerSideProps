import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const getPost = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await response.json();
  return post;
};

const PostContainer = () => {
  const router = useRouter();

  console.log(router);

  const { data = {}, error, mutate } = useSWR(
    `/posts/${router?.query?.post}`,
    () => getPost(router?.query?.post)
  );

  return (
    <>
      <h1>Single Post</h1>
      <h3>
        {data.id} {data.title}
      </h3>
      <p>{data.body}</p>
    </>
  );
};

export default PostContainer;
