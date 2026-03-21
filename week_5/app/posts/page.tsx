import { Suspense } from "react";
import PostList from "../components/posts/PostList";

export default async function Posts() {
  const res = await fetch("https://api.vercel.app/blog");
  const posts = await res.json();

  return (
    <>
      <h1 className="text-4xl font-light text-gray-900 mb-8">Bài viết</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </Suspense>
    </>
  );
}
