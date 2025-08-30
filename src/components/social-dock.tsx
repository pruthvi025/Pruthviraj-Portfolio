"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  darkColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Home",
    icon: FaHome,
    href: "#hero",
    color: "from-blue-500 to-cyan-500",
    darkColor: "from-blue-400 to-cyan-400",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/pruthvi025",
    color: "from-gray-700 to-gray-900",
    darkColor: "from-gray-600 to-gray-800",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/pruthviraj-thorbole-b33370294",
    color: "from-blue-600 to-blue-800",
    darkColor: "from-blue-500 to-blue-700",
  },
];

export function SocialDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Auto-detect system preference
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Update document class for global theme
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Open external link
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Social Dock */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.5 
        }}
      >
        <motion.div 
          className={`
            flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl
            ${isDarkMode 
              ? 'bg-black/20 backdrop-blur-xl border border-white/10' 
              : 'bg-white/20 backdrop-blur-xl border border-black/10'
            }
            transition-all duration-500 ease-out
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Social Icons */}
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.button
                key={link.name}
                onClick={() => handleClick(link.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
                aria-label={link.name}
                whileHover={{ 
                  scale: 1.15,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: isHovered ? -8 : 0,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                {/* Dock Bounce Effect Container */}
                <motion.div
                  className="relative p-3 rounded-full"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                >
                  {/* Background glow effect */}
                  <motion.div 
                    className={`
                      absolute inset-0 rounded-full bg-gradient-to-r 
                      ${isDarkMode ? link.darkColor : link.color}
                      opacity-0 group-hover:opacity-30 
                      transition-opacity duration-300
                    `}
                    animate={{
                      opacity: isHovered ? 0.4 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                  />
                  
                  {/* Icon */}
                  <Icon 
                    className={`
                      relative z-10 w-6 h-6 md:w-7 md:h-7 transition-all duration-300
                      ${isDarkMode 
                        ? 'text-white group-hover:text-gray-100' 
                        : 'text-gray-700 group-hover:text-gray-900'
                      }
                      drop-shadow-lg
                    `}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div 
                    className={`
                      absolute inset-0 rounded-full bg-gradient-to-r 
                      ${isDarkMode ? link.darkColor : link.color}
                      opacity-0 blur-sm
                    `}
                    animate={{
                      opacity: isHovered ? 0.2 : 0,
                      scale: isHovered ? 1.3 : 1,
                    }}
                  />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      className={`
                        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 
                        px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium
                        ${isDarkMode 
                          ? 'bg-white/90 text-gray-900' 
                          : 'bg-gray-900/90 text-white'
                        }
                        shadow-lg backdrop-blur-sm
                      `}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {link.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}

          {/* Theme Toggle Divider */}
          <div className={`
            w-px h-8 mx-2 
            ${isDarkMode ? 'bg-white/20' : 'bg-gray-300/50'}
          `} />

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="relative p-3 rounded-full group"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            whileHover={{ 
              scale: 1.1,
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Theme Toggle Background */}
            <motion.div 
              className={`
                absolute inset-0 rounded-full bg-gradient-to-r
                ${isDarkMode 
                  ? 'from-yellow-400 to-orange-500' 
                  : 'from-blue-600 to-purple-600'
                }
                opacity-0 group-hover:opacity-30 
                transition-opacity duration-300
              `}
            />
            
            {/* Theme Icon */}
            <motion.div
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isDarkMode ? (
                <FaSun className={`
                  relative z-10 w-6 h-6 md:w-7 md:h-7 
                  text-yellow-400 group-hover:text-yellow-300
                  transition-colors duration-300 drop-shadow-lg
                `} />
              ) : (
                <FaMoon className={`
                  relative z-10 w-6 h-6 md:w-7 md:h-7 
                  text-blue-600 group-hover:text-blue-500
                  transition-colors duration-300 drop-shadow-lg
                `} />
              )}
            </motion.div>

            {/* Theme Toggle Glow */}
            <motion.div 
              className={`
                absolute inset-0 rounded-full bg-gradient-to-r
                ${isDarkMode 
                  ? 'from-yellow-400 to-orange-500' 
                  : 'from-blue-600 to-purple-600'
                }
                opacity-0 blur-sm
              `}
              whileHover={{ opacity: 0.2, scale: 1.2 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
