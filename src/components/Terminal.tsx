import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HistoryItem {
  command: string;
  output: string[];
  isError?: boolean;
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '',
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  Welcome to Prakhar\'s Interactive Terminal v2.0             ║',
        '║  Type "help" to see available commands                       ║',
        '╚══════════════════════════════════════════════════════════════╝',
        ''
      ]
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string[]> = {
    help: () => [
      '┌─────────────────────────────────────────────────────────────┐',
      '│  Available Commands:                                        │',
      '├─────────────────────────────────────────────────────────────┤',
      '│  about      - Display information about me                  │',
      '│  skills     - List my technical skills                      │',
      '│  projects   - Show my projects                              │',
      '│  education  - View my education details                     │',
      '│  experience - View my work experience                       │',
      '│  contact    - Get my contact information                    │',
      '│  stats      - Show competitive programming stats            │',
      '│  social     - Display social media links                    │',
      '│  resume     - Download my resume                            │',
      '│  clear      - Clear the terminal                            │',
      '│  date       - Show current date and time                    │',
      '│  whoami     - Display current user                          │',
      '│  pwd        - Print working directory                       │',
      '│  ls         - List directory contents                       │',
      '│  cat        - View file contents (try: cat about.txt)       │',
      '│  neofetch   - Display system info                           │',
      '│  matrix     - Toggle matrix rain effect                     │',
      '│  history    - Show command history                          │',
      '│  echo       - Echo a message                                │',
      '│  sudo       - Try it :)                                     │',
      '└─────────────────────────────────────────────────────────────┘'
    ],

    about: () => [
      '',
      '  ██████╗ ██████╗  █████╗ ██╗  ██╗██╗  ██╗ █████╗ ██████╗ ',
      '  ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██║  ██║██╔══██╗██╔══██╗',
      '  ██████╔╝██████╔╝███████║█████╔╝ ███████║███████║██████╔╝',
      '  ██╔═══╝ ██╔══██╗██╔══██║██╔═██╗ ██╔══██║██╔══██║██╔══██╗',
      '  ██║     ██║  ██║██║  ██║██║  ██╗██║  ██║██║  ██║██║  ██║',
      '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝',
      '',
      '  👋 Hey! I\'m Prakhar Chauhan',
      '  🎓 B.Tech in Biological Sciences & Bioengineering @ IIT Jodhpur',
      '  📚 Minor in Artificial Intelligence & Data Science',
      '  💻 Full Stack Developer | ML Enthusiast | Problem Solver',
      '  🚀 Building production-ready applications since 2023',
      '  📍 IIT Jodhpur, Rajasthan, India',
      ''
    ],

    skills: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                    TECHNICAL SKILLS                      │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  💻 Languages:',
      '     ├── C/C++      ████████████████████ 95%',
      '     ├── Python     ███████████████████░ 90%',
      '     ├── JavaScript ██████████████████░░ 85%',
      '     ├── TypeScript █████████████████░░░ 80%',
      '     └── Java       ███████████████░░░░░ 70%',
      '',
      '  🌐 Frontend:',
      '     ├── React.js   ███████████████████░ 90%',
      '     ├── Next.js    █████████████████░░░ 80%',
      '     ├── TailwindCSS████████████████████ 95%',
      '     └── HTML/CSS   ████████████████████ 95%',
      '',
      '  ⚙️  Backend:',
      '     ├── Node.js    ██████████████████░░ 85%',
      '     ├── Django     █████████████████░░░ 80%',
      '     ├── FastAPI    ██████████████████░░ 85%',
      '     └── Express.js █████████████████░░░ 80%',
      '',
      '  🗄️  Databases:',
      '     ├── PostgreSQL ██████████████████░░ 85%',
      '     ├── MongoDB    █████████████████░░░ 80%',
      '     └── Redis      ██████████████░░░░░░ 65%',
      '',
      '  🛠️  Tools & DevOps:',
      '     ├── Git/GitHub ████████████████████ 95%',
      '     ├── Docker     █████████████████░░░ 80%',
      '     ├── Linux      ██████████████████░░ 85%',
      '     └── AWS        ██████████████░░░░░░ 65%',
      ''
    ],

    projects: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                      MY PROJECTS                         │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  🎬 SPARK - Video Streaming Platform',
      '     ├── Tech: Node.js, React, PostgreSQL, Redis',
      '     ├── Features: Adaptive streaming, real-time transcoding',
      '     └── GitHub: github.com/Prakhar54-byte/spark',
      '',
      '  🤝 CSR CONNECT - NGO-Corporate Matching Platform',
      '     ├── Tech: Django, PostgreSQL, React',
      '     ├── Features: AI-powered matching, real-time analytics',
      '     └── Status: Production (500+ users)',
      '',
      '  📺 STREAMIFY - Video Streaming Pipeline',
      '     ├── Tech: Node.js, FFmpeg, HLS Protocol',
      '     ├── Features: Adaptive bitrate, HLS streaming',
      '     └── GitHub: github.com/Prakhar54-byte/streamify',
      '',
      '  🤖 MLOps PIPELINE - End-to-End ML System',
      '     ├── Tech: Python, Docker, FastAPI, PostgreSQL',
      '     ├── Features: Automated training, model versioning',
      '     └── GitHub: github.com/Prakhar54-byte/mlops-pipeline',
      '',
      '  🏠 HOUSE PRICE PREDICTION',
      '     ├── Tech: Python, Scikit-learn, Pandas',
      '     ├── Features: Feature engineering, model optimization',
      '     └── Accuracy: 92%+',
      '',
      '  🖼️  IMAGE PROCESSING IN C',
      '     ├── Tech: Pure C, File I/O',
      '     ├── Features: Filters, edge detection, histogram',
      '     └── GitHub: github.com/Prakhar54-byte/image-processing',
      ''
    ],

    education: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                      EDUCATION                           │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  🎓 Indian Institute of Technology, Jodhpur',
      '     ├── Degree: B.Tech in BSBE',
      '     ├── Minor: Artificial Intelligence & Data Science',
      '     ├── Duration: 2023 - 2027 (Expected)',
      '     ├── CGPA: 7.52 / 10',
      '     └── Roll No: B23BB1032',
      '',
      '  📚 Relevant Coursework:',
      '     ├── Data Structures & Algorithms',
      '     ├── Machine Learning & Deep Learning',
      '     ├── Database Management Systems',
      '     ├── Operating Systems',
      '     ├── Computer Networks',
      '     └── Software Engineering',
      ''
    ],

    experience: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                    WORK EXPERIENCE                       │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  💼 Backend Developer - CSR Connect',
      '     ├── Duration: Jan 2025 - Mar 2025',
      '     ├── Tech: Django, PostgreSQL, REST APIs',
      '     ├── Built scalable APIs handling 10,000+ requests/day',
      '     └── Implemented authentication & authorization systems',
      '',
      '  🏥 Clinical Data Analyst - IIT Jodhpur & AIIMS',
      '     ├── Duration: Aug 2024 - Dec 2024',
      '     ├── Tech: Python, Pandas, Statistical Analysis',
      '     ├── Analyzed clinical data for research projects',
      '     └── Developed automated data processing pipelines',
      '',
      '  📋 Department Secretary - BSBE, IIT Jodhpur',
      '     ├── Duration: 2024 - Present',
      '     ├── Managing department activities & events',
      '     └── Coordinating between students and faculty',
      ''
    ],

    contact: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                    CONTACT INFO                          │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  📧 Email:    prakharchauhan179@gmail.com',
      '  📱 Phone:    +91-8369512080',
      '  📍 Location: IIT Jodhpur, Rajasthan, India',
      '',
      '  💡 Feel free to reach out for collaborations!',
      ''
    ],

    social: () => [
      '',
      '  ╭──────────────────────────────────────────────────────────╮',
      '  │                    SOCIAL LINKS                          │',
      '  ╰──────────────────────────────────────────────────────────╯',
      '',
      '  🐙 GitHub:   github.com/Prakhar54-byte',
      '  💼 LinkedIn: linkedin.com/in/prakhar-chauhan-9a32b52b4',
      '  🏆 Codeforces: codeforces.com/profile/prakhar_54',
      '  💻 LeetCode: leetcode.com/prakhar54',
      ''
    ],

    stats: () => [
      '',
      '  ╔════════════════════════════════════════════════════════════╗',
      '  ║           COMPETITIVE PROGRAMMING STATS                    ║',
      '  ╠════════════════════════════════════════════════════════════╣',
      '  ║                                                            ║',
      '  ║   🏆 Codeforces                                            ║',
      '  ║      ├── Rating: 1609 (Expert)                             ║',
      '  ║      ├── Max Rating: 1609                                  ║',
      '  ║      └── Contests: 50+                                     ║',
      '  ║                                                            ║',
      '  ║   💻 LeetCode                                              ║',
      '  ║      ├── Rating: 1735                                      ║',
      '  ║      ├── Problems Solved: 480+                             ║',
      '  ║      └── Streak: 100+ days                                 ║',
      '  ║                                                            ║',
      '  ║   📊 Overall Stats                                         ║',
      '  ║      ├── Total Problems: 600+                              ║',
      '  ║      ├── Contests Participated: 80+                        ║',
      '  ║      └── Languages: C++, Python, Java                      ║',
      '  ║                                                            ║',
      '  ╚════════════════════════════════════════════════════════════╝',
      ''
    ],

    neofetch: () => [
      '',
      '  prakhar@portfolio',
      '  -----------------',
      '  OS: Portfolio OS 2.0',
      '  Host: IIT Jodhpur',
      '  Kernel: React 18.x',
      '  Uptime: Since 2023',
      '  Packages: 50+ (npm)',
      '  Shell: zsh 5.9',
      '  Terminal: hyper',
      '  CPU: AMD Ryzen 7 (Brain Power)',
      '  Memory: Infinite (Learning Mode)',
      '',
      '  ████████████████████████',
      '  ████████████████████████',
      ''
    ],

    whoami: () => ['  prakhar@portfolio'],

    pwd: () => ['  /home/prakhar/portfolio'],

    date: () => ['  ' + new Date().toString()],

    ls: () => [
      '  drwxr-xr-x  about.txt',
      '  drwxr-xr-x  skills/',
      '  drwxr-xr-x  projects/',
      '  drwxr-xr-x  education.md',
      '  drwxr-xr-x  experience.json',
      '  drwxr-xr-x  contact.txt',
      '  -rw-r--r--  resume.pdf',
      '  -rw-r--r--  README.md'
    ],

    resume: () => {
      // Trigger download (you can replace with actual resume link)
      window.open('https://github.com/Prakhar54-byte', '_blank');
      return ['  📄 Opening resume... (redirecting to GitHub)'];
    },

    matrix: () => {
      const matrixEl = document.querySelector('canvas');
      if (matrixEl) {
        matrixEl.style.opacity = matrixEl.style.opacity === '0' ? '1' : '0';
        return ['  🎬 Matrix rain effect toggled!'];
      }
      return ['  Matrix rain element not found'];
    },

    history: () => {
      if (commandHistory.length === 0) {
        return ['  No commands in history'];
      }
      return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`);
    },

    sudo: () => [
      '  ⚠️  [sudo] password for prakhar: ',
      '  Nice try! But you don\'t have root access here 😄',
      '  Just kidding, feel free to explore with regular commands!'
    ],

    clear: () => []
  };

  const processCommand = (cmd: string): HistoryItem => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const mainCommand = parts[0];
    const args = parts.slice(1);

    // Handle 'cat' command
    if (mainCommand === 'cat') {
      const file = args[0];
      if (!file) {
        return { command: cmd, output: ['  Usage: cat <filename>'], isError: true };
      }
      const fileCommands: Record<string, () => string[]> = {
        'about.txt': commands.about,
        'contact.txt': commands.contact,
        'readme.md': () => ['  # Prakhar\'s Portfolio', '  Welcome to my terminal portfolio!', '  Type "help" for commands.'],
        'education.md': commands.education
      };
      if (fileCommands[file]) {
        return { command: cmd, output: fileCommands[file]() };
      }
      return { command: cmd, output: [`  cat: ${file}: No such file or directory`], isError: true };
    }

    // Handle 'echo' command
    if (mainCommand === 'echo') {
      return { command: cmd, output: ['  ' + args.join(' ')] };
    }

    // Handle 'cd' command
    if (mainCommand === 'cd') {
      return { command: cmd, output: ['  Changed directory (not really, this is a web terminal 😄)'] };
    }

    // Handle 'clear' command
    if (mainCommand === 'clear') {
      setHistory([]);
      return { command: cmd, output: [] };
    }

    // Handle regular commands
    if (commands[mainCommand]) {
      return { command: cmd, output: commands[mainCommand]() };
    }

    // Command not found
    return {
      command: cmd,
      output: [`  Command not found: ${mainCommand}`, '  Type "help" to see available commands.'],
      isError: true
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const result = processCommand(input);
    
    if (input.trim().toLowerCase() !== 'clear') {
      setHistory(prev => [...prev, result]);
    }
    
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, { command: '', output: ['  ' + matches.join('  ')] }]);
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8 glow-text"
        >
          {'>'} Interactive Terminal_
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-window overflow-hidden cursor-text"
          onClick={focusInput}
        >
          {/* Terminal Header */}
          <div className="terminal-header flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
            <span className="ml-4 text-gray-400 text-sm">prakhar@portfolio:~</span>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            className="p-4 font-mono text-sm md:text-base h-[400px] overflow-y-auto"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command && (
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">prakhar</span>
                    <span className="text-gray-500">@</span>
                    <span className="text-cyan-400">portfolio</span>
                    <span className="text-gray-500">:~$</span>
                    <span className="text-white ml-2">{item.command}</span>
                  </div>
                )}
                {item.output.map((line, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className={`whitespace-pre ${item.isError ? 'text-red-400' : 'text-gray-300'}`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-purple-400">prakhar</span>
              <span className="text-gray-500">@</span>
              <span className="text-cyan-400">portfolio</span>
              <span className="text-gray-500">:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none ml-2 caret-green-400"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
        
        <p className="text-center text-gray-500 mt-4 text-sm">
          💡 Tip: Try commands like <span className="text-green-400">help</span>, <span className="text-green-400">about</span>, <span className="text-green-400">skills</span>, <span className="text-green-400">projects</span>, or use <span className="text-cyan-400">Tab</span> for auto-complete
        </p>
      </div>
    </section>
  );
};

export default Terminal;
