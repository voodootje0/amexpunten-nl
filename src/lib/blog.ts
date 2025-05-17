import { BlogPost, Category } from '@/types/blog';
import { getBaseUrl } from './utils';

// Helper function to calculate word count
function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

// Helper function to calculate reading time (assuming 200 words per minute)
function getReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

// Helper function to get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug);
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/data/blog/categories.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    // Extract the categories array from the response
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array in case of error during build
    return [];
  }
}

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/data/blog/posts.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const posts = await response.json();
    
    // Get all categories to map category names to actual category objects
    const categories = await getCategories();
    
    // Fetch content for each post with error handling
    const postsWithContent = await Promise.all(
      posts.map(async (post: BlogPost) => {
        try {
          // Map category names to actual category objects
          const postCategories = post.categoryNames?.map(name => {
            return categories.find(cat => cat.name === name) || {
              id: 0,
              name,
              slug: name.toLowerCase().replace(/\s+/g, '-'),
              description: ''
            };
          }) || [];
          
          const contentResponse = await fetch(`${baseUrl}/data/blog/${post.slug}.json`);
          if (!contentResponse.ok) {
            // Just return the post without content if content fetch fails
            return {
              ...post,
              content: '',
              readingTime: 1,
              categories: postCategories
            };
          }
          const content = await contentResponse.json();
          
          // Calculate reading time
          const wordCount = getWordCount(content.content || '');
          const readingTime = getReadingTime(wordCount);
          
          return {
            ...post,
            content: content.content || '',
            readingTime,
            categories: postCategories
          };
        } catch (error) {
          console.error(`Error fetching content for ${post.slug}:`, error);
          // Return post without content on error
          return {
            ...post,
            content: '',
            readingTime: 1,
            categories: []
          };
        }
      })
    );
    
    return postsWithContent;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array in case of error during build
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPosts();
    const category = await getCategory(categorySlug);
    
    if (!category) {
      console.warn(`Category with slug "${categorySlug}" not found`);
      return [];
    }
    
    // Filter posts by the category slug
    return posts.filter(post => 
      post.categories?.some(cat => cat.slug === categorySlug)
    );
  } catch (error) {
    console.error(`Error getting posts for category ${categorySlug}:`, error);
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug);
} 