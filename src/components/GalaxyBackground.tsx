import React, { useEffect, useRef } from "react";

interface Star {
  x: number; // 0 to 1
  y: number; // 0 to 1
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  layer: 1 | 2 | 3;
  color: string;
}

interface Nebula {
  x: number; // 0 to 1
  y: number; // 0 to 1
  baseRadius: number;
  color: string; // rgba
  vx: number;
  vy: number;
  pulseSpeed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  dx: number;
  dy: number;
  width: number;
  opacity: number;
  life: number; // 1 to 0
  decay: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  // Keep track of interaction states via refs to avoid triggering unnecessary React re-renders
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Scaling helper for high DPI (Retina) screens
    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Initialize mouse and scroll to current positions
    mouseRef.current.x = mouseRef.current.targetX = width / 2;
    mouseRef.current.y = mouseRef.current.targetY = height / 2;
    scrollRef.current.y = scrollRef.current.targetY = window.scrollY;

    // Generate Stars
    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars: Star[] = [];
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(255, 253, 245, ", // Gold/warm white
      "rgba(230, 242, 255, ", // Cool blueish white
      "rgba(255, 240, 245, ", // Lavender white
    ];

    for (let i = 0; i < starCount; i++) {
      // Allocate to different depth layers
      const rand = Math.random();
      let layer: 1 | 2 | 3 = 1;
      let size = 0.5 + Math.random() * 0.5; // Distant/small

      if (rand > 0.85) {
        layer = 3;
        size = 1.5 + Math.random() * 0.8; // Close/large
      } else if (rand > 0.5) {
        layer = 2;
        size = 0.9 + Math.random() * 0.6; // Mid
      }

      stars.push({
        x: Math.random(),
        y: Math.random(),
        size,
        baseOpacity: 0.15 + Math.random() * 0.7,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        layer,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Generate Nebulae
    const nebulae: Nebula[] = [
      {
        x: 0.15,
        y: 0.2,
        baseRadius: Math.min(width, height) * 0.45,
        color: "rgba(24, 178, 209, 0.09)", // Cosmic Teal
        vx: 0.0001,
        vy: 0.00008,
        pulseSpeed: 0.0003,
        phase: 0,
      },
      {
        x: 0.8,
        y: 0.3,
        baseRadius: Math.min(width, height) * 0.5,
        color: "rgba(138, 28, 48, 0.12)", // Crimson/Burgundy
        vx: -0.00008,
        vy: 0.0001,
        pulseSpeed: 0.0002,
        phase: Math.PI / 3,
      },
      {
        x: 0.5,
        y: 0.6,
        baseRadius: Math.min(width, height) * 0.55,
        color: "rgba(179, 146, 85, 0.07)", // Sacred Gold
        vx: 0.00005,
        vy: -0.00006,
        pulseSpeed: 0.0004,
        phase: (Math.PI * 2) / 3,
      },
      {
        x: 0.25,
        y: 0.8,
        baseRadius: Math.min(width, height) * 0.4,
        color: "rgba(90, 20, 110, 0.08)", // Mystical Purple
        vx: -0.00006,
        vy: -0.00005,
        pulseSpeed: 0.0001,
        phase: Math.PI,
      },
    ];

    // Shooting Stars
    let shootingStars: ShootingStar[] = [];

    // Main animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      const delta = time - lastTime;
      lastTime = time;

      // 1. Clear with very dark slate-purple cosmic space color
      ctx.fillStyle = "#08020a";
      ctx.fillRect(0, 0, width, height);

      // 2. Smoothly ease mouse and scroll coordinates (inertia)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.1;

      // Shift values derived from interactions
      const mouseShiftX = (mouseRef.current.x - width / 2) * 0.04;
      const mouseShiftY = (mouseRef.current.y - height / 2) * 0.04;
      const scrollShiftY = scrollRef.current.y * 0.15;

      // 3. Render Drifting Nebulae
      nebulae.forEach((neb) => {
        // Slowly update positions (wrapping around boundaries)
        neb.x = (neb.x + neb.vx + 1) % 1;
        neb.y = (neb.y + neb.vy + 1) % 1;
        neb.phase += neb.pulseSpeed;

        const nebX = neb.x * width;
        // Shift vertically with scroll and gently with mouse
        const nebY = (neb.y * height - scrollShiftY * 0.4 + height) % height;

        // Pulse radius gently
        const currentRadius = neb.baseRadius * (1 + Math.sin(neb.phase) * 0.15);

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(nebX, nebY, 0, nebX, nebY, currentRadius);
        gradient.addColorStop(0, neb.color);
        gradient.addColorStop(0.5, neb.color.replace(/[\d.]+\)$/, "0.03)")); // Fade out middle
        gradient.addColorStop(1, "rgba(8, 2, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebX, nebY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Render Stars
      stars.forEach((star) => {
        // Calculate coordinates with wrapping
        // layer 1 is slowest (furthest), layer 3 is fastest (closest)
        let drawX = (star.x * width + mouseShiftX * star.layer) % width;
        if (drawX < 0) drawX += width;

        let drawY = (star.y * height + mouseShiftY * star.layer - scrollShiftY * star.layer) % height;
        if (drawY < 0) drawY += height;

        // Twinkle effect (sine wave modulation of opacity)
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        // Map sine wave from [-1, 1] to [0.35, 1] to prevent complete blackout of stars
        const opacityMod = 0.35 + (twinkle + 1) * 0.325;
        const currentOpacity = star.baseOpacity * opacityMod;

        // Draw star core
        ctx.fillStyle = `${star.color}${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle halo glow for large/close stars
        if (star.layer === 3 && star.baseOpacity > 0.6) {
          ctx.fillStyle = `${star.color}${currentOpacity * 0.15})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Manage and Render Shooting Stars
      // Spawn shooting stars randomly
      if (Math.random() < 0.0008 && shootingStars.length < 2) {
        const startX = Math.random() * width;
        const startY = Math.random() * (height * 0.5);
        const angle = Math.PI / 6 + Math.random() * (Math.PI / 12); // Diagonal sweep
        const speed = 12 + Math.random() * 15;
        shootingStars.push({
          x: startX,
          y: startY,
          length: 80 + Math.random() * 120,
          speed,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          width: 1.2 + Math.random() * 1.5,
          opacity: 0.8 + Math.random() * 0.2,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.015,
        });
      }

      // Update and draw shooting stars
      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life -= ss.decay;
        ss.opacity = ss.life;

        if (ss.life <= 0) return false;

        // Draw trail gradient
        const endX = ss.x - (ss.dx / ss.speed) * ss.length;
        const endY = ss.y - (ss.dy / ss.speed) * ss.length;

        const trailGrad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
        trailGrad.addColorStop(0, `rgba(255, 245, 220, ${ss.opacity})`); // Goldish-white tip
        trailGrad.addColorStop(0.1, `rgba(179, 146, 85, ${ss.opacity * 0.6})`); // Warm gold body
        trailGrad.addColorStop(1, "rgba(8, 2, 10, 0)"); // Fades into space

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        return true;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
