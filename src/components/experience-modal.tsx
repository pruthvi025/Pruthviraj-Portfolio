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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm border border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {getIcon(experience.icon)}
            <div>
              <DialogTitle className="text-2xl font-bold">{experience.title}</DialogTitle>
              <Badge className="mt-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30">
                {experience.type}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span><span className="font-medium">Company:</span> {experience.company}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span><span className="font-medium">Duration:</span> {experience.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span><span className="font-medium">Location:</span> {experience.location}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Achievements</h3>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm rounded-full px-3 py-1 text-foreground bg-gradient-to-r from-white/10 to-white/5 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
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
