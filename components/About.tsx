import React from 'react';
import { GraduationCap, Sparkles, Target } from 'lucide-react';

const SectionTitle: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <h2 id={id} className="font-display text-4xl md:text-5xl font-bold text-center text-[var(--text)] mb-12 tracking-tight">{children}</h2>
);

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div 
        className="interactive-card bg-[var(--surface)] p-8 rounded-lg border backdrop-blur-sm"
        style={{ borderColor: 'var(--border)' }}
    >
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 card-hover-text" style={{ backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)'}}>
              <span className="text-[var(--accent-primary)]">{icon}</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[var(--text)] card-hover-text">{title}</h3>
        </div>
        <p className="text-[var(--muted)] leading-relaxed">{children}</p>
    </div>
);

const About: React.FC = () => {
    return (
        <section aria-labelledby="about-title">
            <SectionTitle id="about-title">About Me</SectionTitle>
            <div className="grid md:grid-cols-3 gap-8">
                <InfoCard icon={<Sparkles size={24} />} title="Passion">
                    Leveraging AI to unlock human potential, particularly in medical sciences. I'm driven by the challenge of translating complex data into meaningful, real-world impact.
                </InfoCard>
                <InfoCard icon={<GraduationCap size={24} />} title="Education">
                    Pursuing a BS in Data Science & Programming at IIT Madras (2023-2026). Maintaining a strong academic record with a current CGPA of 9.1.
                </InfoCard>
                <InfoCard icon={<Target size={24} />} title="Focus">
                    Currently developing data tools for a startup that supports neuro-diverse children, combining my technical skills with a deep interest in clinical time series analysis.
                </InfoCard>
            </div>
        </section>
    );
};

export default About;