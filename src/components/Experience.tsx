import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'CSR Connect',
    role: 'Backend Developer',
    period: 'Jan 2025 - Mar 2025',
    tech: ['Django', 'PostgreSQL', 'Docker', 'RAG'],
    points: [
      'Engineered RAG pipeline using Google Gemini for parsing corporate sustainability reports against UN SDGs',
      'Reduced manual compliance checks by 40% through automation',
      'Designed PostgreSQL schema for 10k+ records with <150ms query latency',
      'Containerized backend using Docker for cloud deployment',
    ],
    color: '#00ff41',
  },
  {
    company: 'IIT Jodhpur & AIIMS Jodhpur',
    role: 'Clinical Guideline Analyst',
    period: 'Aug 2024 - Dec 2024',
    tech: ['Healthcare AI', 'Decision Trees', 'Rule Engines'],
    points: [
      'Transformed NCCN cancer guidelines into dynamic decision-tree engine',
      'Collaborated with clinicians to translate medical protocols into Boolean logic',
      'Contributed to Clinical Decision Support System development',
    ],
    color: '#00d4ff',
  },
  {
    company: 'IIT Jodhpur',
    role: 'Secretary, BSBE Department',
    period: '2024 - Present',
    tech: ['Leadership', 'Event Management'],
    points: [
      'Leading departmental initiatives and student activities',
      'Associate at The Product Club, IIT Jodhpur',
      'Volunteer at Prometo (Annual Techfest)',
    ],
    color: '#bd93f9',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">$</span>
            <span className="text-white"> git log </span>
            <span className="text-cyan-400">--experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-purple-400"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#30363d] transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div 
                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full transform md:-translate-x-1/2 -translate-y-1"
                style={{ 
                  backgroundColor: exp.color,
                  boxShadow: `0 0 20px ${exp.color}`,
                }}
              />

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="terminal-window p-6 hover:scale-[1.02] transition-transform">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-500 text-xs ml-2">{exp.period}</span>
                  </div>

                  {/* Company & Role */}
                  <h3 className="text-lg font-bold" style={{ color: exp.color }}>
                    {exp.company}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{exp.role}</p>

                  {/* Points */}
                  <ul className="space-y-2 mb-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-400 mt-1">→</span>
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full border text-gray-400"
                        style={{ borderColor: exp.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="text-yellow-400">📚</span>
            <span className="text-white ml-2">Education</span>
          </h3>

          <div className="terminal-window p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">🎓</span>
              <h4 className="text-lg font-bold text-white">
                Indian Institute of Technology, Jodhpur
              </h4>
            </div>
            <p className="text-cyan-400 mb-2">
              B.Tech in Bioscience & Bioengineering + Minor in AI
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>📅 2023 - 2027</span>
              <span>📊 CGPA: <span className="text-green-400">7.52</span></span>
            </div>
            <div className="mt-4 pt-4 border-t border-[#30363d]">
              <p className="text-gray-500 text-sm">
                <span className="text-green-400">$ </span>
                Key Courses: DSA, Machine Learning, Computer Science
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
