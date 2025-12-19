import { BlogPost, ConsultantProfile } from '../types';
import { parseMDX, calculateReadingTime } from '../utils/mdxParser';

// In a real Next.js app, we would use 'fs' to read the directory.
// Here we import the files directly to simulate the file system.
import { source as post1 } from '../content/posts/python-vs-r-2024';
import { source as post2 } from '../content/posts/optimiser-sql-bigquery';
import { source as post3 } from '../content/posts/devenir-freelance-data';

export const PROFILE: ConsultantProfile = {
  name: "Alexandre Data",
  role: "Consultant Data & AI | Freelance",
  bio: "J'aide les entreprises à transformer leurs données en levier de croissance. Expert Python, Modern Data Stack & IA. Pédagogue dans l'âme, je partage ici mes retours d'expérience terrain.",
  avatarUrl: "https://picsum.photos/id/64/200/200",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    youtube: "https://youtube.com"
  }
};

// Registry of raw files (simulating fs.readdir)
const RAW_POSTS = {
  'python-vs-r-2024': post1,
  'optimiser-sql-bigquery': post2,
  'devenir-freelance-data': post3,
};

// Process posts once
const ALL_POSTS: BlogPost[] = Object.entries(RAW_POSTS).map(([slug, source]) => {
  const { metadata, content } = parseMDX(source);
  return {
    id: slug,
    slug: slug,
    title: metadata.title || 'Untitled',
    excerpt: metadata.excerpt || '',
    date: metadata.date || new Date().toISOString().split('T')[0],
    tags: metadata.tags || [],
    coverImage: metadata.coverImage,
    readTime: calculateReadingTime(content),
    content: content
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPosts = async (): Promise<BlogPost[]> => {
  // Simulate network/IO delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_POSTS), 200);
  });
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_POSTS.find(p => p.slug === slug)), 200);
  });
};

export const getRelatedPosts = async (currentId: string): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(ALL_POSTS.filter(p => p.id !== currentId).slice(0, 2)), 200);
    });
}