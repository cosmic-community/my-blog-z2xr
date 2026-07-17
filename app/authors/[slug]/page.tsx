// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const website = getMetafieldValue(author.metadata?.website)

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={name}
              width={120}
              height={120}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-5"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5 text-4xl">
              👤
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{name}</h1>
          {bio && <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{bio}</p>}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Visit website →
            </a>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts by {name}</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts by this author yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <div className="mt-12">
          <Link href="/authors" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ← Back to all authors
          </Link>
        </div>
      </div>
    </div>
  )
}