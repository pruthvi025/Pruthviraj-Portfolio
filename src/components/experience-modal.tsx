"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Target, Award, TrendingUp, Code2, Database, Cloud, Shield, Zap } from "lucide-react";

interface ExperienceModalProps {
  experience: {
    title: string;
    company: string;
    type: string;
    duration: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
    icon: string;
    color: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExperienceModal({ experience, isOpen, onClose }: ExperienceModalProps) {
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

  if (!experience) return null;

  const getIcon = (icon: string) => {
    switch (icon) {
      case "🐍": return <Code2 className="h-8 w-8 text-yellow-500" />;
      case "☁️": return <Cloud className="h-8 w-8 text-green-500" />;
      case "📊": return <TrendingUp className="h-8 w-8 text-purple-500" />;
      default: return <span className="text-4xl">{icon}</span>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="!max-w-4xl !w-[95vw] max-h-[95vh] overflow-hidden bg-background/95 backdrop-blur-sm border border-white/10 p-0" 
        showCloseButton={false}
        onEscapeKeyDown={onClose}
        onInteractOutside={onClose}
      >
        <DialogHeader className="pb-4 px-8 pt-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">
              {getIcon(experience.icon)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-foreground">{experience.title}</DialogTitle>
              <Badge className="mt-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                {experience.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-12 w-12 p-0 bg-white/10 hover:bg-white/20 text-white text-2xl font-bold rounded-full border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 z-50 relative backdrop-blur-sm"
            >
              <span className="sr-only">Close</span>
              ×
            </Button>
          </div>
        </DialogHeader>
        
        <div 
          className="space-y-8 overflow-y-auto max-h-[calc(95vh-160px)] px-8 pb-8 experience-modal-content" 
          style={{ 
            scrollbarWidth: 'thin', 
            scrollbarGutter: 'stable',
            minHeight: '400px' // Ensure minimum height for scrolling
          }}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-foreground/80">
                <Building2 className="h-5 w-5 text-blue-400" />
                <span><span className="font-medium text-foreground">Company:</span> {experience.company}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Calendar className="h-5 w-5 text-green-400" />
                <span><span className="font-medium text-foreground">Duration:</span> {experience.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span><span className="font-medium text-foreground">Location:</span> {experience.location}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Overview</h3>
              <p className="text-foreground/90 leading-relaxed text-base">{experience.description}</p>
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-foreground/80 text-sm leading-relaxed">
                  This role provided valuable hands-on experience in {experience.type.toLowerCase()} and contributed significantly to my professional growth and technical skills development.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Key Achievements</h3>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-foreground/90 leading-relaxed flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-lg">•</span>
                    <span className="text-base">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm rounded-full px-3 py-1 text-foreground/90 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom spacing for scrollbar visibility */}
          <div className="h-8"></div>
          
          {/* Additional spacing to ensure scrollbar visibility */}
          <div className="h-8"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
