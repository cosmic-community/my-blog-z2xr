import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import type { Category } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'Categories — My Blog',
  description: 'Browse posts by category.',
}

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Categories</h1>
      <p className="text-gray-500 mb-10">Find posts by topic.</p>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}