// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getMetafieldValue, normalizeTags } from '@/lib/cosmic'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = getMetafieldValue(post.metadata?.content)
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const tags = normalizeTags(post.metadata?.tags)

  return (
    <article>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-4 hover:text-brand-700"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 mt-6 group"
            >
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-xl">
                  👤
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 group-hover:text-brand-600">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Featured image */}
      {featuredImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={450}
            className="w-full rounded-2xl object-cover mt-8"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {content ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-500">No content available.</p>
        )}

        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-brand-50 text-brand-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link href="/posts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}