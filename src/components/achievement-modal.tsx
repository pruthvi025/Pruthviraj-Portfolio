"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Star, Target, Award, TrendingUp } from "lucide-react";

interface AchievementModalProps {
  achievement: {
    icon: string;
    title: string;
    desc: string;
    color: string;
    details?: string;
    date?: string;
    impact?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementModal({ achievement, isOpen, onClose }: AchievementModalProps) {
  // Store scroll position in a ref to persist across re-renders
  const scrollPositionRef = React.useRef(0);
  
  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Completely lock the body
      document.body.style.cssText = `
        overflow: hidden !important;
        position: fixed !important;
        top: -${scrollPositionRef.current}px !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 100% !important;
      `;
      
      // Add classes for additional CSS rules
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      // Remove all restrictions first
      document.body.style.cssText = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      // Restore scroll position after styles are cleared
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
    
    return () => {
      // Cleanup function - ensure everything is restored
      document.body.style.cssText = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      // Restore scroll position on cleanup
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    };
  }, [isOpen]);

  if (!achievement) return null;

  const getIcon = (icon: string) => {
    switch (icon) {
      case "🎓": return <Trophy className="h-8 w-8 text-yellow-500" />;
      case "📈": return <TrendingUp className="h-8 w-8 text-purple-500" />;
      case "💻": return <Target className="h-8 w-8 text-green-500" />;
      case "📊": return <Star className="h-8 w-8 text-blue-500" />;
      case "🚀": return <Award className="h-8 w-8 text-orange-500" />;
      case "☁️": return <Award className="h-8 w-8 text-green-500" />;
      default: return <span className="text-4xl">{icon}</span>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm border border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {getIcon(achievement.icon)}
            <div>
              <DialogTitle className="text-2xl font-bold">{achievement.title}</DialogTitle>
              <Badge className="mt-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                Achievement
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{achievement.desc}</p>
            </div>
            
            {achievement.details && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Detailed Description</h3>
                <p className="text-muted-foreground leading-relaxed">{achievement.details}</p>
              </div>
            )}
            
            {achievement.date && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Achievement Date</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{achievement.date}</span>
                </div>
              </div>
            )}
            
            {achievement.impact && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Impact & Significance</h3>
                <p className="text-muted-foreground leading-relaxed">{achievement.impact}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
