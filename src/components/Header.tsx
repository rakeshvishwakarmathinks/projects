import { useState, useEffect } from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Header({ currentPage: _currentPage, onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
  };

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
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-2.5 bg-black/90 backdrop-blur-xl border-b border-[#1c1c22] px-4 md:px-0' 
            : 'py-4 bg-transparent border-b border-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="font-display text-[1.525rem] tracking-wider transition-opacity duration-fast text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 text-white hover:opacity-85"
              aria-label="Rakesh Vishwakarma, Home"
            >
              Rakesh<span className="text-accent font-bold">.</span>
            </button>

            {/* Desktop/Mobile Navigation Right: Email Copy Button */}
            <div className="flex items-center">
              <button 
                type="button"
                onClick={handleCopyEmail}
                className={`font-mono text-xs font-semibold tracking-[0.14em] uppercase py-2 px-5 border rounded-full transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  copied 
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.25)]' 
                    : 'text-white border-white/20 bg-white/[0.04] hover:bg-accent/20 hover:border-accent/60 hover:text-white'
                }`}
                aria-label="Copy email address v.raksh777@gmail.com to clipboard"
                title="Click to copy v.raksh777@gmail.com"
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <span>Email</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
