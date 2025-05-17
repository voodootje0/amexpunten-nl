import { Metadata } from 'next';
import { getCategories } from '@/lib/blog';
import Layout from '../../../components/Layout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Categorieën | Amex Punten',
  description: 'Bekijk alle blog categorieën over Amex punten, creditcards en meer.',
  openGraph: {
    title: 'Blog Categorieën | Amex Punten',
    description: 'Bekijk alle blog categorieën over Amex punten, creditcards en meer.',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Amex Punten',
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Layout
      title="Blog Categorieën | Amex Punten"
      description="Bekijk alle blog categorieën over Amex punten, creditcards en meer."
      showHero={true}
      heroTitle="Blog Categorieën"
      heroDescription="Bekijk alle blog categorieën over Amex punten, creditcards en meer."
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-gray-600 line-clamp-3">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
} 