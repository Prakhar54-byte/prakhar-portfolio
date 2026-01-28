import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Spark - Video Streaming',
    description: 'High-performance video transcoding engine using TypeScript + FFmpeg for trimming, compression, and adaptive bitrate streaming. Improved playback buffering by 30%.',
    tech: ['TypeScript', 'Node.js', 'FFmpeg'],
    github: 'https://github.com/Prakhar54-byte/Video_Streaming',
    color: '#00ff41',
    icon: '🎬',
  },
  {
    name: 'CSR Connect',
    description: 'RAG pipeline using Google Gemini to parse corporate sustainability reports against UN SDGs. Reduced manual compliance checks by 40% with <150ms query latency.',
    tech: ['Django', 'PostgreSQL', 'Docker', 'RAG'],
    github: 'https://github.com/prasangeet/CSRconnect',
    color: '#00d4ff',
    icon: '🌍',
  },
  {
    name: 'Streamify',
    description: 'WebSocket-based real-time communication hub enabling chat + video with sub-200ms sync. Features secure JWT auth with rotating refresh tokens.',
    tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/Prakhar54-byte/Streamify',
    color: '#bd93f9',
    icon: '💬',
  },
  {
    name: 'MLOps Pipeline',
    description: 'End-to-end ML lifecycle automation using MLflow for experiment tracking. Production-ready FastAPI service achieving R² = 0.92.',
    tech: ['Python', 'FastAPI', 'Docker', 'MLflow'],
    github: 'https://github.com/Prakhar54-byte/ML-DL-Ops-Prakhar-B23BB1032',
    color: '#ff79c6',
    icon: '🤖',
  },
  {
    name: 'House Price Prediction',
    description: 'ML project for predicting house prices using advanced regression techniques and feature engineering with scikit-learn.',
    tech: ['Python', 'scikit-learn', 'Pandas'],
    github: 'https://github.com/Prakhar54-byte/House_Price_Prediction_ML',
    color: '#f1fa8c',
    icon: '🏠',
  },
  {
    name: 'Image Processing in C',
    description: 'Various image processing algorithms implemented from scratch in C, demonstrating low-level programming expertise.',
    tech: ['C', 'Algorithms'],
    github: 'https://github.com/Prakhar54-byte/Image-Processing-in-C',
    color: '#ffb86c',
    icon: '🖼️',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">$</span>
            <span className="text-white"> find </span>
            <span className="text-cyan-400">./projects</span>
            <span className="text-white"> -type </span>
            <span className="text-yellow-400">awesome</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-pink-400"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="terminal-window group cursor-pointer card-3d"
              style={{ 
                '--hover-color': project.color,
              } as React.CSSProperties}
            >
              {/* Project Header */}
              <div 
                className="p-4 border-b border-[#30363d] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="text-gray-400 text-sm">project/</span>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 
                  className="text-lg font-bold mb-3 group-hover:glow-text transition-all"
                  style={{ color: project.color }}
                >
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded border border-[#30363d] text-gray-400 hover:border-green-400 hover:text-green-400 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Line */}
              <div 
                className="h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: project.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Prakhar54-byte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-all"
          >
            <span className="text-gray-400">$</span>
            git clone all_projects
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
