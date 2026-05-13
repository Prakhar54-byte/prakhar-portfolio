import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import Hero3D from './components/Hero3D';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import MatrixRain from './components/MatrixRain';
import BootScreen from './components/BootScreen';
import VisitorCounter from './components/VisitorCounter';
import Dashboard from './components/Dashboard';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const [booting, setBooting] = useState(true);

  // Handle keyboard shortcut to skip boot
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && booting) {
        setBooting(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [booting]);

  if (window.location.pathname === '/dashboard') {
    return <Dashboard />;
  }

  return (
    <>
      <AnimatePresence>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {/* Main App Content - Renders in background during boot */}
      <div 
        className={`min-h-screen bg-[#0a0e14] grid-bg scanlines ${booting ? 'h-screen overflow-hidden' : ''}`}
      >
      <MatrixRain />
      <Navbar />
      
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero3D />
          <Terminal />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-8 text-center">
        <p className="text-gray-500 text-sm">
          <span className="text-green-400">$</span> echo "Built with 💚 by Prakhar Chauhan"
        </p>
        <p className="text-gray-600 text-xs mt-2">
          © 2026 | IIT Jodhpur
        </p>
        <VisitorCounter />
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
    </>
  );
}

export default App;
