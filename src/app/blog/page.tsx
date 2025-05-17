import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import Layout from '../../components/Layout';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Amex Punten',
  description: 'Ontdek tips en trucs voor het optimaal benutten van je Amex punten, creditcard voordelen en meer.',
  openGraph: {
    title: 'Blog | Amex Punten',
    description: 'Ontdek tips en trucs voor het optimaal benutten van je Amex punten, creditcard voordelen en meer.',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Amex Punten',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Get all unique categories
  const categories = Array.from(
    new Set(posts.flatMap(post => post.categories || []))
  );

  return (
    <Layout
      title="Blog | Amex Punten"
      description="Ontdek tips en trucs voor het optimaal benutten van je Amex punten, creditcard voordelen en meer."
      showHero={true}
      heroTitle="Amex Punten Blog"
      heroDescription="Ontdek tips en trucs voor het optimaal benutten van je Amex punten, creditcard voordelen en meer."
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Section */}
        <section aria-label="Categories" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categorieën</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-400 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section aria-label="Blog posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((post: BlogPost) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {post.featuredImage && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
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
        </section>
      </main>
    </Layout>
  );
} 