import React from 'react';
import { PROFILE } from '../services/blogService';
import { Briefcase, BookOpen, Coffee, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <img 
            src={PROFILE.avatarUrl} 
            alt={PROFILE.name} 
            className="w-32 h-32 rounded-full grayscale object-cover ring-4 ring-slate-100 dark:ring-slate-800"
        />
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{PROFILE.name}</h1>
            <p className="text-xl text-brand-600 font-medium">{PROFILE.role}</p>
        </div>
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert font-serif">
        <p className="lead text-xl text-slate-600 dark:text-slate-300">
            Bienvenue. Je suis un consultant spécialisé dans la stack Data moderne. Je construis des ponts entre la complexité technique et les besoins business.
        </p>

        <h3>Mon Parcours</h3>
        <p>
            Après 5 ans passés en start-up et en grand groupe à gérer des pipelines de données critiques, j'ai décidé de devenir indépendant pour accompagner plus d'équipes vers l'excellence opérationnelle.
        </p>
        <p>
            Je ne suis pas qu'un technicien. Je suis un pédagogue. J'aime expliquer le "pourquoi" avant le "comment".
        </p>

        <h3>Services</h3>
        <ul className="list-none pl-0 space-y-4 not-prose mt-8">
            <li className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <Briefcase className="text-brand-500 mt-1 flex-shrink-0" />
                <div>
                    <strong className="block text-slate-900 dark:text-white font-sans">Audit & Architecture</strong>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-sans">Optimisation de vos coûts BigQuery/Snowflake et design de votre Modern Data Stack.</span>
                </div>
            </li>
            <li className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <BookOpen className="text-brand-500 mt-1 flex-shrink-0" />
                <div>
                    <strong className="block text-slate-900 dark:text-white font-sans">Mentorat & Formation</strong>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-sans">Montée en compétence de vos équipes Data Juniors sur Python, SQL et l'Engineering.</span>
                </div>
            </li>
            <li className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <Coffee className="text-brand-500 mt-1 flex-shrink-0" />
                <div>
                    <strong className="block text-slate-900 dark:text-white font-sans">Développement MVP IA</strong>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-sans">Prototypage rapide d'applications RAG (Retrieval Augmented Generation) pour vos besoins internes.</span>
                </div>
            </li>
        </ul>

        <div className="mt-12 p-6 bg-brand-50 dark:bg-slate-900 rounded-xl border border-brand-100 dark:border-slate-800 text-center">
            <h3 className="mt-0 font-sans text-brand-900 dark:text-white">Un projet en tête ?</h3>
            <p className="font-sans mb-6 text-brand-800 dark:text-slate-300">
                Discutons de vos enjeux Data autour d'un café virtuel.
            </p>
            <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full font-sans font-bold hover:bg-brand-700 transition-colors no-underline">
                <Mail size={18} /> Me contacter
            </a>
        </div>
      </div>
    </div>
  );
};

export default About;