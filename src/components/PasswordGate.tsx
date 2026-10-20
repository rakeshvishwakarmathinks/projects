import React, { useState, useEffect } from 'react';

interface PasswordGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PasswordGate({ onSuccess, onCancel }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Focus the password input
    const timer = setTimeout(() => {
      const input = document.getElementById('gate-input');
      if (input) {
        input.focus();
      }
      setIsReady(true);
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const PORTFOLIO_PASSWORD = 'rakesh2026';
    if (password.trim() === PORTFOLIO_PASSWORD) {
      // Grant access: write to sessionStorage for tab-session durability
      sessionStorage.setItem('rv_portfolio_auth_token', 'rv_authorized');
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      const input = document.getElementById('gate-input');
      if (input) {
        input.classList.add('animate-shake-gate');
        setTimeout(() => {
          input.classList.remove('animate-shake-gate');
          input.focus();
        }, 400);
      }
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 md:p-8 transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      aria-describedby="gate-desc"
    >
      <div className="w-full max-w-[440px] text-center bg-[#0a0a0d] border border-[#1c1c22] rounded-[26px] p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
        <button 
          onClick={onCancel}
          className="text-white font-display text-[1.75rem] tracking-wider mb-8 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-accent rounded-md transition-opacity duration-fast cursor-pointer"
          aria-label="Cancel and return to home"
        >
          Rakesh<span className="text-accent font-bold">.</span>
        </button>

        <p className="font-mono text-xs tracking-wider uppercase text-accent mb-2 font-semibold">Protected Case Study</p>

        <h2 id="gate-title" className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Enter password to view this work
        </h2>

        <p id="gate-desc" className="text-sm font-normal text-zinc-300 leading-relaxed mb-6">
          This case study contains confidential product details.<br />
          Request access at{' '}
          <a href="mailto:v.raksh777@gmail.com" className="text-accent underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm transition-opacity font-medium">
            v.raksh777@gmail.com
          </a>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <input
            type="password"
            id="gate-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={`w-full py-3.5 px-6 font-mono text-sm tracking-wider text-[#f5f5f7] bg-white/[0.04] border rounded-xl text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
              error ? 'border-red-500 focus:border-red-500' : 'border-[#1c1c22] focus:border-accent'
            }`}
            placeholder="Enter password"
            autoComplete="current-password"
            aria-label="Portfolio password"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "gate-error" : undefined}
          />
          
          <button
            type="submit"
            className="w-full py-3.5 px-6 font-mono text-xs font-semibold tracking-widest uppercase text-white bg-accent hover:bg-accent-hover rounded-xl hover:opacity-95 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-white transition-all shadow-[0_10px_35px_rgba(255,91,79,0.35)] cursor-pointer"
          >
            View Case Study
          </button>
          
          {error && (
            <p id="gate-error" className="font-mono text-xs text-red-400 tracking-wider mt-2 transition-all" role="alert">
              Incorrect password. Try again or get in touch.
            </p>
          )}
        </form>

        <button 
          onClick={onCancel}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[#a1a1aa] hover:text-[#f5f5f7] focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1 mt-6 transition-colors duration-fast cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="w-3 h-3">
            <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to portfolio
        </button>
      </div>
    </div>
  );
}
