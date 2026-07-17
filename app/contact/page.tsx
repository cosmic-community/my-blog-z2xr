import { getPage } from '@/lib/cosmic'
import type { Page } from '@/types'
import ContactForm from '@/components/ContactForm'

export const revalidate = 60

export const metadata = {
  title: 'Contact — My Blog',
  description: 'Get in touch with us.',
}

export default async function ContactPage() {
  const page: Page | null = await getPage('contact')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        {page?.title ?? 'Contact'}
      </h1>
      {page?.metadata?.content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 mb-10"
          dangerouslySetInnerHTML={{ __html: page.metadata.content }}
        />
      )}
      <ContactForm />
    </div>
  )
}
