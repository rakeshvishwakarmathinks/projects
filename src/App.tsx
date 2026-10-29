import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CaseStudyDetail from './components/CaseStudyDetail';
import PasswordGate from './components/PasswordGate';
import { PageId } from './types';
import { prefetchCaseStudy } from './utils/imagePreloader';

// Helper to translate URLs/Hashes to PageId types safely
function parseHash(hash: string): PageId {
  const normalized = hash.toLowerCase().replace(/^#\/?/, '');
  if (normalized === 'dream11' || normalized === 'cases/dream11') return 'dream11';
  if (normalized === 'motor-parameter' || normalized === 'cases/motor-parameter') return 'motor-parameter';
  if (normalized === 'io-device-builder' || normalized === 'cases/io-device-builder') return 'io-device-builder';
  if (normalized === 'ai-design-to-code' || normalized === 'cases/ai-design-to-code') return 'ai-design-to-code';
  if (normalized === 'opc-ua-explorer' || normalized === 'cases/opc-ua-explorer') return 'opc-ua-explorer';
  return 'home';
}

// Helper to check standard storage session for Case Protection
function checkIsAuthenticated(): boolean {
  try {
    const token = sessionStorage.getItem('rv_portfolio_auth_token');
    return token === 'rv_authorized';
  } catch {
    return false;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [pendingCaseId, setPendingCaseId] = useState<PageId | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const savedHomeScrollRef = useRef<number>(0);

  // Initialize Lenis for smooth scrolling & manage scrollbar visibility during scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      document.documentElement.classList.add('is-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
      }, 850);
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimer);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.classList.remove('is-scrolling');
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top when entering a case study page
  useEffect(() => {
    if (currentPage !== 'home') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [currentPage]);

  // Synchronise state on mount and listen to hash change events
  useEffect(() => {
    const authStatus = checkIsAuthenticated();
    setIsAuthorized(authStatus);
    
    // For a clean portfolio experience, we always start at the main Home page on fresh load or page refresh
    setCurrentPage('home');
    if (window.location.hash !== '') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleHashChange = () => {
      const pageFromHash = parseHash(window.location.hash);
      const isAuthed = checkIsAuthenticated();
      setIsAuthorized(isAuthed);

      if (['dream11', 'motor-parameter', 'io-device-builder', 'ai-design-to-code', 'opc-ua-explorer'].includes(pageFromHash)) {
        if (isAuthed) {
          setCurrentPage(pageFromHash);
        } else {
          if (savedHomeScrollRef.current === 0) {
            savedHomeScrollRef.current = window.scrollY || document.documentElement.scrollTop || 0;
          }
          setPendingCaseId(pageFromHash);
        }
      } else {
        setCurrentPage(pageFromHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle page transitions safely
  const handlePageChange = (page: PageId) => {
    // If user is currently on home, save their scroll position
    if (currentPage === 'home') {
      savedHomeScrollRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    }

    if (page === 'home') {
      if (currentPage === 'home') {
        // Already on home and clicked Logo: smooth scroll to top
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        savedHomeScrollRef.current = 0;
      } else {
        // Returning to home from a case study: restore saved scroll position
        setCurrentPage('home');
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        requestAnimationFrame(() => {
          const returnScroll = savedHomeScrollRef.current;
          if (returnScroll > 0) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(returnScroll, { immediate: true });
            } else {
              window.scrollTo(0, returnScroll);
            }
          }
        });
      }
      return;
    }

    const isProtected = ['dream11', 'motor-parameter', 'io-device-builder', 'ai-design-to-code', 'opc-ua-explorer'].includes(page);
    prefetchCaseStudy(page, 'high');
    
    if (isProtected) {
      const currentlyAuthed = checkIsAuthenticated();
      if (currentlyAuthed) {
        setIsAuthorized(true);
        setCurrentPage(page);
        window.location.hash = `cases/${page}`;
      } else {
        // Open password gate as modal overlay without mutating URL hash (prevents browser scroll-to-top jump)
        setPendingCaseId(page);
      }
    } else {
      setCurrentPage(page);
      window.location.hash = page;
    }
  };

  // Callback on successful PasswordGate submission
  const handlePasswordSuccess = () => {
    setIsAuthorized(true);
    if (pendingCaseId) {
      prefetchCaseStudy(pendingCaseId, 'high');
      setCurrentPage(pendingCaseId);
      window.location.hash = `cases/${pendingCaseId}`;
      setPendingCaseId(null);
    }
  };

  // Callback on PasswordGate rejection or cancellation
  const handlePasswordCancel = () => {
    const returnScroll = savedHomeScrollRef.current;
    setPendingCaseId(null);
    
    // Clear any hash if present without triggering browser jump to top (#)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Smoothly ensure exact scroll position is maintained
    requestAnimationFrame(() => {
      if (returnScroll > 0) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(returnScroll, { immediate: true });
        } else {
          window.scrollTo(0, returnScroll);
        }
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg selection:bg-accent/35 selection:text-ink">
      {/* Accessibility Skip content Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Shared Header Navigation */}
      <Header currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Main Pages Switchboard */}
      <div id="main-content" className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onPageChange={handlePageChange} onCaseSelect={handlePageChange} />
        )}

        {['dream11', 'motor-parameter', 'io-device-builder', 'ai-design-to-code', 'opc-ua-explorer'].includes(currentPage) && (
          <CaseStudyDetail caseId={currentPage} onPageChange={handlePageChange} />
        )}
      </div>

      {/* Shared Editorial Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Prompt Gate Overlay when triggered */}
      {pendingCaseId && (
        <PasswordGate 
          onSuccess={handlePasswordSuccess} 
          onCancel={handlePasswordCancel} 
        />
      )}
    </div>
  );
}
