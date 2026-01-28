import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Prakhar54-byte',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: '#00ff41',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/prakhar-chauhan-9a32b52b4',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: '#0077b5',
    },
    {
      name: 'Email',
      url: 'mailto:prakharchauhan179@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: '#00d4ff',
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com/profile/',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/>
        </svg>
      ),
      color: '#ffb86c',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      ),
      color: '#f1fa8c',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">$</span>
            <span className="text-white"> ssh </span>
            <span className="text-cyan-400">connect@prakhar</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
          <p className="text-gray-400 mt-4">
            Let's build something awesome together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 text-sm ml-2">send_message.sh</span>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <p className="text-green-400 glow-text">Message sent successfully!</p>
                  <p className="text-gray-500 text-sm mt-2">I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <span className="text-green-400">$</span> enter name:
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a0e14] border border-[#30363d] rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <span className="text-green-400">$</span> enter email:
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a0e14] border border-[#30363d] rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <span className="text-green-400">$</span> enter message:
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#0a0e14] border border-[#30363d] rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500/20 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-all duration-300"
                  >
                    <span className="mr-2">$</span>
                    send_message --now
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Info */}
            <div className="terminal-window p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                <span className="text-purple-400">📍</span> Quick Connect
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">
                  <span className="text-green-400">email:</span>{' '}
                  <a href="mailto:prakharchauhan179@gmail.com" className="text-cyan-400 hover:underline">
                    prakharchauhan179@gmail.com
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-green-400">phone:</span>{' '}
                  <span className="text-white">+91-8369512080</span>
                </p>
                <p className="text-gray-400">
                  <span className="text-green-400">location:</span>{' '}
                  <span className="text-white">IIT Jodhpur, India</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="terminal-window p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                <span className="text-yellow-400">🔗</span> Find me online
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded border border-[#30363d] hover:border-current transition-all group"
                    style={{ '--hover-color': link.color } as React.CSSProperties}
                  >
                    <span 
                      className="transition-colors group-hover:text-current"
                      style={{ color: link.color }}
                    >
                      {link.icon}
                    </span>
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Fun Terminal */}
            <div className="terminal-window p-4">
              <p className="text-gray-500 text-sm">
                <span className="text-green-400">$</span> echo "Open to opportunities!"
              </p>
              <p className="text-cyan-400 text-sm mt-1">Open to opportunities! 🚀</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
