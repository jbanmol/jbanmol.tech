import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Command } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#lab', label: 'The Lab' },
  { href: '#compass', label: 'The Compass' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    const handleHashChange = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-glass backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center py-4">
          <a href="#home" className="text-2xl font-bold tracking-tighter">
            <span className="text-gradient">Jb Anmol</span>
          </a>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-underline text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenCommandPalette}
                className="w-9 h-9 bg-[var(--surface)] border rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Open command palette"
                title="Open Command Palette (Cmd+K)"
              >
                <Command size={20} />
              </button>
              <ThemeToggle />
            </div>
          </nav>
          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hamburger z-50 w-8 h-8 flex flex-col justify-center items-center space-y-1.5 ${isMobileMenuOpen ? 'open' : ''}`}
              aria-label="Toggle navigation menu"
            >
              <div className="hamburger-line line-1 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
              <div className="hamburger-line line-2 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
              <div className="hamburger-line line-3 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
               {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-[var(--text)] hover:text-[var(--accent-primary)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="absolute bottom-16 flex items-center space-x-4">
                  <button
                      onClick={() => { onOpenCommandPalette(); setIsMobileMenuOpen(false); }}
                      className="w-12 h-12 bg-[var(--surface)] border rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                      style={{ borderColor: 'var(--border)' }}
                      aria-label="Open command palette"
                  >
                      <Command size={24} />
                  </button>
                  <ThemeToggle />
              </div>
          </nav>
      </div>
    </>
  );
};

export default Header;