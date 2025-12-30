import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import TheLab from './components/TheLab';
import Compass from './components/Compass';
import AskAnmolAI from './components/AskAnmolAI';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import type { Skill } from './types';

function App() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState(() => {
    const storedValue = localStorage.getItem('isCursorEnabled');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const handleSkillSelect = (skill: Skill | null) => {
    setSelectedSkill(skill);
  };
  
  const toggleCursor = () => {
    setIsCursorEnabled((prev: boolean) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isCursorEnabled', JSON.stringify(isCursorEnabled));
    document.body.classList.toggle('custom-cursor-disabled', !isCursorEnabled);
  }, [isCursorEnabled]);

  useEffect(() => {
    if (selectedSkill) {
      document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSkill]);
  
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <CustomCursor isCursorEnabled={isCursorEnabled} />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen}
        isCursorEnabled={isCursorEnabled}
        toggleCursor={toggleCursor}
      />
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <div id="home" className="h-screen min-h-[700px] flex items-center justify-center">
          <Hero />
        </div>
        <div className="space-y-40 md:space-y-48 py-32">
          <div id="about">
            <About />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="skills">
            <Skills onSkillSelect={handleSkillSelect} selectedSkill={selectedSkill} />
          </div>
          <div id="lab">
            <TheLab selectedSkill={selectedSkill} onClearFilter={() => handleSkillSelect(null)} />
          </div>
          <div id="compass">
            <Compass />
          </div>
          <div id="contact">
            <AskAnmolAI />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;