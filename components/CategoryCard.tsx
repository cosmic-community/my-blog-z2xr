import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="text-3xl mb-3">🏷️</div>
        <h3 className="text-xl font-bold">{name}</h3>
        {description && <p className="mt-2 text-sm text-brand-100 line-clamp-3">{description}</p>}
      </div>
    </Link>
  )
}