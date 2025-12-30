import React from 'react';
import { ArrowDown } from 'lucide-react';

const Typewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 80;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  const textStyle = "font-code font-medium text-xl md:text-2xl text-[var(--muted)]";
  const cursorStyle = "text-xl md:text-2xl";

  return (
    <span className={`tracking-tight transition-all duration-300 ${textStyle}`}>
      {text}
      <span className={`cursor-blink ${cursorStyle}`} style={{ color: 'var(--accent-primary)'}}>|</span>
    </span>
  );
};


const Hero: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center relative z-10">
        <div className="mb-6">
            <div 
              className="p-1 rounded-full bg-gradient-accent" 
              style={{ boxShadow: '0 0 24px var(--shadow-color)'}}
              onMouseEnter={() => document.body.classList.add('cursor-hidden-by-hover')}
              onMouseLeave={() => document.body.classList.remove('cursor-hidden-by-hover')}
            >
        <img
          src="/assets/IMG_3429.webp"
          alt="Jb Anmol"
          className="w-52 h-52 rounded-full object-cover border-4"
          style={{ borderColor: 'var(--surface)'}}
        />
            </div>
        </div>
        
        <div className="mb-3 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text)] mb-2 tracking-tight">
                Jb Anmol
            </h1>
            <p className="text-lg font-medium text-[var(--muted)] tracking-wide mb-4">
                Data Scientist <span className="mx-2">•</span> Breath Engineer
            </p>
        </div>

        <div className="mb-6 max-w-2xl px-4">
            <p className="font-serif text-2xl md:text-3xl font-semibold text-[var(--accent-tertiary)] leading-relaxed mb-4">
                Architecting Intelligence, Cultivating Consciousness
            </p>
            <p className="text-base text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
                Where rigorous data science meets mindful practice. Building human-centered AI systems
                while exploring the intersection of technology, wellness, and ancient wisdom.
            </p>
        </div>

        <div className="flex items-center justify-center mb-6 text-sm text-[var(--muted)] gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse"></span>
            <span className="font-code">Currently in Bangalore, India</span>
        </div>

        <div className="flex items-center justify-center mb-8 gap-4">
            <Typewriter words={[
                "Hi, I'm Anmol() 👋",
                "Python 🐍 and pranayama 🧘",
                "debugs code with mindfulness 🐛✨",
                "builds systems that heal 🏥💚",
                "where ML meets meditation 🤖🕉️",
            ]} />
        </div>

        <a 
            href="#lab" 
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3 font-semibold text-base rounded-full bg-transparent border-2 text-[var(--accent-primary)] border-[var(--accent-primary)] transition-all duration-300 ease-in-out hover:bg-[var(--accent-primary)] hover:text-[var(--text-on-accent)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_-5px_var(--glow-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-[var(--bg)]"
        >
            Explore The Lab
            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
    </div>
  );
};

export default Hero;
