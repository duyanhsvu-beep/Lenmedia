import React, { useState } from "react";
import { Play, Calendar, Users, Eye, Sliders, ChevronRight } from "lucide-react";
import { Project } from "../types";
import { playLaserSweep } from "./SoundSystem";

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    playLaserSweep();
    onOpenDetails(project);
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative rounded-xl overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-500 hover:border-cyber-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col justify-between h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light sweep reflecting overlay */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent transform -translate-x-full group-hover:animate-light-sweep pointer-events-none" />

      {/* Main visual header containing custom glass layout */}
      <div className="relative aspect-video w-full overflow-hidden bg-black flex-shrink-0">
        <div className="absolute inset-0 bg-transparent z-10 pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />

        {/* Dynamic scanning glitch bar */}
        {isHovered && (
          <div className="absolute inset-0 h-[3px] bg-cyber-cyan/30 w-full z-20 pointer-events-none animate-cyber-scan" />
        )}

        {/* Thumbnail Image */}
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
        />

        {/* Cyberpunk Specs Overlay Banner on top */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-[#030507]/90 px-2 py-0.5 rounded border border-cyan-500/20 text-[8px] font-mono font-medium tracking-wide uppercase text-cyber-cyan">
          <Sliders className="w-2.5 h-2.5" />
          {project.specs.camera.split(" ")[0]} RAW
        </div>

        {/* Date overlay banner */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-[#030507]/90 px-2 py-0.5 rounded border border-slate-800 text-[8px] font-mono tracking-widest text-slate-400">
          <Calendar className="w-2.5 h-2.5" />
          {project.year}
        </div>

        {/* Centered Laser Play Button Trigger */}
        <div className="absolute inset-0 flex items-center justify-center z-25 group">
          <button
            id={`play-project-hover-${project.id}`}
            onClick={handleClick}
            className="w-12 h-12 rounded-full bg-[#030507]/90 border border-cyber-cyan flex items-center justify-center text-cyber-cyan transition-all duration-300 transform scale-90 group-hover:scale-100 group-hover:bg-gradient-to-r group-hover:from-cyber-cyan group-hover:to-cyber-blue group-hover:text-black hover:shadow-[0_0_15px_#00E5FF] cursor-pointer"
          >
            <Play className="w-5 h-5 ml-0.5 fill-current group-hover:fill-transparent" />
          </button>
        </div>

        {/* Video preview simulation layer at the bottom on hover */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 pt-10 z-20">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>CLIENT: <span className="text-white">{project.client}</span></span>
            {project.specs.crowdSize && (
              <span className="flex items-center gap-0.5 text-cyber-cyan">
                <Users className="w-3 h-3" />
                {project.specs.crowdSize.split(" ")[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info context body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
            {project.category}
          </div>
          <h4 className="font-display font-bold text-sm tracking-tight text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
            {project.title}
          </h4>
          <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
          <button
            id={`open-details-btn-${project.id}`}
            onClick={handleClick}
            className="flex items-center gap-0.5 text-[10px] font-mono text-cyber-cyan hover:text-white transition-colors cursor-pointer"
          >
            SPECS_LOG <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
