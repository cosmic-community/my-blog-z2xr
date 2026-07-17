export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {year} My Blog. Crafted with care.</p>
      </div>
    </footer>
  )
}