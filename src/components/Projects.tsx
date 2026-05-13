import { motion } from 'framer-motion';

const projects = [
  {
    name: 'PneumoOps',
    what: 'Production-style MLOps system for multi-label chest X-ray disease detection across 14 thoracic conditions.',
    stack: 'PyTorch, ONNX Runtime, FastAPI, Gradio, Docker, Prometheus, MedMNIST',
    challenge: 'Served medical-imaging models in a way that exposes latency, drift, and model degradation signals instead of hiding them behind a demo UI.',
    features: ['A/B routing between PyTorch and ONNX inference', 'KS-test data drift monitor', 'Prometheus /metrics endpoint with latency and drift counters'],
    learned: 'How model serving, observability, calibration, and deployment ethics fit together in a real ML system.',
    tech: ['PyTorch', 'ONNX', 'FastAPI', 'MLOps'],
    github: 'https://github.com/Prakhar54-byte/PneumoOps',
    color: '#00ff41',
    icon: '🫁',
  },
  {
    name: 'CSR Connect',
    what: 'AI platform that maps CSR reports and initiatives to UN Sustainable Development Goals.',
    stack: 'Django, DRF, PostgreSQL, Next.js, Google Gemini, pdfplumber, RAG',
    challenge: 'Turned unstructured PDF reports into searchable, classified CSR records with meaningful SDG labels.',
    features: ['Gemini-based SDG classification', 'PDF text and table extraction', 'Admin portal with SDG, location, and organization filters'],
    learned: 'How to combine document parsing, LLM classification, and structured APIs for an applied AI workflow.',
    tech: ['Gemini', 'RAG', 'Django', 'PostgreSQL'],
    github: 'https://github.com/Prakhar54-byte/CSRconnect',
    color: '#00d4ff',
    icon: '🌍',
  },
  {
    name: 'House Price Prediction ML',
    what: 'End-to-end ML pipeline for predicting Ames Housing sale prices from 79 property features.',
    stack: 'Python, scikit-learn, XGBoost, FastAPI, MLflow, ZenML, Docker',
    challenge: 'Moved beyond a notebook by comparing models, tracking metrics, validating inputs, and serving predictions through an API.',
    features: ['XGBoost model with R2 = 0.9211', 'FastAPI single and batch prediction endpoints', 'MLflow experiment tracking'],
    learned: 'How to evaluate models across accuracy, latency, overfitting, and deployment readiness.',
    tech: ['XGBoost', 'FastAPI', 'MLflow', 'Docker'],
    github: 'https://github.com/Prakhar54-byte/House_Price_Prediction_ML',
    color: '#bd93f9',
    icon: '🏠',
  },
  {
    name: 'Spark Video Streaming',
    what: 'Full-stack video streaming platform with authentication, upload flows, and adaptive-streaming architecture.',
    stack: 'MongoDB, Express, React/Next.js, Node.js, FFmpeg, HLS.js, Docker',
    challenge: 'Designed a scalable media platform where large video files need secure upload, processing, storage, and smooth playback.',
    features: ['JWT authentication and backend API structure', 'FFmpeg/HLS processing roadmap for 360p-4K quality options', 'Microservices-ready layout for processing, monitoring, storage, and serving'],
    learned: 'How software engineering decisions around auth, queues, caching, and media processing shape real user experience.',
    tech: ['MERN', 'FFmpeg', 'HLS', 'Docker'],
    github: 'https://github.com/Prakhar54-byte/Video_Streaming',
    color: '#ff79c6',
    icon: '🎬',
  },
  {
    name: 'ResNet CIFAR-10 Trainer',
    what: 'Training workflow for fine-tuning ResNet-18 on a Hugging Face CIFAR-10 subset.',
    stack: 'PyTorch, Torchvision, Hugging Face Datasets, W&B, Hugging Face Hub',
    challenge: 'Built a reproducible image-classification loop with augmentation, validation tracking, checkpointing, and model publishing.',
    features: ['Pretrained ResNet-18 fine-tuning', 'W&B train/val/test logging', 'Best checkpoint pushed to Hugging Face Hub'],
    learned: 'How to structure a training script that connects dataset loading, experiment tracking, and artifact release.',
    tech: ['PyTorch', 'ResNet', 'W&B', 'HF Hub'],
    github: 'https://github.com/Prakhar54-byte/B23BB1032Minor-Exam',
    color: '#f1fa8c',
    icon: '🧠',
  },
  {
    name: 'YOLOv12 Object Detection',
    what: 'Computer-vision repository focused on attention-centric real-time object detection with YOLOv12.',
    stack: 'Python, Ultralytics, YOLOv12, TensorRT/ONNX export paths',
    challenge: 'Explored how modern object detectors balance attention mechanisms with real-time latency constraints.',
    features: ['Training, prediction, validation, and export workflows', 'Detection/segmentation/classification model variants', 'Gradio demo entrypoint'],
    learned: 'How production vision models are evaluated across mAP, FLOPs, parameters, and inference latency.',
    tech: ['YOLOv12', 'Python', 'Detection', 'ONNX'],
    github: 'https://github.com/Prakhar54-byte/YOLOv12',
    color: '#ffb86c',
    icon: '👁️',
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
            <span className="text-cyan-400">./ai-ml-sde-projects</span>
            <span className="text-white"> -type </span>
            <span className="text-yellow-400">case-study</span>
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
                <div className="space-y-3 text-sm mb-4 leading-relaxed">
                  <p className="text-gray-400">
                    <span className="text-green-400">what:</span> {project.what}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-cyan-400">stack:</span> {project.stack}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-yellow-400">challenge:</span> {project.challenge}
                  </p>
                  <div>
                    <p className="text-purple-400 mb-2">features:</p>
                    <ul className="space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-gray-400">
                          <span className="text-green-400">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-400">
                    <span className="text-pink-400">learned:</span> {project.learned}
                  </p>
                </div>

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
            git clone ai_ml_sde_case_studies
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
