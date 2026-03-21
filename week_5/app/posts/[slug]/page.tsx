import { notFound } from "next/navigation";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Simulate slow API so you can clearly see route-level streaming.
  await sleep(1200);
  const res = await fetch(`https://api.vercel.app/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const post: any = await res.json();

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <p className="text-sm text-gray-500">Post ID: {slug}</p>
      <h1 className="text-3xl font-light text-gray-900">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
    </article>
  );
}
