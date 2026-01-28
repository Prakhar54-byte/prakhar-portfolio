import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    color: 'green',
    skills: [
      { name: 'C/C++', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 82 },
    ]
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'cyan',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML/CSS', level: 92 },
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'purple',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 82 },
      { name: 'Django', level: 78 },
      { name: 'FastAPI', level: 75 },
    ]
  },
  {
    title: 'Databases',
    icon: '🗄️',
    color: 'yellow',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 82 },
    ]
  },
  {
    title: 'ML & Data',
    icon: '🤖',
    color: 'pink',
    skills: [
      { name: 'PyTorch', level: 70 },
      { name: 'scikit-learn', level: 75 },
      { name: 'NumPy/Pandas', level: 80 },
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: '🛠️',
    color: 'orange',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 78 },
      { name: 'MLflow', level: 70 },
    ]
  }
];

const colorMap: { [key: string]: string } = {
  green: '#00ff41',
  cyan: '#00d4ff',
  purple: '#bd93f9',
  yellow: '#f1fa8c',
  pink: '#ff79c6',
  orange: '#ffb86c',
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">$</span>
            <span className="text-white"> ls -la </span>
            <span className="text-cyan-400">./skills/</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-purple-400"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="terminal-window p-6 card-3d"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold" style={{ color: colorMap[category.color] }}>
                  {category.title}/
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          background: `linear-gradient(90deg, ${colorMap[category.color]}, ${colorMap[category.color]}88)`,
                          boxShadow: `0 0 10px ${colorMap[category.color]}` 
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            <span className="text-green-400">$</span> echo "Currently exploring..."
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-2xl">
            {['⚛️', '🟢', '🐍', '🐳', '⚡', '🔥', '📊', '🤖'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="cursor-default"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
