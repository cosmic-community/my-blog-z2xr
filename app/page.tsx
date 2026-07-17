import Link from 'next/link'
import { getPosts, getCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import type { Post, Category } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const posts: Post[] = await getPosts()
  const categories: Category[] = await getCategories()

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Stories, Ideas & Inspiration
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto">
            A creative portfolio and blog powered by Cosmic. Explore posts, meet the authors, and browse by category.
          </p>
          <Link
            href="/posts"
            className="inline-block mt-8 bg-white text-brand-700 font-semibold px-6 py-3 rounded-full hover:bg-brand-50 transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featured && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
            <Link href={`/posts/${featured.slug}`} className="group block">
              <article className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                {featured.metadata?.featured_image ? (
                  <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={`${featured.metadata.featured_image.imgix_url}?w=1000&h=700&fit=crop&auto=format,compress`}
                      alt={featured.title}
                      width={500}
                      height={350}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-200" />
                )}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  {featured.metadata?.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">
                      {getMetafieldValue(featured.metadata.category.metadata?.name) ||
                        featured.metadata.category.title}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {getMetafieldValue(featured.metadata?.title) || featured.title}
                  </h3>
                  {featured.metadata?.author && (
                    <p className="mt-4 text-sm text-gray-500">
                      By {getMetafieldValue(featured.metadata.author.metadata?.name) ||
                        featured.metadata.author.title}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
              <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
            <Link href="/posts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          {rest.length === 0 && posts.length <= 1 ? (
            <p className="text-gray-500">No more posts yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}