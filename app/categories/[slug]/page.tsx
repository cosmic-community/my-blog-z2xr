// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="text-4xl mb-3">🏷️</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">{name}</h1>
          {description && <p className="mt-4 text-brand-100 max-w-2xl mx-auto">{description}</p>}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts in {name}</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <div className="mt-12">
          <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ← Back to all categories
          </Link>
        </div>
      </div>
    </div>
  )
}