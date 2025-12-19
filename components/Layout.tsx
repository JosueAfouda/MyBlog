import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Sun, Moon, Menu, X, Github, Linkedin, Youtube } from 'lucide-react';
import { PROFILE } from '../services/blogService';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Articles', path: '/' },
    { name: 'Cours / Projets', path: '/courses' },
    { name: 'À Propos', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-yellow-200 dark:selection:bg-brand-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-md transition-transform group-hover:scale-105">
                <Terminal size={20} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {PROFILE.name.split(' ')[0]}
                <span className="text-slate-500 font-normal">.data</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
               <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-900 dark:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                 <a href={PROFILE.socials.github} className="text-slate-500"><Github size={20} /></a>
                 <a href={PROFILE.socials.linkedin} className="text-slate-500"><Linkedin size={20} /></a>
                 <a href={PROFILE.socials.youtube} className="text-slate-500"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-900 dark:text-white">{PROFILE.name}</p>
            <p className="text-sm text-slate-500 mt-1">
              Data & AI Consultant. Building value from raw data.
            </p>
          </div>
          <div className="flex gap-6 text-slate-500">
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
            <a href={PROFILE.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;