import React, { useEffect, useRef } from "react";

interface LaserCanvasProps {
  active: boolean;
  bpm: number;
  strobeMode: boolean;
}

export default function LaserCanvas({ active, bpm, strobeMode }: LaserCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    interface Laser {
      startX: number;
      startY: number;
      angle: number;
      color: string;
      speed: number;
      width: number;
      alpha: number;
      sweepRange: number;
    }

    const lasers: Laser[] = [
      {
        startX: 0,
        startY: 0,
        angle: 0.2,
        color: "#00E5FF",
        speed: 0.0003,
        width: 1.5,
        alpha: 0.7,
        sweepRange: 0.10,
      },
      {
        startX: width,
        startY: 0,
        angle: Math.PI - 0.2,
        color: "#00BFFF",
        speed: -0.0004,
        width: 2.0,
        alpha: 0.65,
        sweepRange: 0.08,
      },
      {
        startX: width / 2,
        startY: 0,
        angle: Math.PI / 2,
        color: "#00E5FF",
        speed: 0.0005,
        width: 1.2,
        alpha: 0.75,
        sweepRange: 0.12,
      },
      {
        startX: 0,
        startY: height * 0.3,
        angle: 0.1,
        color: "#00BFFF",
        speed: 0.0002,
        width: 1.5,
        alpha: 0.55,
        sweepRange: 0.06,
      },
      {
        startX: width,
        startY: height * 0.3,
        angle: Math.PI - 0.1,
        color: "#00E5FF",
        speed: -0.0003,
        width: 2.2,
        alpha: 0.55,
        sweepRange: 0.06,
      },
    ];

    let lastBeatTime = Date.now();
    const beatInterval = (60 / bpm) * 1000;
    let strobeCounter = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!active) return;

      const now = Date.now();
      const isBeat = now - lastBeatTime >= beatInterval;
      if (isBeat) {
        lastBeatTime = now;
      }

      strobeCounter += 1;
      const beatProgress = ((now - lastBeatTime) % beatInterval) / beatInterval;
      const flash = Math.exp(-beatProgress * 4);

      lasers.forEach((laser) => {
        const timeFactor = now * laser.speed * (strobeMode ? 1.5 : 1.0);
        const sweepAngle = laser.angle + Math.sin(timeFactor) * laser.sweepRange;

        const length = Math.max(width, height) * 1.5;
        const endX = laser.startX + Math.cos(sweepAngle) * length;
        const endY = laser.startY + Math.sin(sweepAngle) * length;

        // Glow halo
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = laser.color;

        const currentAlpha = strobeMode
          ? (strobeCounter % 6 < 3 ? laser.alpha * 0.2 : laser.alpha * 1.2)
          : laser.alpha * (0.85 + flash * 0.15);

        ctx.globalAlpha = currentAlpha * 0.15;
        ctx.lineWidth = laser.width * (strobeMode ? 5 : 4);
        ctx.shadowBlur = strobeMode ? 30 : 20;
        ctx.shadowColor = laser.color;
        ctx.stroke();

        // Core bright line
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "#FFFFFF";
        ctx.globalAlpha = currentAlpha * 0.7;
        ctx.lineWidth = laser.width * 0.3;
        ctx.shadowBlur = 0;
        ctx.stroke();
      });

      if (strobeMode && strobeCounter % 20 < 2) {
        ctx.fillStyle = "rgba(0, 229, 255, 0.05)";
        ctx.fillRect(0, 0, width, height);
      }

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, "rgba(3, 5, 7, 0)");
      gradient.addColorStop(0.6, "rgba(3, 5, 7, 0.3)");
      gradient.addColorStop(1, "rgba(3, 5, 7, 0.95)");
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 1.0;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, bpm, strobeMode]);

  return (
    <canvas
      id="laser-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-100 mix-blend-screen"
    />
  );
}