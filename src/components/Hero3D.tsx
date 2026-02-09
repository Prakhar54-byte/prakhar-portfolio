import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';

// Typing effect hook
const useTypingEffect = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTyping = () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);
      return interval;
    };

    const timeout = setTimeout(() => {
      startTyping();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};

const FloatingCube = ({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) => {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} wireframe opacity={0.8} transparent />
      </mesh>
    </Float>
  );
};

const FloatingSphere = ({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={3}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <FloatingCube position={[-3, 2, -2]} color="#00ff41" size={1.5} />
      <FloatingCube position={[3, -1, -3]} color="#00d4ff" size={1} />
      <FloatingCube position={[4, 2, -4]} color="#bd93f9" size={0.8} />
      <FloatingSphere position={[-4, -2, -2]} color="#ff79c6" size={0.6} />
      <FloatingSphere position={[2, 3, -3]} color="#f1fa8c" size={0.4} />
      <FloatingSphere position={[-2, 0, -1]} color="#00ff41" size={0.3} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const Hero3D = () => {
  const { displayedText: whoamiText, isComplete: whoamiComplete } = useTypingEffect('whoami', 100, 500);
  const { displayedText: nameText } = useTypingEffect('Prakhar Chauhan', 80, 1500);
  const titles = ['Full Stack Developer', 'ML Enthusiast', 'Problem Solver', 'Arch Linux User'];
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotating title typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullTitle = titles[titleIndex];
      
      if (isDeleting) {
        setCurrentTitle(fullTitle.substring(0, currentTitle.length - 1));
        if (currentTitle.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      } else {
        setCurrentTitle(fullTitle.substring(0, currentTitle.length + 1));
        if (currentTitle === fullTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentTitle, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal-style greeting */}
          <div className="inline-block mb-6">
            <span className="text-gray-500 text-sm md:text-base">
              <span className="text-green-400">prakhar@arch</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-gray-300">{whoamiText}</span>
              {!whoamiComplete && <span className="animate-pulse">▊</span>}
            </span>
          </div>

          {/* Name with typing effect */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          >
            <span className="text-white">{nameText.split(' ')[0]} </span>
            <span className="text-green-400 glow-text">{nameText.split(' ')[1] || ''}</span>
            {nameText.length < 15 && <span className="animate-pulse text-green-400">▊</span>}
          </motion.h1>

          {/* Rotating title with typing effect */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-8 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <span className="text-cyan-400">&lt;</span>
            <span className="text-purple-400">{currentTitle}</span>
            <span className="animate-pulse text-purple-400">|</span>
            <span className="text-cyan-400"> /&gt;</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            B.Tech @ <span className="text-yellow-400">IIT Jodhpur</span> | 
            Building cool stuff with <span className="text-green-400">React</span>, 
            <span className="text-blue-400"> Node.js</span>, 
            <span className="text-purple-400"> Python</span> & 
            <span className="text-pink-400"> AI/ML</span>
            <br />
            <span className="text-cyan-400 text-sm">btw I use Arch 🐧</span>
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
          >
            <div className="terminal-window px-4 py-3 card-3d">
              <div className="text-2xl font-bold text-orange-400">1609</div>
              <div className="text-xs text-gray-500">Codeforces</div>
            </div>
            <div className="terminal-window px-4 py-3 card-3d">
              <div className="text-2xl font-bold text-yellow-400">1735</div>
              <div className="text-xs text-gray-500">LeetCode</div>
            </div>
            <div className="terminal-window px-4 py-3 card-3d">
              <div className="text-2xl font-bold text-green-400">480+</div>
              <div className="text-xs text-gray-500">Problems</div>
            </div>
            <div className="terminal-window px-4 py-3 card-3d">
              <div className="text-2xl font-bold text-purple-400">100+</div>
              <div className="text-xs text-gray-500">Day Streak</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-green-500/20 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all duration-300 pulse-glow"
            >
              <span className="mr-2">$</span>view_projects
            </a>
            <a
              href={import.meta.env.VITE_RESUME_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400 hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              resume.pdf
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-400 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
            >
              <span className="mr-2">$</span>contact_me
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-600 text-xs">scroll down</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-green-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
