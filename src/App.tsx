import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from './components/MatrixRain';
import BootScreen from './components/BootScreen';
import Navbar from './components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load components for performance
const Hero3D = lazy(() => import('./components/Hero3D'));
const Terminal = lazy(() => import('./components/Terminal'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const VisitorCounter = lazy(() => import('./components/VisitorCounter'));
const Dashboard = lazy(() => import('./components/Dashboard'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 text-green-400 font-mono animate-pulse">
    <span>[ LOADING MODULE... ]</span>
  </div>
);

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
    return (
      <Suspense fallback={<SectionLoader />}>
        <Dashboard />
      </Suspense>
    );
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
          <Suspense fallback={<SectionLoader />}>
            <Hero3D />
            <Terminal />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </Suspense>
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
        <Suspense fallback={null}>
          <VisitorCounter />
        </Suspense>
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
    </>
  );
}

export default App;
