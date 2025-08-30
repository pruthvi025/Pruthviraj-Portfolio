"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe, Brain, Code2, Database, Smartphone, Palette, Zap } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    github: string;
    technologies?: string[];
  };
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return <Brain className="h-6 w-6 text-purple-400" />;
      case 'web':
        return <Code2 className="h-6 w-6 text-blue-400" />;
      case 'mobile':
        return <Smartphone className="h-6 w-6 text-green-400" />;
      case 'design':
        return <Palette className="h-6 w-6 text-pink-400" />;
      default:
        return <Zap className="h-6 w-6 text-yellow-400" />;
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

  return (
    <Card 
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)] border border-white/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
        <div className="absolute inset-0 flex items-center justify-center">
          {getCategoryIcon(project.category)}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs rounded-full border ${getCategoryColor(project.category)}`}>
            {project.category === 'ai-ml' ? 'AI/ML' : project.category === 'web' ? 'Web App' : project.category === 'mobile' ? 'Mobile' : 'Design'}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
        
        {/* Technologies */}
        {project.technologies && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-foreground/80 border border-white/10 hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-foreground/80 border border-white/10">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button asChild size="sm" className="rounded-2xl w-full hover:scale-105 transition-transform">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> View on GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
