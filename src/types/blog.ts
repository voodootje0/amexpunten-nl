import { LucideIcon } from 'lucide-react';

export interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: Author;
  categoryNames: string[];
  categories: Category[];
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
  featured: boolean;
  featuredImage: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  content?: string;
  readingTime?: number;
}

export interface BlogResponse {
  content: BlogPost[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface BlogPostWithFormattedFields extends Omit<BlogPost, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  formattedDate: string;
  formattedReadingTime: string;
}

export interface Step {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Stat {
  value: string;
  label: string;
} 