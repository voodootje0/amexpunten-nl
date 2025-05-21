import { Metadata } from 'next';
import { getBlogPostsByCategory, getCategory } from '@/lib/blog';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type CategoryParams = Promise<{ slug: string }>;
type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

interface CategoryPageProps {
  params: CategoryParams;
  searchParams: SearchParamsType;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategory(slug);
  
  if (!category) {
    return {
      title: 'Categorie niet gevonden | Amex Punten',
      description: 'De opgevraagde categorie kon niet worden gevonden.',
    };
  }

  return {
    title: `${category.name} | Amex Punten Blog`,
    description: category.description || `Bekijk alle artikelen over ${category.name} op Amex Punten.`,
    openGraph: {
      title: `${category.name} | Amex Punten Blog`,
      description: category.description || `Bekijk alle artikelen over ${category.name} op Amex Punten.`,
      type: 'website',
      locale: 'nl_NL',
      siteName: 'Amex Punten',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(slug);

  return (
    <Layout
      title={`${category.name} | Amex Punten Blog`}
      description={category.description || `Bekijk alle artikelen over ${category.name} op Amex Punten.`}
      showHero={true}
      heroTitle={category.name}
      heroDescription={category.description}
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.featuredImage && (
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.readingTime && (
                    <span>{post.readingTime} min lezen</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  );
} 