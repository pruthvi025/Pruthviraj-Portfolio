"use client";
import { motion } from "framer-motion";

export function DeveloperAnimation() {
  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
      {/* Code Lines */}
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
        {/* Animated Code Blocks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <div className="w-16 h-2 bg-gray-600 rounded" />
          <div className="w-8 h-2 bg-green-500 rounded" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center space-x-2 ml-4"
        >
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
          <div className="w-12 h-2 bg-gray-600 rounded" />
          <div className="w-6 h-2 bg-blue-500 rounded" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center space-x-2 ml-8"
        >
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <div className="w-10 h-2 bg-gray-600 rounded" />
          <div className="w-4 h-2 bg-purple-500 rounded" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center space-x-2 ml-4"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-14 h-2 bg-gray-600 rounded" />
          <div className="w-5 h-2 bg-yellow-500 rounded" />
        </motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-4 right-4 text-4xl"
      >
        💻
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-4 left-4 text-3xl"
      >
        🚀
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 left-2 text-2xl"
      >
        ⚡
      </motion.div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <motion.path
          d="M 50 50 Q 150 100 250 150"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.path
          d="M 250 150 Q 350 200 450 250"
          stroke="rgba(147, 51, 234, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </svg>
    </div>
  );
}
