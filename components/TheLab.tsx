import React from 'react';
import { projects } from '../constants';
import type { Project, Skill } from '../types';
import { X, Github, FlaskConical, Sparkles, Rocket, BookMarked } from 'lucide-react';

interface TheLabProps {
    selectedSkill: Skill | null;
    onClearFilter: () => void;
}

type ProjectStatus = 'production' | 'prototype' | 'research' | 'sketch';

interface LabProject extends Project {
  status?: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  production: { label: 'Live', icon: Rocket, color: 'var(--accent-primary)' },
  prototype: { label: 'Beta', icon: FlaskConical, color: 'var(--accent-secondary)' },
  research: { label: 'Research', icon: BookMarked, color: 'var(--accent-tertiary)' },
  sketch: { label: 'Exploring', icon: Sparkles, color: 'var(--muted)' }
};

const labProjects: LabProject[] = projects.map((p, idx) => ({
  ...p,
  status: idx === 0 ? 'production' : idx === 1 ? 'prototype' : idx === 2 ? 'research' : 'production'
}));

const ProjectCard: React.FC<{ project: LabProject }> = ({ project }) => {
  const status = project.status || 'production';
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <div 
        className="interactive-card bg-[var(--surface)] backdrop-blur-sm rounded-lg overflow-hidden border group flex flex-col h-full relative"
        style={{ borderColor: 'var(--border)' }}
    >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {project.repoUrl && (
                <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[var(--surface)] border text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all shadow-sm"
                    style={{ borderColor: 'var(--border)' }}
                    aria-label={`View ${project.title} on GitHub`}
                >
                    <Github size={18} />
                </a>
            )}
        </div>

        <div className="p-6 flex-grow">
            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)' }}>
                    <div style={{ color: statusConfig[status].color }}>
                        <StatusIcon size={20} />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text)] mb-1 font-serif">{project.title}</h3>
                    <span 
                        className="inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{
                            color: statusConfig[status].color,
                            backgroundColor: `${statusConfig[status].color}15`,
                            border: `1px solid ${statusConfig[status].color}40`
                        }}
                    >
                        {statusConfig[status].label}
                    </span>
                </div>
            </div>
            <p className="text-[var(--muted)] leading-relaxed">{project.description}</p>
        </div>
        
        <div 
            className="p-6 border-t" 
            style={{ borderColor: 'var(--border)' }}
        >
             <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                    <span 
                        key={index} 
                        className="px-3 py-1 text-xs font-medium rounded-full font-code"
                        style={{
                            color: 'var(--accent-primary)',
                            backgroundColor: 'rgba(var(--accent-primary-rgb), 0.08)',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
};

const TheLab: React.FC<TheLabProps> = ({ selectedSkill, onClearFilter }) => {
  const filteredProjects = selectedSkill
    ? labProjects.filter(p => p.tech.includes(selectedSkill.name))
    : labProjects;

  return (
    <section aria-labelledby="lab-title" className="scroll-animate">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <FlaskConical size={36} className="text-[var(--accent-primary)]" />
          <h2 id="lab-title" className="font-display text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
            The Lab
          </h2>
        </div>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-4 leading-relaxed">
          Experiments in Intelligence & Impact — production systems, prototypes, and research explorations
          at the intersection of AI, clinical science, and human potential.
        </p>
        
        {selectedSkill && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-[var(--text)] text-sm font-medium rounded-full border" style={{ borderColor: 'var(--border)' }}>
                Filtering by: 
                <span className="font-bold text-[var(--accent-primary)]">{selectedSkill.name}</span>
                <button 
                    onClick={onClearFilter}
                    className="ml-2 group p-1 rounded-full hover:bg-[var(--border)] transition-colors"
                    aria-label="Clear filter"
                >
                    <X size={16} className="text-[var(--muted)] group-hover:text-[var(--text)] transition-transform group-hover:rotate-90" />
                </button>
            </div>
        )}
      </div>
      
      {filteredProjects.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
              ))}
          </div>
          
          <div className="mt-12 p-6 rounded-lg border-2 border-dashed text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--accent-primary-rgb), 0.02)' }}>
            <p className="text-[var(--muted)] mb-2">
              🧪 <span className="font-semibold">Research Interests:</span> AGI Safety, Clinical Time Series Analysis, 
              Consciousness Research, Human-AI Collaboration, Ethical ML in Healthcare
            </p>
            <p className="text-sm text-[var(--muted)] italic">
              Always exploring new intersections between technology and human flourishing
            </p>
          </div>
        </>
      ) : (
        <div className="text-center text-[var(--muted)] bg-[var(--surface)] border rounded-lg p-8" style={{ borderColor: 'var(--border)' }}>
            No experiments found for the skill "{selectedSkill?.name}".
        </div>
      )}
    </section>
  );
};

export default TheLab;
