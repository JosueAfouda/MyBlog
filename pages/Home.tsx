import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, PROFILE } from '../services/blogService';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));
  const filteredPosts = selectedTag ? posts.filter(p => p.tags.includes(selectedTag)) : posts;

  if (isLoading) {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20 space-y-12">
            {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse space-y-4">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-20 border-b border-slate-200 dark:border-slate-800 pb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          Explorer la Data,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">
            sans artifice.
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-serif leading-relaxed">
          {PROFILE.bio}
        </p>
        
        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button 
             onClick={() => setSelectedTag(null)}
             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!selectedTag ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            Tous
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedTag === tag ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="md:col-span-8 space-y-16">
          {filteredPosts.map(post => (
            <article key={post.id} className="group relative flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                   <Calendar size={12} /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                   <Tag size={12} /> {post.tags[0]}
                </span>
              </div>
              
              <Link to={`/article/${post.slug}`}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 font-serif leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>

              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                   <Clock size={14} /> {post.readTime}
                </span>
                <Link to={`/article/${post.slug}`} className="text-sm font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire l'article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
                Aucun article trouvé pour ce tag.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden md:block md:col-span-4 pl-8 border-l border-slate-100 dark:border-slate-800">
           <div className="sticky top-24">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">À propos</h3>
             <div className="flex items-start gap-4 mb-4">
                <img src={PROFILE.avatarUrl} alt={PROFILE.name} className="w-12 h-12 rounded-full grayscale" />
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{PROFILE.name}</p>
                    <p className="text-xs text-slate-500">{PROFILE.role}</p>
                </div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Expertise technique et vision business. Je partage ici ce que j'apprends sur le terrain.
             </p>
             
             <h3 className="font-bold text-slate-900 dark:text-white mb-4 mt-8">Sujets populaires</h3>
             <div className="flex flex-col gap-2">
                {allTags.slice(0, 5).map(tag => (
                     <div key={tag} className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 cursor-pointer">
                        #{tag}
                     </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;