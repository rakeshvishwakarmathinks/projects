import { useState, useEffect } from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const isDarkBg = currentPage === 'home' && !isScrolled;

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

            {/* Desktop/Mobile Navigation Right */}
            <div className="flex items-center">
              <a 
                href="mailto:v.raksh777@gmail.com" 
                className="font-mono text-xs font-semibold tracking-[0.14em] uppercase text-white py-2 px-5 border border-white/20 rounded-full bg-white/[0.04] hover:bg-accent/20 hover:border-accent/60 hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 shadow-sm"
                aria-label="Send email to Rakesh Vishwakarma (v.raksh777@gmail.com)"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
