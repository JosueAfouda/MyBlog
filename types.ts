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