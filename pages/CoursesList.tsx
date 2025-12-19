import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courseService';
import { Course } from '../types';
import { Star, Clock, BarChart } from 'lucide-react';

const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
             <div className="h-8 bg-slate-200 dark:bg-slate-800 w-48 mb-8 rounded"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1, 2].map(i => (
                     <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                 ))}
             </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Cours & Projets Pratiques</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-serif max-w-2xl">
            Des formations axées sur la pratique. Pas de théorie inutile, juste ce qu'il faut pour construire des systèmes Data robustes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
            <Link key={course.id} to={`/courses/${course.slug}`} className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">{course.author}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                        <span className="font-bold text-amber-500 text-sm mr-1">{course.rating}</span>
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} strokeWidth={3} />
                            ))}
                        </div>
                        <span className="text-xs text-slate-400 ml-1">({course.numRatings})</span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
                        {course.subtitle}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3 mb-3">
                        <div className="flex items-center gap-1">
                            <Clock size={12} /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <BarChart size={12} /> {course.level}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-lg text-slate-900 dark:text-white">
                        {course.price === 0 ? "Gratuit" : `${course.price} €`}
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;