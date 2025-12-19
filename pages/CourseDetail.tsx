import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseBySlug } from '../services/courseService';
import { Course, CourseSection } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Star, Clock, BarChart, Globe, Check, PlayCircle, FileText, ChevronDown, ChevronUp, Lock } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Accordion State
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Inline Player State
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (slug) {
        const data = await getCourseBySlug(slug);
        setCourse(data || null);
        // Expand first section by default
        if (data && data.sections.length > 0) {
            setExpandedSections({ [data.sections[0].id]: true });
        }
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [slug]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
    }));
  };

  const handleSessionClick = (url?: string, isFree?: boolean) => {
      if (isFree && url) {
          setActiveVideo(url);
          // Scroll to player
          setTimeout(() => {
            document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
      }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Chargement...</div>;
  if (!course) return <div className="min-h-[60vh] flex items-center justify-center">Cours introuvable</div>;

  return (
    <div className="pb-20">
      {/* 1. Dark Header Banner */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Text Info */}
                <div className="md:col-span-2">
                    <div className="flex gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-400">
                        {course.topics.slice(0,3).map(t => <span key={t}>{t}</span>)}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
                    <p className="text-lg text-slate-300 mb-6">{course.subtitle}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                        <div className="flex items-center text-amber-400">
                            <span className="font-bold mr-1">{course.rating}</span>
                            {[...Array(5)].map((_,i) => <Star key={i} size={14} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />)}
                            <span className="text-slate-400 underline ml-2">({course.numRatings} avis)</span>
                        </div>
                        <span className="text-slate-300">{course.studentsCount} apprenants</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                        <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">A</div> Créé par {course.author}</span>
                        <span className="flex items-center gap-2"><Clock size={16} /> Derniere màj: {course.updatedAt}</span>
                        <span className="flex items-center gap-2"><Globe size={16} /> Français</span>
                    </div>
                </div>

                {/* Desktop Sidebar / Mobile Bottom (Visually hidden here for standard header flow, implemented below for simplicity in this layout) */}
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN (Main Content) */}
        <div className="md:col-span-2 space-y-12">
            
            {/* Active Video Player */}
            {activeVideo && (
                <div id="video-player" className="bg-black rounded-lg overflow-hidden shadow-xl aspect-video mb-8">
                    <iframe 
                        src={activeVideo} 
                        title="Course Player"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {/* 2. What you'll learn */}
            <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ce que vous allez apprendre</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <Check size={16} className="text-brand-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 4. Curriculum */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contenu du cours</h2>
                
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    {course.sections.map((section) => (
                        <div key={section.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                            {/* Section Header */}
                            <button 
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
                                    {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    {section.title}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {section.sessions.length} sessions
                                </div>
                            </button>

                            {/* Sessions List */}
                            {expandedSections[section.id] && (
                                <div className="bg-white dark:bg-slate-950">
                                    {section.sessions.map((session) => (
                                        <div 
                                            key={session.id} 
                                            className={`flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-900 last:border-b-0 ${session.isFreePreview ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900' : 'opacity-75'}`}
                                            onClick={() => handleSessionClick(session.videoUrl, session.isFreePreview)}
                                        >
                                            <div className="flex items-center gap-3">
                                                {session.type === 'video' ? <PlayCircle size={16} className="text-slate-400" /> : <FileText size={16} className="text-slate-400" />}
                                                <span className={`text-sm ${activeVideo === session.videoUrl ? 'text-brand-600 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {session.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs">
                                                {session.isFreePreview ? (
                                                    <span className="text-brand-600 font-medium underline">Aperçu</span>
                                                ) : (
                                                    session.type === 'video' && <Lock size={12} className="text-slate-400" />
                                                )}
                                                <span className="text-slate-500 w-10 text-right">{session.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Requirements */}
            <div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Prérequis</h2>
                 <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                    {course.requirements.map((req, i) => <li key={i}>{req}</li>)}
                 </ul>
            </div>

            {/* 6. Description */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Description</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MarkdownRenderer content={course.description} />
                </div>
            </div>

        </div>

        {/* RIGHT COLUMN (Sticky Sidebar for CTA) */}
        <div className="md:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg overflow-hidden p-6">
                 {/* Video Preview Image */}
                <div className="relative aspect-video rounded-md overflow-hidden mb-6 group cursor-pointer" onClick={() => course.sections[0].sessions[0].isFreePreview && handleSessionClick(course.sections[0].sessions[0].videoUrl, true)}>
                    <img src={course.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <PlayCircle size={24} className="text-black ml-1" />
                        </div>
                    </div>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {course.price === 0 ? "Gratuit" : `${course.price} €`}
                </div>

                <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-md transition-colors mb-4 shadow-md shadow-brand-500/20">
                    {course.price === 0 ? "S'inscrire maintenant" : "Ajouter au panier"}
                </button>
                
                <p className="text-xs text-center text-slate-500 mb-6">Garantie satisfait ou remboursé de 30 jours</p>

                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 dark:text-white">Ce cours comprend :</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={16} /> <span>{course.duration} de vidéo à la demande</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FileText size={16} /> <span>Accès complet à vie</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <Globe size={16} /> <span>Accès sur mobile et TV</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;