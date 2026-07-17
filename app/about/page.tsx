import { getPage } from '@/lib/cosmic'
import type { Page } from '@/types'
import { notFound } from 'next/navigation'

export const revalidate = 60

export const metadata = {
  title: 'About — My Blog',
  description: 'Learn more about My Blog.',
}

export default async function AboutPage() {
  const page: Page | null = await getPage('about')

  if (!page) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{page.title}</h1>
      {page.metadata?.content ? (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: page.metadata.content }}
        />
      ) : (
        <p className="text-gray-500">This page has no content yet.</p>
      )}
    </div>
  )
}
