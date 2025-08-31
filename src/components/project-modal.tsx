"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Calendar, Code2, Database, Brain, Smartphone, Palette, Zap } from "lucide-react";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    github: string;
    technologies?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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

  if (!project) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return <Brain className="h-5 w-5 text-purple-400" />;
      case 'web':
        return <Code2 className="h-5 w-5 text-blue-400" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-green-400" />;
      case 'design':
        return <Palette className="h-5 w-5 text-pink-400" />;
      default:
        return <Zap className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'web':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'mobile':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'design':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'AI/ML Project';
      case 'web':
        return 'Web Application';
      case 'mobile':
        return 'Mobile Application';
      case 'design':
        return 'Design Project';
      default:
        return 'Other Project';
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
          <div className="flex items-center gap-3 mb-4">
            {getCategoryIcon(project.category)}
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground">{project.title}</DialogTitle>
              <Badge className={`mt-2 ${getCategoryColor(project.category)}`}>
                {getCategoryName(project.category)}
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

        <div className="space-y-8 overflow-y-auto max-h-[calc(95vh-140px)] px-8 pb-8 project-modal-content">
          {/* Project Image/Icon */}
          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-white/60">
                {getCategoryIcon(project.category)}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Project Overview</h3>
            <p className="text-foreground/90 leading-relaxed text-base">{project.description}</p>
          </div>

          {/* Technologies */}
          {project.technologies && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/10 text-foreground/90 border border-white/20 hover:bg-white/20 transition-colors px-3 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Key Features</h3>
            <div className="grid gap-2">
              {project.category === 'ai-ml' && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <span>Machine Learning Algorithms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Database className="h-4 w-4 text-blue-400" />
                    <span>Data Processing & Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="h-4 w-4 text-green-400" />
                    <span>Model Training & Evaluation</span>
                  </div>
                </>
              )}
              {project.category === 'web' && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="h-4 w-4 text-blue-400" />
                    <span>Responsive Web Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Database className="h-4 w-4 text-green-400" />
                    <span>Database Integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ExternalLink className="h-4 w-4 text-purple-400" />
                    <span>API Development</span>
                  </div>
                </>
              )}
              {project.category === 'mobile' && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4 text-green-400" />
                    <span>Cross-platform Development</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Database className="h-4 w-4 text-blue-400" />
                    <span>Offline Capabilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ExternalLink className="h-4 w-4 text-purple-400" />
                    <span>Native Features Integration</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{project.technologies?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {project.category === 'ai-ml' ? 'ML' : project.category === 'web' ? 'Web' : project.category === 'mobile' ? 'Mobile' : 'Other'}
              </div>
              <div className="text-sm text-muted-foreground">Category</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <Button asChild className="flex-1" size="lg">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
