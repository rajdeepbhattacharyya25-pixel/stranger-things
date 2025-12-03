import React from 'react';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { PortalSection } from './components/PortalSection';
import { CursorParticles } from './components/CursorParticles';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-st-red selection:text-white">
      <CursorParticles />
      <main>
        <Hero />
        <InfoSection />
        <PortalSection />
      </main>
      
      <footer className="py-8 text-center border-t border-gray-900 bg-black">
        <p className="font-body text-xs text-gray-600 uppercase tracking-widest">
          Stranger Things &copy; Netflix. Fan Concept by Developer.
        </p>
      </footer>
    </div>
  );
};

export default App;