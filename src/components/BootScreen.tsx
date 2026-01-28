import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: ':: Synchronizing package databases...', delay: 100 },
  { text: '   core is up to date', delay: 200 },
  { text: '   extra is up to date', delay: 150 },
  { text: '   community is up to date', delay: 150 },
  { text: '   multilib is up to date', delay: 100 },
  { text: '', delay: 50 },
  { text: ':: Starting portfolio services...', delay: 200 },
  { text: '   [OK] Started React Runtime', delay: 150 },
  { text: '   [OK] Started Three.js WebGL Engine', delay: 180 },
  { text: '   [OK] Started Framer Motion Animations', delay: 160 },
  { text: '   [OK] Started TailwindCSS Styling', delay: 140 },
  { text: '   [OK] Mounted /dev/skills', delay: 120 },
  { text: '   [OK] Mounted /dev/projects', delay: 120 },
  { text: '   [OK] Started Matrix Rain Background', delay: 150 },
  { text: '', delay: 50 },
  { text: ':: Loading Prakhar Chauhan Portfolio v2.0...', delay: 300 },
  { text: '', delay: 100 },
  { text: '   ╭─────────────────────────────────────────╮', delay: 50 },
  { text: '   │                                         │', delay: 30 },
  { text: '   │      ██████╗ ██████╗  █████╗           │', delay: 30 },
  { text: '   │      ██╔══██╗██╔══██╗██╔══██╗          │', delay: 30 },
  { text: '   │      ██████╔╝██████╔╝███████║          │', delay: 30 },
  { text: '   │      ██╔═══╝ ██╔══██╗██╔══██║          │', delay: 30 },
  { text: '   │      ██║     ██║  ██║██║  ██║          │', delay: 30 },
  { text: '   │      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝          │', delay: 30 },
  { text: '   │                                         │', delay: 30 },
  { text: '   │     Prakhar Chauhan | IIT Jodhpur      │', delay: 50 },
  { text: '   │         btw, I use Arch Linux          │', delay: 80 },
  { text: '   │                                         │', delay: 30 },
  { text: '   ╰─────────────────────────────────────────╯', delay: 50 },
  { text: '', delay: 100 },
  { text: '[  OK  ] Reached target Portfolio Ready.', delay: 200 },
  { text: '', delay: 100 },
  { text: 'prakhar@arch ~ $ startx', delay: 300 },
];

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentIndex >= bootSequence.length) {
      // Boot complete, wait a moment then transition
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLines(prev => [...prev, bootSequence[currentIndex].text]);
      setCurrentIndex(prev => prev + 1);
    }, bootSequence[currentIndex].delay);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    const container = document.getElementById('boot-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [lines]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Arch Linux Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="text-cyan-400 text-2xl font-bold">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M12 2C9.61 4.22 7.78 6.91 6.54 9.92c1.2.63 2.5 1.02 3.86 1.15-.28-.93-.43-1.9-.43-2.9 0-.2 0-.41.02-.61.89.21 1.82.32 2.76.32.94 0 1.87-.11 2.76-.32.01.2.02.41.02.61 0 1-.15 1.97-.43 2.9 1.36-.13 2.66-.52 3.86-1.15C17.72 6.91 15.89 4.22 12 2zm0 9.07c-.94 0-1.88-.08-2.79-.24.22 1.54.77 3.02 1.63 4.33.33-.09.68-.16 1.03-.23-.06-.53-.1-1.06-.1-1.6 0-.12 0-.24.01-.36.07 0 .15-.01.22-.01s.15 0 .22.01c0 .12.01.24.01.36 0 .54-.03 1.07-.1 1.6.35.07.7.14 1.03.23.86-1.31 1.41-2.79 1.63-4.33-.91.16-1.85.24-2.79.24zm0 4.43c-.23.05-.45.11-.68.17.55.99 1.28 1.87 2.18 2.58-.53-.87-.93-1.8-1.19-2.76-.1 0-.21.01-.31.01zm.68.17c-.26.95-.66 1.89-1.19 2.76.9-.71 1.63-1.59 2.18-2.58-.33-.07-.66-.13-.99-.18zm-1.68 0c.1 0 .21 0 .31.01-.26.96-.66 1.89-1.19 2.76.9-.71 1.63-1.59 2.18-2.58-.43-.1-.87-.15-1.3-.19z"/>
            </svg>
          </div>
          <span className="text-gray-400">Arch Linux</span>
          <span className="text-gray-600 text-sm">6.7.4-arch1-1</span>
        </div>
      </div>

      {/* Boot Messages */}
      <div
        id="boot-container"
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`
              ${line.includes('[OK]') || line.includes('[  OK  ]') ? 'text-green-400' : ''}
              ${line.includes('::') ? 'text-cyan-400 font-bold' : ''}
              ${line.includes('██') || line.includes('╭') || line.includes('╰') || line.includes('│') ? 'text-cyan-400' : ''}
              ${line.includes('btw') ? 'text-pink-400' : ''}
              ${!line.includes('[OK]') && !line.includes('::') && !line.includes('██') && !line.includes('╭') && !line.includes('╰') && !line.includes('│') && !line.includes('btw') && !line.includes('[  OK  ]') ? 'text-gray-400' : ''}
              whitespace-pre
            `}
          >
            {line || '\u00A0'}
          </div>
        ))}
        {currentIndex < bootSequence.length && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
        )}
      </div>

      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute bottom-6 right-6 px-4 py-2 text-sm text-gray-500 hover:text-gray-300 border border-gray-700 rounded hover:border-gray-500 transition-colors"
          >
            Skip [Space]
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BootScreen;
