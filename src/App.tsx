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

function App() {
  const [loading, setLoading] = useState(true);
  const [bootText, setBootText] = useState<string[]>([]);

  const bootSequence = [
    '> Initializing system...',
    '> Loading kernel modules...',
    '> Mounting filesystems...',
    '> Starting network services...',
    '> Loading portfolio data...',
    '> Authenticating user: Prakhar Chauhan',
    '> Access granted.',
    '> Welcome to prakhar.terminal v2.0',
    '> System ready.'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        const currentText = bootSequence[index];
        setBootText(prev => [...prev, currentText]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center p-8">
        <div className="terminal-window w-full max-w-2xl">
          <div className="terminal-header flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm">boot_sequence.sh</span>
          </div>
          <div className="p-6 font-mono text-sm">
            {bootText.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-1 ${text?.includes('granted') || text?.includes('ready') ? 'text-green-400 glow-text' : 'text-gray-300'}`}
              >
                {text}
              </motion.div>
            ))}
            <span className="typing-cursor text-green-400"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] grid-bg scanlines">
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
      </footer>
    </div>
  );
}

export default App;
