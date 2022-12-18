import React from "react";
import Link from "next/link";
import useSWR from "swr";

const getAllPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allPost = await response.json();
  return allPost;
};

const AllPosts = () => {
  const { data = [], error, mutate } = useSWR(`/posts`, getAllPosts);

  if (data.length < 1) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <h1>All Post</h1>
      <ol>
        {data.map((post) => {
          const { id, title, body } = post;
          return (
            <Link legacyBehavior href={`/posts/${id}`}>
              <a>
                <li>{title}</li>
              </a>
            </Link>
          );
        })}
      </ol>
    </>
  );
};

export default AllPosts;
