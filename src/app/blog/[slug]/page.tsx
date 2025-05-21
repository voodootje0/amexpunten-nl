import { Metadata } from 'next';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Artikel niet gevonden | Amex Punten',
      description: 'Het opgevraagde artikel kon niet worden gevonden.',
    };
  }

  return {
    title: `${post.title} | Amex Punten Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Amex Punten Blog`,
      description: post.excerpt,
      type: 'article',
      locale: 'nl_NL',
      siteName: 'Amex Punten',
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout
      title={`${post.title} | Amex Punten Blog`}
      description={post.excerpt}
      showHero={true}
      heroTitle={post.title}
      heroDescription={post.excerpt}
    >
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
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
          
          <div className="p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>

            {/* Meta */}
            <div className="mt-8 pt-8 border-t border-gray-200">
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
          </div>
        </article>
      </main>
    </Layout>
  );
} 