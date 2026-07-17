import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Author } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'Authors — My Blog',
  description: 'Meet the writers behind the blog.',
}

export default async function AuthorsPage() {
  const authors: Author[] = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Authors</h1>
      <p className="text-gray-500 mb-10">The creative minds behind the stories.</p>

      {authors.length === 0 ? (
        <p className="text-gray-500">No authors found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}