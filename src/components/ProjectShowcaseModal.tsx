import React, { useState } from "react";
import { X, Play, Sliders, AlertTriangle, Monitor, Share2, Sparkles, Check, Server, Camera, Eye } from "lucide-react";
import { Project } from "../types";
import { playSubDrop, playLaserSweep } from "./SoundSystem";

interface ProjectShowcaseModalProps {
  project: Project | null;
  onClose: () => void;
  onApplyStyle: (project: Project) => void;
}

export default function ProjectShowcaseModal({ project, onClose, onApplyStyle }: ProjectShowcaseModalProps) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!project) return null;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(project.videoUrl);
      setCopied(true);
      playLaserSweep();
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (e) {
      // safe fallback
    }
  };

  const handleApplyConfig = () => {
    onApplyStyle(project);
    playSubDrop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-black/95 backdrop-blur-md">
      {/* Dynamic Laser background element */}
      <div className="absolute inset-0 bg-transparent pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl bg-[#071018] border border-cyan-500/30 rounded-xl overflow-hidden glass-panel shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col max-h-[90vh]">
        {/* Neon laser border header bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

        {/* Top bar control layout */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/10 bg-slate-950/60 z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00E5FF] animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              PROJECT REEL LOG: <span className="text-cyber-cyan">{project.id}</span>
            </span>
          </div>

          <button
            id="close-modal-btn"
            onClick={() => {
              playLaserSweep();
              onClose();
            }}
            className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyber-cyan transition-all cursor-pointer bg-[#030507]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll area */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Showcase Video Player Container */}
          <div className="relative aspect-video w-full bg-black flex-shrink-0 border-b border-cyan-500/10">
            {isPlaying ? (
              <iframe
                src={`${project.videoUrl}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0`}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
                <Play className="w-16 h-16 text-cyber-cyan animate-pulse cursor-pointer" onClick={() => setIsPlaying(true)} />
                <p className="font-mono text-xs mt-3 text-slate-400">LOAD VIDEO FEEDS</p>
              </div>
            )}
            
            {/* Soft film grain overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat bg-[url('https://picsum.photos/200/200?blur=4')]" />
          </div>

          {/* Details layout grids */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Description and category (Spans 2 grids) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase">
                  {project.category} // {project.year}
                </span>
                <h3 className="font-display font-medium text-xl md:text-2xl text-white tracking-tight leading-snug mt-1">
                  {project.title}
                </h3>
              </div>

              <div className="p-4 bg-slate-950/40 rounded border border-slate-800/40">
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tag system */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-bold tracking-tight px-2.5 py-1 rounded bg-[#030507] border border-cyan-500/10 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all cursor-default"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* Action buttons triggers */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  id="modal-copy-link-btn"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-800 hover:border-cyber-cyan/50 rounded bg-[#030507] text-xs font-mono text-slate-300 hover:text-cyber-cyan cursor-pointer transition-all uppercase"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      COPIED TO RECORD!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      COPY REF_URL
                    </>
                  )}
                </button>

                <button
                  id="modal-apply-config-btn"
                  onClick={handleApplyConfig}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-cyan-500/20 hover:border-cyber-cyan/50 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-mono text-cyber-cyan cursor-pointer transition-all uppercase"
                >
                  <Sparkles className="w-4 h-4" />
                  Als referentie gebruiken
                </button>
              </div>
            </div>

            {/* Spec Logs Side bar column (Spans 1 grid) */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-cyan-500/10">
                <Sliders className="w-4 h-4 text-cyber-cyan" />
                <span className="font-mono text-[10px] text-white tracking-widest uppercase">PRODUCTION_SPECS</span>
              </div>

              {/* Spec sheet */}
              <div className="space-y-3 font-mono text-[10px] text-slate-400">
                {/* Camera */}
                <div className="p-2.5 rounded bg-[#030507] border border-slate-900 leading-normal">
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">CINE CAMERA RIG</div>
                  <div className="text-white font-sans text-xs flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-cyber-cyan flex-shrink-0" />
                    {project.specs.camera}
                  </div>
                </div>

                {/* Glasses / Lenses */}
                <div className="p-2.5 rounded bg-[#030507] border border-slate-900 leading-normal">
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">OPTICS / LENSES</div>
                  <div className="text-slate-250 font-sans text-xs">
                    {project.specs.lens}
                  </div>
                </div>

                {/* Framerate */}
                <div className="p-2.5 rounded bg-[#030507] border border-slate-900 leading-normal">
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">CINEMATIC TIMINGS</div>
                  <div className="text-slate-250 font-sans text-xs">
                    {project.specs.framerate}
                  </div>
                </div>

                {/* Crew Size */}
                <div className="p-2.5 rounded bg-[#030507] border border-slate-900 leading-normal">
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">PRODUCTION FORCE</div>
                  <div className="text-slate-250 font-sans text-xs">
                    {project.specs.crewSize}
                  </div>
                </div>

                {/* Lead Role in details */}
                <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-500/10 leading-normal">
                  <div className="text-[8px] text-cyan-400 uppercase tracking-widest leading-none mb-1">LENNERT_ROLE</div>
                  <div className="text-white font-sans font-bold text-xs">
                    {project.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar layout at bottom of modal body */}
          <div className="p-4 border-t border-cyan-500/10 bg-slate-950/80 mt-2">
            <div className="grid grid-cols-3 gap-2 text-center">
              {project.stats.map((st) => (
                <div key={st.label} className="p-2 rounded bg-[#030507]/60 border border-slate-900">
                  <div className="text-[9px] font-mono uppercase text-slate-500">{st.label}</div>
                  <div className="font-display text-cyber-cyan font-bold text-sm tracking-tight">{st.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
