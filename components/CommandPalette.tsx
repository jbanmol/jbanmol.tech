import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Briefcase, Lightbulb, FlaskConical, Compass as CompassIcon, Phone, Moon, Sun, Github, Linkedin, Mail, Search, X, GraduationCap, MousePointerClick } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCursorEnabled: boolean;
  toggleCursor: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen, isCursorEnabled, toggleCursor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const commands = [
    { name: 'Go to Home', section: 'Navigation', icon: Home, action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to About', section: 'Navigation', icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to Experience', section: 'Navigation', icon: Briefcase, action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to Skills', section: 'Navigation', icon: Lightbulb, action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to The Lab', section: 'Navigation', icon: FlaskConical, action: () => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to The Compass', section: 'Navigation', icon: CompassIcon, action: () => document.getElementById('compass')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to Contact', section: 'Navigation', icon: Phone, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Toggle Theme', section: 'Actions', icon: theme === 'dark' ? Sun : Moon, action: toggleTheme },
    { name: `Toggle Cursor Effect (${isCursorEnabled ? 'On' : 'Off'})`, section: 'Actions', icon: MousePointerClick, action: toggleCursor },
    { name: 'Open GitHub', section: 'Socials', icon: Github, action: () => window.open('https://github.com/jbanmol', '_blank') },
    { name: 'Open LinkedIn', section: 'Socials', icon: Linkedin, action: () => window.open('https://linkedin.com/in/jbanmol', '_blank') },
    { name: 'Send Email', section: 'Socials', icon: Mail, action: () => window.location.href = 'mailto:jbanmol9@gmail.com' },
    { name: 'Open IITM Profile', section: 'Socials', icon: GraduationCap, action: () => window.open('https://app.onlinedegree.iitm.ac.in/student/23F1001015', '_blank') },
  ];

  const filteredCommands = commands.filter(command =>
    command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter' && activeIndex < filteredCommands.length) {
          handleCommand(filteredCommands[activeIndex]);
        } else if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands]);
  
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setActiveIndex(0);
    } else {
        setSearchTerm('');
    }
  }, [isOpen]);

  const handleCommand = (command: typeof commands[0]) => {
    command.action();
    setIsOpen(false);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div 
        ref={modalRef} 
        className="relative z-10 w-full max-w-lg bg-[var(--surface)] border rounded-lg shadow-2xl overflow-hidden" 
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <Search className="w-5 h-5 text-[var(--muted)] mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-[var(--text)] placeholder-[var(--muted)] outline-none"
          />
           <button onClick={() => setIsOpen(false)} className="p-1 text-[var(--muted)] hover:text-[var(--text)]">
              <kbd className="text-xs">esc</kbd>
           </button>
           <button onClick={() => setIsOpen(false)} className="ml-2 p-1 rounded-full text-[var(--muted)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--text)] transition-colors" aria-label="Close command palette">
              <X size={20} />
           </button>
        </div>
        <ul className="p-2 max-h-[400px] overflow-y-auto">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
                <li key={command.name}>
                    <button
                        onClick={() => handleCommand(command)}
                        className={`w-full flex items-center justify-between p-3 rounded-md text-left text-sm transition-colors ${activeIndex === index ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)]' : 'text-[var(--text)] hover:bg-[var(--surface)]'}`}
                        onMouseMove={() => setActiveIndex(index)}
                    >
                      <div className="flex items-center">
                        <command.icon className={`w-4 h-4 mr-3 ${activeIndex === index ? 'text-[var(--text-on-accent)]' : 'text-[var(--muted)]'}`} />
                        {command.name}
                      </div>
                      <span className={`text-xs ${activeIndex === index ? 'text-[var(--text-on-accent)] opacity-70' : 'text-[var(--muted)]'}`}>{command.section}</span>
                    </button>
                </li>
            ))
          ) : (
             <li className="p-4 text-center text-sm text-[var(--muted)]">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;