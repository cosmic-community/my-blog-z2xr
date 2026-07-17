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
            <p className="mt-auto pt-4 text-sm text-gray-500">
              By {getMetafieldValue(author.metadata?.name) || author.title}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}