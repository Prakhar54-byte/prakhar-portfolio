import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RESUME_URL } from '../config/resume';

interface HistoryItem {
  command: string;
  output: string[];
  isError?: boolean;
}

interface FileSystemNode {
  type: 'file' | 'directory';
  content?: string[] | (() => string[]);
  children?: Record<string, FileSystemNode>;
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['~']);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '',
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  Welcome to Prakhar\'s Interactive Terminal v2.0             ║',
        '║  AI/ML portfolio shell                                      ║',
        '║  Type "help" to see available commands                       ║',
        '║  Try "neofetch" or "btw" for some fun!                       ║',
        '╚══════════════════════════════════════════════════════════════╝',
        ''
      ]
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Virtual File System
  const fileSystem: FileSystemNode = {
    type: 'directory',
    children: {
      'about.txt': {
        type: 'file',
        content: () => [
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
          '  💻 AI/ML Engineer | Software Developer | MLOps Builder',
          '  🚀 Building model pipelines, backend APIs, and ML dashboards',
          '  📍 IIT Jodhpur, Rajasthan, India',
          ''
        ]
      },
      'contact.txt': {
        type: 'file',
        content: [
          '',
          '  📧 Email:    prakharchauhan179@gmail.com',
          '  📱 Phone:    +91-8369512080',
          '  📍 Location: IIT Jodhpur, Rajasthan, India',
          '  🐙 GitHub:   github.com/Prakhar54-byte',
          '  💼 LinkedIn: linkedin.com/in/prakhar-chauhan-9a32b52b4',
          ''
        ]
      },
      'education.md': {
        type: 'file',
        content: [
          '',
          '  # Education',
          '',
          '  🎓 Indian Institute of Technology, Jodhpur',
          '     - Degree: B.Tech in BSBE',
          '     - Minor: AI & Data Science',
          '     - Duration: 2023 - 2027',
          '     - CGPA: 7.52 / 10',
          ''
        ]
      },
      'experience.json': {
        type: 'file',
        content: [
          '',
          '  {',
          '    "experience": [',
          '      {',
          '        "role": "AI/ML Developer",',
          '        "company": "CSR Connect - Gemini SDG Classification",',
          '        "duration": "Jan 2025 - Mar 2025"',
          '      },',
          '      {',
          '        "role": "Clinical Data Analyst",',
          '        "company": "IIT Jodhpur & AIIMS",',
          '        "duration": "Aug 2024 - Dec 2024"',
          '      }',
          '    ]',
          '  }',
          ''
        ]
      },
      'resume.pdf': {
        type: 'file',
        content: ['  [Binary file - use "open resume.pdf" to view]']
      },
      'README.md': {
        type: 'file',
        content: [
          '',
          '  # Prakhar\'s Portfolio',
          '  Welcome to my interactive terminal portfolio!',
          '  Type "help" for available commands.',
          ''
        ]
      },
      'skills': {
        type: 'directory',
        children: {
          'languages.txt': {
            type: 'file',
            content: [
              '',
              '  💻 AI/ML Core:',
              '     ├── Python       ██████████████████░░ 90%',
              '     ├── PyTorch      ████████████████░░░░ 82%',
              '     ├── scikit-learn █████████████████░░░ 84%',
              '     ├── NumPy/Pandas █████████████████░░░ 86%',
              '     └── XGBoost      ███████████████░░░░░ 76%',
              ''
            ]
          },
          'frontend.txt': {
            type: 'file',
            content: [
              '',
              '  🌐 AI Product Interfaces:',
              '     ├── React.js    █████████████████░░░ 84%',
              '     ├── Next.js     ████████████████░░░░ 80%',
              '     ├── Gradio      ███████████████░░░░░ 76%',
              '     └── TailwindCSS ██████████████████░░ 88%',
              ''
            ]
          },
          'backend.txt': {
            type: 'file',
            content: [
              '',
              '  ⚙️  Model Serving & APIs:',
              '     ├── FastAPI     █████████████████░░░ 82%',
              '     ├── Django/DRF  ████████████████░░░░ 78%',
              '     ├── ONNX Runtime██████████████░░░░░░ 72%',
              '     └── REST APIs   █████████████████░░░ 84%',
              ''
            ]
          },
          'databases.txt': {
            type: 'file',
            content: [
              '',
              '  🗄️  Data & Experiment Tracking:',
              '     ├── MLflow      ███████████████░░░░░ 76%',
              '     ├── W&B         ███████████████░░░░░ 76%',
              '     ├── PostgreSQL  ████████████████░░░░ 80%',
              '     └── Prometheus  ██████████████░░░░░░ 70%',
              ''
            ]
          },
          'tools.txt': {
            type: 'file',
            content: [
              '',
              '  🛠️  ML Deployment Tools:',
              '     ├── Git/GitHub  ████████████████████ 95%',
              '     ├── Docker      ████████████████░░░░ 78%',
              '     ├── HF Hub      ███████████████░░░░░ 78%',
              '     └── Linux       █████████████████░░░ 85%',
              ''
            ]
          }
        }
      },
      'projects': {
        type: 'directory',
        children: {
          'pneumoops.md': {
            type: 'file',
            content: [
              '',
              '  🫁 PNEUMOOPS',
              '  ════════════════════════════════════',
              '  What: MLOps system for 14-class chest X-ray classification',
              '  Stack: PyTorch, ONNX Runtime, FastAPI, Gradio, Prometheus',
              '  Challenge: Serve models with latency, drift, and observability signals',
              '  Features: A/B routing, KS-test drift monitor, /metrics endpoint',
              '  Learned: Deployment quality matters as much as model accuracy',
              '  GitHub: github.com/Prakhar54-byte/PneumoOps',
              ''
            ]
          },
          'csr-connect.md': {
            type: 'file',
            content: [
              '',
              '  🌍 CSR CONNECT',
              '  ════════════════════════════════════',
              '  What: AI platform mapping CSR reports to UN SDGs',
              '  Stack: Django, DRF, PostgreSQL, Next.js, Gemini, pdfplumber, RAG',
              '  Challenge: Convert messy PDFs into classified, searchable records',
              '  Features: Gemini SDG classification, PDF extraction, admin/API filters',
              '  Learned: LLM workflows need strong parsing and structured outputs',
              '  GitHub: github.com/Prakhar54-byte/CSRconnect',
              ''
            ]
          },
          'house-price.md': {
            type: 'file',
            content: [
              '',
              '  🏠 HOUSE PRICE PREDICTION ML',
              '  ════════════════════════════════════',
              '  What: End-to-end Ames Housing regression pipeline',
              '  Stack: XGBoost, sklearn, FastAPI, MLflow, ZenML, Docker',
              '  Challenge: Move from notebook model to tracked API service',
              '  Features: R2=0.9211, batch predictions, input validation',
              '  Learned: Model selection should include accuracy, latency, and robustness',
              '  GitHub: github.com/Prakhar54-byte/House_Price_Prediction_ML',
              ''
            ]
          },
          'spark-video.md': {
            type: 'file',
            content: [
              '',
              '  🎬 SPARK VIDEO STREAMING',
              '  ════════════════════════════════════',
              '  What: Full-stack video streaming platform',
              '  Stack: MERN, Next.js/React, FFmpeg, HLS.js, Docker',
              '  Challenge: Secure upload, processing, storage, and playback',
              '  Features: JWT auth, media API structure, HLS/FFmpeg roadmap',
              '  Learned: Strong SDE foundations make AI products easier to ship',
              '  GitHub: github.com/Prakhar54-byte/Video_Streaming',
              ''
            ]
          }
        }
      }
    }
  };

  // Navigate to path and return the node
  const getNodeAtPath = (path: string[]): FileSystemNode | null => {
    let current = fileSystem;
    for (const segment of path) {
      if (segment === '~' || segment === '') continue;
      if (current.type !== 'directory' || !current.children?.[segment]) {
        return null;
      }
      current = current.children[segment];
    }
    return current;
  };

  // Get display path
  const getDisplayPath = (): string => {
    if (currentPath.length === 1 && currentPath[0] === '~') {
      return '~';
    }
    return currentPath.join('/').replace('~/', '~/');
  };

  // Process commands
  const processCommand = (cmd: string): HistoryItem => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(/\s+/);
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle 'ls' command
    if (mainCommand === 'ls') {
      const targetPath = args[0] ? resolvePath(args[0]) : currentPath;
      const node = getNodeAtPath(targetPath);
      
      if (!node) {
        return { command: cmd, output: [`  ls: cannot access '${args[0]}': No such file or directory`], isError: true };
      }
      
      if (node.type === 'file') {
        return { command: cmd, output: [`  ${args[0] || targetPath[targetPath.length - 1]}`] };
      }
      
      const items = Object.entries(node.children || {}).map(([name, child]) => {
        const isDir = child.type === 'directory';
        return `  ${isDir ? 'drwxr-xr-x' : '-rw-r--r--'}  ${name}${isDir ? '/' : ''}`;
      });
      
      return { command: cmd, output: items.length > 0 ? items : ['  (empty directory)'] };
    }

    // Handle 'cd' command
    if (mainCommand === 'cd') {
      const target = args[0] || '~';
      
      if (target === '~' || target === '') {
        setCurrentPath(['~']);
        return { command: cmd, output: [] };
      }
      
      if (target === '..') {
        if (currentPath.length > 1) {
          setCurrentPath(prev => prev.slice(0, -1));
        }
        return { command: cmd, output: [] };
      }
      
      if (target === '.') {
        return { command: cmd, output: [] };
      }
      
      const newPath = resolvePath(target);
      const node = getNodeAtPath(newPath);
      
      if (!node) {
        return { command: cmd, output: [`  cd: ${target}: No such file or directory`], isError: true };
      }
      
      if (node.type !== 'directory') {
        return { command: cmd, output: [`  cd: ${target}: Not a directory`], isError: true };
      }
      
      setCurrentPath(newPath);
      return { command: cmd, output: [] };
    }

    // Handle 'pwd' command
    if (mainCommand === 'pwd') {
      const fullPath = currentPath[0] === '~' 
        ? '/home/prakhar/portfolio' + (currentPath.length > 1 ? '/' + currentPath.slice(1).join('/') : '')
        : '/' + currentPath.join('/');
      return { command: cmd, output: [`  ${fullPath}`] };
    }

    // Handle 'cat' command
    if (mainCommand === 'cat') {
      const file = args[0];
      if (!file) {
        return { command: cmd, output: ['  Usage: cat <filename>'], isError: true };
      }
      
      const filePath = resolvePath(file);
      const node = getNodeAtPath(filePath);
      
      if (!node) {
        return { command: cmd, output: [`  cat: ${file}: No such file or directory`], isError: true };
      }
      
      if (node.type === 'directory') {
        return { command: cmd, output: [`  cat: ${file}: Is a directory`], isError: true };
      }
      
      const content = typeof node.content === 'function' ? node.content() : node.content || [];
      return { command: cmd, output: content };
    }

    // Handle 'help' command
    if (mainCommand === 'help') {
      return {
        command: cmd,
        output: [
          '┌─────────────────────────────────────────────────────────────┐',
          '│  Available Commands:                                        │',
          '├─────────────────────────────────────────────────────────────┤',
          '│  ls [dir]   - List directory contents                       │',
          '│  cd <dir>   - Change directory (try: cd skills)             │',
          '│  pwd        - Print working directory                       │',
          '│  cat <file> - View file contents                            │',
          '│  tree       - Show directory tree                           │',
          '│  about      - Display info about me                         │',
          '│  skills     - Show my technical skills                      │',
          '│  projects   - Show my projects                              │',
          '│  contact    - Get contact information                       │',
          '│  stats      - Competitive programming stats                 │',
          '│  neofetch   - Display system info (Arch btw)                │',
          '│  whoami     - Display current user                          │',
          '│  date       - Show current date/time                        │',
          '│  echo <msg> - Echo a message                                │',
          '│  clear      - Clear the terminal                            │',
          '│  history    - Show command history                          │',
          '│  matrix     - Toggle matrix rain effect                     │',
          '├─────────────────────────────────────────────────────────────┤',
          '│  🐧 Arch Linux Easter Eggs:                                 │',
          '│  pacman     - Package manager (try: pacman -Syu)            │',
          '│  yay        - AUR helper                                    │',
          '│  btw        - You know what this does 😏                    │',
          '│  fortune    - Get a random fortune                          │',
          '│  cowsay     - Moo! (cowsay <message>)                       │',
          '│  sl         - Choo choo!                                    │',
          '│  sudo       - Nice try (hint: sudo hire_me)                 │',
          '└─────────────────────────────────────────────────────────────┘'
        ]
      };
    }

    // Handle 'tree' command
    if (mainCommand === 'tree') {
      const node = getNodeAtPath(currentPath);
      if (!node || node.type !== 'directory') {
        return { command: cmd, output: ['  Error reading directory'], isError: true };
      }
      
      const lines: string[] = ['  ' + getDisplayPath()];
      const buildTree = (n: FileSystemNode, prefix: string) => {
        if (n.type !== 'directory' || !n.children) return;
        const entries = Object.entries(n.children);
        entries.forEach(([name, child], index) => {
          const isLast = index === entries.length - 1;
          const connector = isLast ? '└── ' : '├── ';
          lines.push(`  ${prefix}${connector}${name}${child.type === 'directory' ? '/' : ''}`);
          if (child.type === 'directory') {
            buildTree(child, prefix + (isLast ? '    ' : '│   '));
          }
        });
      };
      buildTree(node, '');
      return { command: cmd, output: lines };
    }

    // Handle 'about' shortcut
    if (mainCommand === 'about') {
      const aboutNode = fileSystem.children?.['about.txt'];
      if (aboutNode && aboutNode.content) {
        const content = typeof aboutNode.content === 'function' ? aboutNode.content() : aboutNode.content;
        return { command: cmd, output: content };
      }
    }

    // Handle 'skills' shortcut
    if (mainCommand === 'skills') {
      return {
        command: cmd,
        output: [
          '',
          '  ╭──────────────────────────────────────────────────────────╮',
          '  │                    TECHNICAL SKILLS                      │',
          '  ╰──────────────────────────────────────────────────────────╯',
          '',
          '  💡 Use "cd skills" then "ls" to explore skill categories!',
          '  💡 Or try "cat skills/languages.txt"',
          '',
          '  Quick Overview:',
          '  ├── languages.txt   (Python, PyTorch, sklearn, XGBoost)',
          '  ├── frontend.txt    (React, Next.js, Gradio, Tailwind)',
          '  ├── backend.txt     (FastAPI, Django/DRF, ONNX, REST)',
          '  ├── databases.txt   (MLflow, W&B, PostgreSQL, Prometheus)',
          '  └── tools.txt       (Git, Docker, HF Hub, Linux)',
          ''
        ]
      };
    }

    // Handle 'projects' shortcut
    if (mainCommand === 'projects') {
      return {
        command: cmd,
        output: [
          '',
          '  ╭──────────────────────────────────────────────────────────╮',
          '  │               AI/ML + SDE CASE STUDIES                     │',
          '  ╰──────────────────────────────────────────────────────────╯',
          '',
          '  💡 Use "cd projects" then "ls" to see all projects!',
          '  💡 Or try "cat projects/pneumoops.md"',
          '',
          '  Featured Case Studies:',
          '  ├── pneumoops.md    🫁 MLOps + drift monitoring',
          '  ├── csr-connect.md  🌍 Gemini + RAG SDG classification',
          '  ├── house-price.md  🏠 XGBoost + FastAPI + MLflow',
          '  └── spark-video.md  🎬 Full-stack video streaming',
          ''
        ]
      };
    }

    // Handle 'contact' shortcut
    if (mainCommand === 'contact') {
      const contactNode = fileSystem.children?.['contact.txt'];
      if (contactNode && contactNode.content) {
        const content = typeof contactNode.content === 'function' ? contactNode.content() : contactNode.content;
        return { command: cmd, output: content };
      }
    }

    // Handle 'stats' command
    if (mainCommand === 'stats') {
      return {
        command: cmd,
        output: [
          '',
          '  ╔════════════════════════════════════════════════════════════╗',
          '  ║           COMPETITIVE PROGRAMMING STATS                    ║',
          '  ╠════════════════════════════════════════════════════════════╣',
          '  ║   🏆 Codeforces: 1609 (Expert)                             ║',
          '  ║   💻 LeetCode: 1735 | 480+ problems                        ║',
          '  ║   🔥 Streak: 100+ days                                     ║',
          '  ║   📊 Total Problems: 600+                                  ║',
          '  ╚════════════════════════════════════════════════════════════╝',
          ''
        ]
      };
    }

    // Handle 'neofetch' command
    if (mainCommand === 'neofetch') {
      return {
        command: cmd,
        output: [
          '',
          '                   -`                    prakhar@arch',
          '                  .o+`                   ──────────────',
          '                 `ooo/                   OS: Arch Linux x86_64',
          '                `+oooo:                  Host: IIT Jodhpur',
          '               `+oooooo:                 Kernel: 6.7.4-arch1-1',
          '               -+oooooo+:                Uptime: ∞ learning hours',
          '             `/:-:++oooo+:               Packages: 1337 (pacman)',
          '            `/++++/+++++++:              Shell: zsh 5.9',
          '           `/++++++++++++++:             Resolution: Max Potential',
          '          `/+++ooooooooooooo/`           DE: React 18.3.1',
          '         ./ooosssso++osssssso+`          WM: Vite 6.x',
          '        .oossssso-````/ossssss+`         Theme: Terminal Dark',
          '       -osssssso.      :ssssssso.        Terminal: hyper',
          '      :osssssss/        osssso+++.       CPU: Brain @ ∞GHz',
          '     /ossssssss/        +ssssooo/-       Memory: Learning Mode',
          '   `/ossssso+/:-        -:/+osssso+-     GPU: RTX Imagination',
          '  `+sso+:-`                 `.-/+oso:    Disk: 480+ Problems Solved',
          ' `++:.                           `-/+/',
          ' .`                                 `/', 
          '',
          '  ████████████████████████████████████',
          ''
        ]
      };
    }

    // Handle 'whoami' command
    if (mainCommand === 'whoami') {
      return { command: cmd, output: ['  prakhar'] };
    }

    // Handle 'date' command
    if (mainCommand === 'date') {
      return { command: cmd, output: ['  ' + new Date().toString()] };
    }

    // Handle 'echo' command
    if (mainCommand === 'echo') {
      return { command: cmd, output: ['  ' + args.join(' ')] };
    }

    // Handle 'clear' command
    if (mainCommand === 'clear') {
      setHistory([]);
      return { command: cmd, output: [] };
    }

    // Handle 'history' command
    if (mainCommand === 'history') {
      if (commandHistory.length === 0) {
        return { command: cmd, output: ['  No commands in history'] };
      }
      return { command: cmd, output: commandHistory.map((c, i) => `  ${i + 1}  ${c}`) };
    }

    // Handle 'matrix' command
    if (mainCommand === 'matrix') {
      const matrixEl = document.querySelector('canvas');
      if (matrixEl) {
        const el = matrixEl as HTMLElement;
        el.style.opacity = el.style.opacity === '0' ? '1' : '0';
        return { command: cmd, output: ['  🎬 Matrix rain effect toggled!'] };
      }
      return { command: cmd, output: ['  Matrix rain element not found'] };
    }

    // Handle 'open' command
    if (mainCommand === 'open') {
      if (args[0] === 'resume.pdf') {
        window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
        return { command: cmd, output: ['  📄 Opening resume...'] };
      }
      return { command: cmd, output: [`  Cannot open: ${args[0] || 'no file specified'}`], isError: true };
    }

    // Handle 'sudo' command
    if (mainCommand === 'sudo') {
      const sudoArg = args.join(' ').toLowerCase();
      if (sudoArg === 'hire_me' || sudoArg === 'hire me') {
        return {
          command: cmd,
          output: [
            '',
            '  ╔════════════════════════════════════════════════════════════╗',
            '  ║   🎉 CONGRATULATIONS! You found the secret command!        ║',
            '  ╠════════════════════════════════════════════════════════════╣',
            '  ║                                                            ║',
            '  ║   I\'m actively looking for opportunities!                  ║',
            '  ║                                                            ║',
            '  ║   📧 Email: prakharchauhan179@gmail.com                    ║',
            '  ║   📱 Phone: +91-8369512080                                 ║',
            '  ║   💼 LinkedIn: prakhar-chauhan-9a32b52b4                   ║',
            '  ║                                                            ║',
            '  ║   Let\'s build something amazing together! 🚀              ║',
            '  ║                                                            ║',
            '  ╚════════════════════════════════════════════════════════════╝',
            ''
          ]
        };
      }
      if (sudoArg.includes('pacman') || sudoArg.includes('rm -rf')) {
        return {
          command: cmd,
          output: [
            '  ⚠️  [sudo] password for prakhar: ************',
            '  🛑 Nice try! This portfolio is immutable btw 😎'
          ]
        };
      }
      return {
        command: cmd,
        output: [
          '  ⚠️  [sudo] password for prakhar: ',
          '  Nice try! But you don\'t have root access here 😄',
          '  Hint: Try "sudo hire_me" 👀'
        ]
      };
    }

    // Handle 'pacman' command (Arch easter egg)
    if (mainCommand === 'pacman') {
      if (args[0] === '-Syu') {
        return {
          command: cmd,
          output: [
            '  :: Synchronizing package databases...',
            '   core is up to date',
            '   extra is up to date',
            '   community is up to date',
            '  :: Starting full system upgrade...',
            '  resolving dependencies...',
            '  looking for conflicting packages...',
            '',
            '  Packages (0) ',
            '',
            '  There is nothing to do.',
            '  System already bleeding edge! 🔥 btw I use Arch'
          ]
        };
      }
      if (args[0] === '-Ss' || args[0] === '-Q') {
        return {
          command: cmd,
          output: [
            '  extra/react 18.3.1-1 (installed)',
            '      A JavaScript library for building user interfaces',
            '  extra/typescript 5.3.3-1 (installed)',
            '      TypeScript is a typed superset of JavaScript',
            '  extra/tailwindcss 3.4.19-1 (installed)',
            '      A utility-first CSS framework',
            '  extra/three.js 0.160.0-1 (installed)',
            '      JavaScript 3D library',
            '  aur/hire-prakhar 2.0-1 (installed)',
            '      The best developer for your team 🚀',
          ]
        };
      }
      return {
        command: cmd,
        output: [
          '  Usage:  pacman <operation> [...]',
          '  Operations:',
          '      -Syu  - Upgrade all packages',
          '      -Ss   - Search for packages',
          '      -Q    - Query installed packages',
          '',
          '  btw I use Arch 🐧'
        ]
      };
    }

    // Handle 'btw' easter egg
    if (trimmedCmd.toLowerCase() === 'btw' || trimmedCmd.toLowerCase() === 'btw i use arch') {
      return {
        command: cmd,
        output: [
          '',
          '  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡿⠛⠉⠉⠛⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⢰⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⣾⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⢻⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠘⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣷⣄⡀⠀⣀⣴⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀',
          '  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '',
          '  I use Arch btw. 🐧',
          '  Kernel: 6.7.4-arch1-1',
          '  Packages: 1337 (pacman)',
          '  Uptime: Since 2023',
          ''
        ]
      };
    }

    // Handle 'yay' command (AUR helper easter egg)
    if (mainCommand === 'yay') {
      return {
        command: cmd,
        output: [
          '  :: Searching AUR for hire-prakhar...',
          '  aur/hire-prakhar 2.0-1 (+1337 0.00)',
          '      AI/ML Engineer | Software Developer | MLOps Builder',
          '',
          '  :: Proceed with installation? [Y/n] Y',
          '  :: Resolving dependencies...',
          '  :: Downloading hire-prakhar...',
          '  ==> Making package: hire-prakhar 2.0-1',
          '  ==> Successfully built hire-prakhar',
          '  🎉 Prakhar is now available for your team!'
        ]
      };
    }

    // Handle 'fortune' command
    if (mainCommand === 'fortune') {
      const fortunes = [
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Programming isn\'t about what you know; it\'s about what you can figure out."',
        '"btw I use Arch" - Every Arch User Ever',
        '"If it works on my machine, we ship my machine." - Anonymous Dev',
        '"sudo rm -rf / --no-preserve-root # just kidding, don\'t" - Satan',
        '"I don\'t always test my code, but when I do, I do it in production." - Most Honest Dev'
      ];
      return {
        command: cmd,
        output: ['', '  ' + fortunes[Math.floor(Math.random() * fortunes.length)], '']
      };
    }

    // Handle 'cowsay' command
    if (mainCommand === 'cowsay') {
      const message = args.join(' ') || 'btw I use Arch';
      const line = '─'.repeat(message.length + 2);
      return {
        command: cmd,
        output: [
          '',
          `   ╭${line}╮`,
          `   │ ${message} │`,
          `   ╰${line}╯`,
          '          \\   ^__^',
          '           \\  (oo)\\_______',
          '              (__)\\       )\\/\\',
          '                  ||----w |',
          '                  ||     ||',
          ''
        ]
      };
    }

    // Handle 'sl' command (steam locomotive easter egg)
    if (mainCommand === 'sl') {
      return {
        command: cmd,
        output: [
          '',
          '      ====        ________                ___________',
          '  _D _|  |_______/        \\__I_I_____===__|_________|',
          '   |(_)---  |   H\\________/ |   |        =|___ ___|  ',
          '   /     |  |   H  |  |     |   |         ||_| |_||  ',
          '  |      |  |   H  |__--------------------| [___] |  ',
          '  | ________|___H__/__|_____/[][]~\\_______|       |  ',
          '  |/ |   |-----------I_____I [][] []  D   |=======|__',
          '',
          '  🚂 You meant "ls", didn\'t you? btw I use Arch'
        ]
      };
    }

    // Command not found
    return {
      command: cmd,
      output: [`  Command not found: ${mainCommand}`, '  Type "help" to see available commands.'],
      isError: true
    };
  };

  // Resolve relative path to absolute path array
  const resolvePath = (target: string): string[] => {
    if (target.startsWith('~')) {
      return ['~', ...target.slice(2).split('/').filter(Boolean)];
    }
    if (target.startsWith('/')) {
      return ['~', ...target.slice(1).split('/').filter(Boolean)];
    }
    // Relative path
    const newPath = [...currentPath];
    const segments = target.split('/').filter(Boolean);
    for (const seg of segments) {
      if (seg === '..') {
        if (newPath.length > 1) newPath.pop();
      } else if (seg !== '.') {
        newPath.push(seg);
      }
    }
    return newPath;
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
      // Auto-complete files and directories in current path
      const node = getNodeAtPath(currentPath);
      if (node?.type === 'directory' && node.children) {
        const fileMatches = Object.keys(node.children).filter(name => 
          name.toLowerCase().startsWith(input.split(' ').pop()?.toLowerCase() || '')
        );
        const cmdParts = input.split(' ');
        if (fileMatches.length === 1 && cmdParts.length > 1) {
          cmdParts[cmdParts.length - 1] = fileMatches[0];
          setInput(cmdParts.join(' '));
        } else if (fileMatches.length > 1 && cmdParts.length > 1) {
          setHistory(prev => [...prev, { command: '', output: ['  ' + fileMatches.join('  ')] }]);
        }
      }
      // Auto-complete commands
      const availableCommands = ['ls', 'cd', 'pwd', 'cat', 'tree', 'about', 'skills', 'projects', 'contact', 'stats', 'neofetch', 'whoami', 'date', 'echo', 'clear', 'history', 'matrix', 'open', 'help'];
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1 && !input.includes(' ')) {
        setInput(matches[0]);
      } else if (matches.length > 1 && !input.includes(' ')) {
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
            <span className="ml-4 text-gray-400 text-sm">prakhar@portfolio:{getDisplayPath()}</span>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            className="p-4 font-mono text-sm md:text-base h-[400px] overflow-y-auto"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-purple-400">prakhar</span>
                    <span className="text-gray-500">@</span>
                    <span className="text-cyan-400">portfolio</span>
                    <span className="text-gray-500">:{getDisplayPath()}$</span>
                    <span className="text-white ml-1">{item.command}</span>
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
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-wrap">
              <span className="text-purple-400">prakhar</span>
              <span className="text-gray-500">@</span>
              <span className="text-cyan-400">portfolio</span>
              <span className="text-gray-500">:{getDisplayPath()}$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none ml-1 caret-green-400 min-w-[100px]"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
        
        <p className="text-center text-gray-500 mt-4 text-sm">
          💡 Try: <span className="text-green-400">cd skills</span> → <span className="text-green-400">ls</span> → <span className="text-green-400">cat languages.txt</span> | Use <span className="text-cyan-400">Tab</span> for auto-complete
        </p>
      </div>
    </section>
  );
};

export default Terminal;
