"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  icon: string;
  title: string;
  desc: string;
  details?: string;
  date?: string;
  impact?: string;
}

interface AchievementModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementModal({ achievement, isOpen, onClose }: AchievementModalProps) {
  if (!achievement) return null;

  const getIcon = (icon: string) => {
    switch (icon) {
      case "🎓": return <Award className="h-8 w-8 text-blue-500" />;
      case "📈": return <Award className="h-8 w-8 text-purple-500" />;
      case "☁️": return <Award className="h-8 w-8 text-green-500" />;
      case "📊": return <Award className="h-8 w-8 text-orange-500" />;
      case "🎯": return <Award className="h-8 w-8 text-indigo-500" />;
      case "🚀": return <Award className="h-8 w-8 text-orange-500" />;
      default: return <span className="text-4xl">{icon}</span>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent 
            className="w-[90%] max-w-3xl max-h-[90vh] overflow-hidden bg-transparent border-0 shadow-none p-0" 
            showCloseButton={false}
            onEscapeKeyDown={onClose}
            onInteractOutside={onClose}
          >
            <motion.div
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 pb-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20 mb-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <div className="text-3xl">
                      {getIcon(achievement.icon)}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                        {achievement.title}
                      </DialogTitle>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Badge className="mt-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border-purple-400/50 px-3 py-1 text-sm font-medium shadow-lg">
                        🏆 Achievement
                      </Badge>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-white text-xl font-bold rounded-full border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 z-50 relative backdrop-blur-sm hover:scale-110"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {/* Overview Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Overview</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed text-base">{achievement.desc}</p>
                </motion.div>
                
                {/* Detailed Description Section */}
                {achievement.details && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 flex items-center justify-center">
                        <span className="text-lg">🔍</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">Detailed Description</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-base">{achievement.details}</p>
                  </motion.div>
                )}
                
                {/* Achievement Date Section */}
                {achievement.date && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/30 to-emerald-400/30 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Calendar className="h-5 w-5 text-green-300" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">Achievement Date</h3>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <span className="text-lg">📅</span>
                      <span className="text-base font-medium">{achievement.date}</span>
                    </div>
                  </motion.div>
                )}
                
                {/* Impact Section */}
                {achievement.impact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400/30 to-red-400/30 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="text-lg">🚀</span>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">Impact & Significance</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-base">{achievement.impact}</p>
                  </motion.div>
                )}
                
                {/* Bottom spacing for scrollbar visibility */}
                <div className="h-4"></div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
