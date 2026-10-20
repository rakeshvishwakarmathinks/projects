import React from 'react';
import { PageId } from '../types';
import { downloadResume } from '../utils/resumeDownloader';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-black text-white py-16 border-t border-[#1c1c22]" aria-label="Site footer">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <button 
            onClick={() => {
              onPageChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-[1.375rem] tracking-wider text-white hover:opacity-80 transition-opacity duration-fast text-left"
          >
            Rakesh<span className="text-accent font-bold">.</span>
          </button>
          
          <div className="flex flex-wrap gap-8 items-center">
            <a href="mailto:v.raksh777@gmail.com" className="font-mono text-xs tracking-widest uppercase text-zinc-300 hover:text-accent transition-colors duration-fast">
              Email
            </a>
            <a href="https://www.linkedin.com/in/rakeshvishwakarma95/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase text-zinc-300 hover:text-accent transition-colors duration-fast">
              LinkedIn
            </a>
            <a href="https://www.behance.net/rakeshvishwakarma" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase text-zinc-300 hover:text-accent transition-colors duration-fast">
              Behance
            </a>
            <button 
              onClick={downloadResume} 
              className="font-mono text-xs tracking-widest uppercase text-zinc-300 hover:text-accent transition-colors duration-fast flex items-center gap-1 cursor-pointer"
            >
              Resume 
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        <p className="w-full font-mono text-xs tracking-wider text-zinc-400 mt-12 pt-6 border-t border-[#1c1c22]">
          © 2026 Rakesh Vishwakarma · Designed and coded with intention · Bangalore, India
        </p>
      </div>
    </footer>
  );
}
