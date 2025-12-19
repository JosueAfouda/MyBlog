export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export interface ConsultantProfile {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
  };
}

// Course System Types

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CourseSession {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: string; // e.g. "10:30"
  videoUrl?: string; // YouTube URL
  content?: string; // MDX content for text lessons
  isFreePreview?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  sessions: CourseSession[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  rating: number;
  numRatings: number;
  studentsCount: number;
  duration: string;
  level: CourseLevel;
  thumbnail: string;
  price: number;
  currency: string;
  topics: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  description: string; // MDX
  sections: CourseSection[];
  updatedAt: string;
}