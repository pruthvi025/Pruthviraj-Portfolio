"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-6 py-20 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20
        }} 
        className="grid gap-8 place-items-center relative z-10"
      >
        {/* Glassmorphism card with gradient background */}
        <div className="relative w-full max-w-4xl">
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
          
          {/* Main card */}
          <Card className="relative rounded-3xl w-full bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
            {/* Card header with gradient text */}
            <div className="p-8 md:p-12 text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  🚀 About Me
                </motion.h3>
                
                {/* Decorative line */}
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>

              {/* Content with staggered animations */}
              <motion.div 
                className="space-y-6 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.p
                  className="text-lg md:text-xl text-white/90 dark:text-white/90 text-gray-800 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  I'm a third-year B.Tech CSE student with strong foundations in OOPs, DBMS, OS, CN, and COA, and hands-on
                  experience in C, C++, Java, and Python. Skilled in Git & GitHub, I enjoy building efficient and impactful
                  solutions.
                </motion.p>
                
                <motion.p
                  className="text-lg md:text-xl text-white/90 dark:text-white/90 text-gray-800 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  My interests span across Data Science, Machine Learning, Deep Learning, and Natural Language Processing, where I
                  aim to apply my skills to real-world, innovative projects. Alongside technology, I'm also learning Spanish,
                  expanding my global perspective.
                </motion.p>
                
                <motion.p
                  className="text-xl md:text-2xl text-white dark:text-white text-gray-900 font-semibold leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  🚀 Driven by curiosity, I strive to grow as a versatile engineer and contribute to meaningful tech advancements.
                </motion.p>
              </motion.div>

              {/* Floating icons with hover effects */}
              <motion.div 
                className="flex justify-center items-center gap-8 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                {[
                  { icon: "💻", label: "Programming", color: "from-blue-400 to-cyan-400" },
                  { icon: "🤖", label: "AI/ML", color: "from-purple-400 to-pink-400" },
                  { icon: "📊", label: "Data Science", color: "from-green-400 to-emerald-400" },
                  { icon: "🌍", label: "Global", color: "from-orange-400 to-red-400" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20`}
                      whileHover={{ 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        borderColor: "rgba(255,255,255,0.4)"
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-sm text-white/70 dark:text-white/70 text-gray-700 font-medium group-hover:text-white dark:group-hover:text-white group-hover:text-gray-900 transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
