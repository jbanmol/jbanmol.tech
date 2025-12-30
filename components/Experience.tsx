import React, { useRef } from 'react';
import { experiences } from '../constants';
import type { Experience as ExperienceType } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SectionTitle: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <h2 id={id} className="font-display text-4xl md:text-5xl font-bold text-center text-[var(--text)] mb-16 tracking-tight">{children}</h2>
);

const TimelineItem: React.FC<{ experience: ExperienceType; index: number }> = ({ experience, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });
    const isLeft = index % 2 === 0;

    const animationClass = isLeft ? 'scroll-animate-left' : 'scroll-animate-right';

    return (
        <div ref={ref} className={`relative flex items-center ${isLeft ? 'md:flex-row-reverse' : ''} w-full`}>
            {/* Card */}
            <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                <div
                    className={`interactive-card bg-[var(--surface)] p-8 rounded-lg border backdrop-blur-sm ${animationClass} ${isVisible ? 'is-visible' : ''}`}
                    style={{ borderColor: 'var(--border)', transitionDelay: `${index * 100}ms` }}
                >
                    <time 
                        className="text-xs font-semibold uppercase inline-block mb-3 px-3 py-1 rounded-full font-code"
                        style={{
                            color: 'var(--accent-primary)',
                            backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)'
                        }}
                    >
                        {experience.period}
                    </time>
                    <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-1">{experience.role}</h3>
                    <p className="text-[var(--accent-secondary)] font-medium mb-4">{experience.company}</p>
                    <ul className="list-disc list-inside text-[var(--muted)] space-y-2 text-sm leading-relaxed">
                        {experience.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Empty spacer for the other side */}
             <div className="hidden md:block w-1/2"></div>
            
            {/* The marker on the timeline */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden md:block">
                 <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)', boxShadow: '0 0 12px 2px var(--glow-color)' }}></div>
            </div>
        </div>
    );
};

const Experience: React.FC = () => {
    return (
        <section aria-labelledby="experience-title">
            <SectionTitle id="experience-title">Career Journey</SectionTitle>
            <div className="relative container mx-auto px-6 flex flex-col space-y-8">
                <div 
                    className="absolute z-0 w-1 h-full bg-[var(--border)] shadow-md inset-0 left-1/2 -translate-x-1/2 rounded-full"
                ></div>
                {experiences.map((exp, index) => (
                    <TimelineItem key={index} experience={exp} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Experience;