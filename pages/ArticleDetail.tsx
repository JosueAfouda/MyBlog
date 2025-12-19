import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../services/blogService';
import { BlogPost } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (slug) {
        const data = await getPostBySlug(slug);
        setPost(data || null);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [slug]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center text-slate-500">Chargement...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <p className="text-slate-600 mb-8">Article introuvable.</p>
        <Link to="/" className="text-brand-600 hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pt-12 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-600 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Retour
            </Link>
            
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                {post.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-500 text-sm">
                <span className="flex items-center gap-2">
                    <Calendar size={16} /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                    <Clock size={16} /> {post.readTime}
                </span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        <MarkdownRenderer content={post.content} />
        
        {/* Footer of article */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
                <div className="text-slate-900 dark:text-white font-bold">
                    Merci de votre lecture.
                </div>
                <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Share2 size={18} /> <span className="text-sm">Partager</span>
                </button>
            </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;