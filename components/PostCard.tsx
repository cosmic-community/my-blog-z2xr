import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const authorName = author
    ? getMetafieldValue(author.metadata?.name) || author.title
    : null
  const avatar = author?.metadata?.avatar

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {featuredImage ? (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200" />
        )}
        <div className="p-5 flex flex-col flex-1">
          {category && (
            <span className="inline-block self-start text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {title}
          </h3>
          {author && (
            <div className="mt-auto pt-4 flex items-center gap-2">
              {avatar ? (
                <img
                  src={`${avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={authorName ?? ''}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 text-sm">
                  👤
                </div>
              )}
              <p className="text-sm text-gray-500">By {authorName}</p>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}