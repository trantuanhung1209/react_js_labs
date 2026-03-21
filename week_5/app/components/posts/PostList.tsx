
import Link from "next/link";

export default async function PostList() {
    const res = await fetch("https://api.vercel.app/blog");
    const posts = await res.json();

    return (
        <>
            <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post: any) => (
                    <Link key={post.id} href={`/posts/${post.id}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition scale-3d cursor-pointer">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                    </Link>

                ))}
            </div>
        </>
    );
}