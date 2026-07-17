import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link href={`/authors/${author.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-300 h-full">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 text-3xl">
            👤
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
        {bio && <p className="mt-2 text-sm text-gray-500 line-clamp-3">{bio}</p>}
      </div>
    </Link>
  )
}