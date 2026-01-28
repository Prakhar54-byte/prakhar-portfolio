import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">$</span>
            <span className="text-white"> cat </span>
            <span className="text-cyan-400">about_me.md</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - ASCII Art & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-window p-6"
          >
            <pre className="text-green-400 text-xs md:text-sm mb-6 overflow-x-auto">
{`
    ██████╗ ██████╗  █████╗ ██╗  ██╗██╗  ██╗ █████╗ ██████╗ 
    ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██║  ██║██╔══██╗██╔══██╗
    ██████╔╝██████╔╝███████║█████╔╝ ███████║███████║██████╔╝
    ██╔═══╝ ██╔══██╗██╔══██║██╔═██╗ ██╔══██║██╔══██║██╔══██╗
    ██║     ██║  ██║██║  ██║██║  ██╗██║  ██║██║  ██║██║  ██║
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
            </pre>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-purple-400">📍</span>
                <span className="text-gray-400">Location:</span>
                <span className="text-white">IIT Jodhpur, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400">🎓</span>
                <span className="text-gray-400">Degree:</span>
                <span className="text-white">B.Tech BSBE + AI Minor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400">📊</span>
                <span className="text-gray-400">CGPA:</span>
                <span className="text-green-400">7.52</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400">📅</span>
                <span className="text-gray-400">Batch:</span>
                <span className="text-white">2023 - 2027</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="terminal-window p-6">
              <div className="text-gray-400 text-sm mb-4">
                <span className="text-green-400">// </span>Who am I?
              </div>
              <p className="text-gray-300 leading-relaxed">
                I'm an aspiring <span className="text-green-400">Software Developer</span> studying at 
                <span className="text-yellow-400"> IIT Jodhpur</span>. Passionate about exploring new 
                technologies and building impactful solutions.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Currently diving deeper into <span className="text-cyan-400">Full Stack Development</span> 
                with React, Node.js, and TypeScript, while also exploring 
                <span className="text-purple-400"> ML/AI applications</span>.
              </p>
            </div>

            <div className="terminal-window p-6">
              <div className="text-gray-400 text-sm mb-4">
                <span className="text-green-400">// </span>What drives me?
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Building production-ready applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Solving complex algorithmic problems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Contributing to open-source projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Exploring intersection of Bio & Tech</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
