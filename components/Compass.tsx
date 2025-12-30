import React from 'react';
import { Sparkles, Flower2, Mountain, BookOpen, Infinity, Network, Heart, GitBranch, Brain } from 'lucide-react';

interface CompassItem {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  symbol: string;
}

const compassItems: CompassItem[] = [
  {
    title: "Vedic Astrology",
    icon: Sparkles,
    description: "Pattern recognition in cosmic cycles and human behavior",
    symbol: "☆"
  },
  {
    title: "Hatha Yoga",
    icon: Flower2,
    description: "Embodied discipline, breath work, and mindful movement",
    symbol: "🕉"
  },
  {
    title: "Japandi Aesthetics",
    icon: Mountain,
    description: "Minimalism meets warmth, intentional design, and negative space",
    symbol: "⛩"
  },
  {
    title: "Stoic Philosophy",
    icon: BookOpen,
    description: "Rational clarity, acceptance, and virtuous action",
    symbol: "Φ"
  },
  {
    title: "Buddhist Mindfulness",
    icon: Infinity,
    description: "Present-moment awareness and compassionate observation",
    symbol: "☸"
  },
  {
    title: "Systems Thinking",
    icon: Network,
    description: "Interconnection, emergence, and holistic problem-solving",
    symbol: "∞"
  },
  {
    title: "Clinical Ethics",
    icon: Heart,
    description: "Human-centered impact and responsible healthcare innovation",
    symbol: "♡"
  },
  {
    title: "Open Source Values",
    icon: GitBranch,
    description: "Shared knowledge, collaboration, and transparent iteration",
    symbol: "⎇"
  },
  {
    title: "AGI Futures",
    icon: Brain,
    description: "Responsible intelligence design and consciousness research",
    symbol: "⚡"
  }
];

const CompassCard: React.FC<{ item: CompassItem }> = ({ item }) => {
  const Icon = item.icon;
  
  return (
    <div 
      className="group interactive-card bg-[var(--surface)] p-6 rounded-lg border backdrop-blur-sm relative overflow-hidden min-h-[200px] flex flex-col items-center justify-center text-center"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-3 text-4xl text-[var(--accent-secondary)] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {item.symbol}
        </div>
        
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 card-hover-text" 
             style={{ backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)'}}>
          <Icon size={20} className="text-[var(--accent-primary)]" />
        </div>
        
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-2 card-hover-text">
          {item.title}
        </h3>
        
        <p className="text-sm text-[var(--muted)] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Compass: React.FC = () => {
  return (
    <section aria-labelledby="compass-title" className="scroll-animate">
      <div className="text-center mb-12">
        <h2 id="compass-title" className="font-display text-4xl md:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
          The Compass
        </h2>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          The philosophies, practices, and aesthetics that guide my work and life—
          a constellation of influences blending ancient wisdom with modern innovation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {compassItems.map((item, index) => (
          <CompassCard key={index} item={item} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-block px-6 py-3 rounded-full border-2 border-dashed" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm text-[var(--muted)] font-code">
            "The whole is greater than the sum of its parts" — Aristotle
          </p>
        </div>
      </div>
    </section>
  );
};

export default Compass;
