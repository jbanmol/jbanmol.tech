import React from 'react';
import { skills } from '../constants';
import type { Skill } from '../types';

interface SkillsProps {
    onSkillSelect: (skill: Skill) => void;
    selectedSkill: Skill | null;
}

const SectionTitle: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <h2 id={id} className="font-display text-4xl md:text-5xl font-bold text-center text-[var(--text)] mb-12 tracking-tight">{children}</h2>
);


const Skills: React.FC<SkillsProps> = ({ onSkillSelect, selectedSkill }) => {
  return (
    <section aria-labelledby="skills-title" className="scroll-animate">
        <SectionTitle id="skills-title">Technical Toolkit</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill) => (
                <button
                    key={skill.name}
                    onClick={() => onSkillSelect(skill)}
                    className={`interactive-card group flex flex-col items-center justify-center p-6 bg-[var(--surface)] backdrop-blur-sm rounded-lg border text-left w-full transition-all duration-300 ${selectedSkill?.name === skill.name ? 'border-[var(--accent-primary)] shadow-[0_0_20px_var(--glow-color)] bg-[rgba(var(--accent-primary-rgb),0.05)]' : ''}`}
                    style={{ borderColor: selectedSkill?.name === skill.name ? 'var(--accent-primary)' : 'var(--border)' }}
                    aria-pressed={selectedSkill?.name === skill.name}
                >
                    <skill.icon className="w-10 h-10 mb-3 text-[var(--muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
                    <span className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--text)] transition-colors text-center">{skill.name}</span>
                </button>
            ))}
        </div>
    </section>
  );
};

export default Skills;