import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import GalaxyBackground from "../components/GalaxyBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08020a] text-amber-50 selection:bg-[#B39255]/25 selection:text-amber-200 font-sans relative overflow-hidden">
      <GalaxyBackground />
      <div className="relative z-10 text-center cosmic-glass p-8 md:p-12 rounded-[2.5rem] border border-amber-500/10 shadow-2xl max-w-md w-full mx-4 animate-hero-badge">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gold-gradient mb-2 font-serif">404</h1>
        <p className="text-lg md:text-xl text-amber-200/80 mb-4 font-serif italic">Return to Yourself</p>
        <p className="text-xs text-amber-200/50 mb-8">
          The path you seek is currently unavailable. Let's guide you back to safety.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950 font-black shadow-[0_10px_30px_rgba(179,146,85,0.25)] hover:scale-105 transition-all duration-300 glow-gold"
        >
          Return to Sanctuary
        </a>
      </div>
    </div>
  );
};

export default NotFound;
