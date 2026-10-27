import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    const email = 'v.raksh777@gmail.com';
    let success = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        success = true;
      } catch {
        success = false;
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        // clipboard unavailable
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

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
            <button 
              type="button"
              onClick={handleCopyEmail}
              className={`font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-fast cursor-pointer flex items-center gap-1 ${
                copied ? 'text-emerald-400 font-semibold' : 'text-zinc-300 hover:text-accent'
              }`}
              title="Click to copy v.raksh777@gmail.com"
              aria-label="Copy email address"
            >
              {copied ? '✓ Copied!' : 'Email'}
            </button>
            <a href="https://www.linkedin.com/in/rakeshvishwakarma95/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.18em] uppercase text-zinc-300 hover:text-accent transition-colors duration-fast">
              LinkedIn
            </a>
            <a href="https://www.behance.net/rakeshvishwakarma" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.18em] uppercase text-zinc-300 hover:text-accent transition-colors duration-fast">
              Behance
            </a>
          </div>
        </div>

        <p className="w-full font-mono text-xs tracking-wider text-zinc-400 mt-12 pt-6 border-t border-[#1c1c22]">
          © 2026 Rakesh Vishwakarma · Designed and coded with intention · Bangalore, India
        </p>
      </div>
    </footer>
  );
}
