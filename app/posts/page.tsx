import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'All Posts — My Blog',
  description: 'Browse all blog posts.',
}

export default async function PostsPage() {
  const posts: Post[] = await getPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">All Posts</h1>
      <p className="text-gray-500 mb-10">Explore every story in the collection.</p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}