import React, { useState, useRef } from "react";
import {
  ChevronRight,
  Star,
  Award,
  Play,
  X,
  Plus,
  Send,
  CheckCircle,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  Mail,
  PhoneCall,
  Menu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import GalaxyBackground from "../components/GalaxyBackground";

import {
  BRAND_CONFIG,
  GOOGLE_FORM_LINKS,
  IMAGES,
  stats,
  masteryPrograms,
  courses,
  features,
  testimonials,
  krishnaPerspective
} from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let isVisible = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const shouldBeVisible = !scrollingDown || currentScrollY < 100;

      if (shouldBeVisible !== isVisible) {
        isVisible = shouldBeVisible;
        setIsNavbarVisible(shouldBeVisible);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper to open Google Form external links in a new tab
  const openForm = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = () => {
    const whatsappPhone = BRAND_CONFIG.phone.replace(/\D/g, "");
    const whatsappText = encodeURIComponent(
      "Hello Rekha Ji, I came across the book *Awaken Heal Relate* and I would like to know more about it.",
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${whatsappText}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useGSAP(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis frame updates with GSAP's ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Disable lag smoothing to align frame rendering
    gsap.ticker.lagSmoothing(0);

    // Cohesive entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".animate-header",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(".animate-nav-logo",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(".animate-nav-link",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
        "-=0.3"
      )
      .fromTo(".animate-nav-button",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4 },
        "-=0.3"
      )
      .fromTo(".animate-hero-badge",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(".animate-hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".animate-hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".animate-hero-cta",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".animate-hero-stats",
        { y: 25, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".animate-hero-preview",
        { scale: 0.95, rotationY: 8, opacity: 0 },
        { scale: 1, rotationY: 0, opacity: 1, duration: 1 },
        "-=0.9"
      );

    // ScrollTrigger animations
    // About Section reveal
    gsap.fromTo(".animate-about-title",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-about-text",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-about-card",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    gsap.fromTo(".animate-about-image",
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Mastery Programs section
    gsap.fromTo(".animate-programs-title",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#programs",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-program-card",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#programs",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Courses section
    gsap.fromTo(".animate-courses-title",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#courses",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-course-card",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#courses",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Why Choose Us features
    gsap.fromTo(".animate-why-title",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#why-us",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-why-card",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#why-us",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Testimonials
    gsap.fromTo(".animate-testimonials-title",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".animate-testimonial-card",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // CTA Section
    gsap.fromTo(".animate-cta-box",
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#cta",
          start: "top 85%",
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Cleanup Lenis and ticker updates
    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#08020a] text-amber-50 selection:bg-[#B39255]/25 selection:text-amber-200 font-sans relative overflow-hidden"
    >
      <GalaxyBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-4 md:px-8 md:py-6">

        {/* NAVIGATION BAR */}
        <div className={`sticky top-4 z-40 transition-all duration-500 ease-in-out ${isNavbarVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0 pointer-events-none"}`}>
          <header className="mb-8 rounded-[1.5rem] cosmic-glass px-6 py-4 shadow-2xl flex items-center justify-between animate-header text-amber-50">
            <div className="flex items-center gap-3 cursor-pointer group animate-nav-logo">
              <img src={IMAGES.logo} alt="Rekha Choudhary Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter brightness-110" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#about" className="text-amber-100/75 hover:text-[#B39255] hover:scale-[1.02] transition-all duration-200 animate-nav-link">About</a>
              <a href="#programs" className="text-amber-100/75 hover:text-[#B39255] hover:scale-[1.02] transition-all duration-200 animate-nav-link">Pillars</a>
              <a href="#courses" className="text-amber-100/75 hover:text-[#B39255] hover:scale-[1.02] transition-all duration-200 animate-nav-link">Programs</a>
              <a href="#why-us" className="text-amber-100/75 hover:text-[#B39255] hover:scale-[1.02] transition-all duration-200 animate-nav-link">Expertise</a>
              <a href="#testimonials" className="text-amber-100/75 hover:text-[#B39255] hover:scale-[1.02] transition-all duration-200 animate-nav-link">Reviews</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => openForm(GOOGLE_FORM_LINKS.demo)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-amber-100/80 border border-amber-500/30 hover:border-[#B39255] hover:bg-[#B39255]/10 hover:text-amber-50 transition-all duration-300 animate-nav-button"
              >
                Book Session
              </button>
              <button
                onClick={() => openForm(GOOGLE_FORM_LINKS.enroll)}
                className="px-5 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950 shadow-md hover:shadow-[0_0_15px_rgba(179,146,85,0.3)] hover:scale-[1.03] transition-all duration-300 animate-nav-button glow-gold"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-amber-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </header>
        </div>

        {/* MOBILE MENU SHEET */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
            <div className="w-[280px] h-full bg-[#0d0714]/95 border-l border-amber-500/20 p-6 flex flex-col shadow-2xl text-amber-50">
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg text-amber-100">Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-amber-200/80"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-5 text-base font-medium mb-auto">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-100/80 hover:text-[#B39255] transition-colors"
                >
                  About Rekha
                </a>
                <a
                  href="#programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-100/80 hover:text-[#B39255] transition-colors"
                >
                  The Three Pillars
                </a>
                <a
                  href="#courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-100/80 hover:text-[#B39255] transition-colors"
                >
                  Mastery Programs
                </a>
                <a
                  href="#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-100/80 hover:text-[#B39255] transition-colors"
                >
                  Expertise & Benefits
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-100/80 hover:text-[#B39255] transition-colors"
                >
                  Client Reviews
                </a>
              </nav>
              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-amber-500/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openForm(GOOGLE_FORM_LINKS.demo);
                  }}
                  className="w-full py-3 rounded-full text-sm font-semibold border border-amber-500/20 text-amber-100 hover:bg-amber-500/10"
                >
                  Book Session
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openForm(GOOGLE_FORM_LINKS.enroll);
                  }}
                  className="w-full py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative overflow-hidden rounded-[2.5rem] border border-amber-500/10 p-6 md:p-14 text-amber-50 shadow-2xl mb-12"
          style={{
            background: `radial-gradient(circle at 80% 80%, rgba(179, 146, 85, 0.15) 0%, rgba(13, 7, 18, 0.8) 100%)`,
          }}
        >
          {/* Subtle background glows */}
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#B39255]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-[#8A1C30]/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-amber-300 font-bold animate-hero-badge shadow-[0_0_15px_rgba(179,146,85,0.1)]">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Author • Coach • Hypnotherapist
              </div>
              <h1 className="max-w-2xl text-gold-gradient text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl animate-hero-title font-serif">
                Return to Yourself
              </h1>
              <p className="mt-6 max-w-xl text-sm md:text-lg leading-relaxed text-amber-100/90 animate-hero-desc italic">
                "Return to yourself. This core philosophy serves as an invitation to reconnect with the parts of yourself that were never meant to be silenced."
              </p>
              <p className="mt-4 max-w-xl text-xs md:text-sm leading-relaxed text-amber-200/60 animate-hero-desc">
                Move from emotional confusion to conscious living through structured spiritual and mental practices. Discover guided pranayama, deep desire discovery, and emotional stability.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 animate-hero-cta">
                <button
                  onClick={() => openForm(GOOGLE_FORM_LINKS.enroll)}
                  className="rounded-full bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] px-8 py-4 font-black text-slate-950 shadow-[0_10px_30px_rgba(179,146,85,0.25)] hover:scale-105 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(179,146,85,0.45)] glow-gold glow-gold-hover"
                >
                  Start Journey
                </button>
                <button
                  onClick={() => openForm(GOOGLE_FORM_LINKS.demo)}
                  className="rounded-full border border-amber-500/30 bg-[#0d0714]/60 px-8 py-4 font-semibold text-amber-100 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 shadow-lg"
                >
                  Book Consultation
                </button>
              </div>

              {/* Stats sub-grid */}
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label} className="cosmic-glass p-5 rounded-2xl flex items-start gap-4 animate-hero-stats border border-amber-950/20 shadow-lg">
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-300">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#B39255] tracking-tight text-gold-gradient">{s.value}</div>
                      <div className="mt-0.5 text-xs text-amber-100/70 font-medium">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 animate-hero-preview">
              <div className="relative rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-4 shadow-2xl backdrop-blur-md overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10" />
                <img
                  src={IMAGES.heroPreview}
                  alt="Rekha Choudhary Portrait"
                  className="w-full h-[400px] object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                />

                {/* Embedded Play Button Overlay mimicking an intro tour */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <a
                    href="#courses"
                    className="h-16 w-16 bg-gradient-to-r from-[#DFD3BD] to-[#B39255] rounded-full flex items-center justify-center shadow-2xl text-slate-800 transition-all duration-300 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Introductory Message",
                        description: "Loading guided message... Explore our signature mastery programs below!",
                      });
                      document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </a>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFD3BD] font-bold">Guided Overview</span>
                  <h3 className="text-lg font-bold text-white mt-1">Meet Rekha Choudhary</h3>
                  <p className="text-xs text-white/75 mt-1">Listen to her core philosophy on returning to yourself</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: ABOUT */}
        <section
          id="about"
          className="mt-12 rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-6 md:p-12 shadow-2xl text-amber-50 relative scroll-mt-24"
        >
          {/* Section label */}
          <div className="mb-10 animate-about-title">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-tight font-serif">Meet Rekha Choudhary</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B39255] to-transparent mt-4 rounded-full" />
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="animate-about-text">
                <h3 className="text-2xl font-bold text-amber-300 font-serif">Author of "Awaken • Heal • Relate"</h3>
                <p className="mt-3 leading-relaxed text-amber-100/80 text-sm md:text-base">
                  Her foundational book provides a gentle path to inner clarity and serves as the basis for her global coaching methodology. Rekha is a guide who helps individuals navigate emotional challenges and align with their higher purpose.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="cosmic-glass p-6 rounded-2xl border-l-4 border-l-[#18B2D1] hover:bg-[#18B2D1]/5 transition-all duration-300 animate-about-card">
                  <div className="mb-2 text-base font-bold text-amber-100 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#18B2D1]" /> Structured Practices
                  </div>
                  <p className="text-xs leading-relaxed text-amber-200/70">
                    Utilizing guided Pranayama breathwork, mindfulness meditation, and energetic alignment to resolve inner conflicts and calm mental noise.
                  </p>
                </div>

                <div className="cosmic-glass p-6 rounded-2xl border-l-4 border-l-[#B39255] hover:bg-[#B39255]/5 transition-all duration-300 animate-about-card">
                  <div className="mb-2 text-base font-bold text-amber-100 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#B39255]" /> Spiritual Alignment
                  </div>
                  <p className="text-xs leading-relaxed text-amber-200/70">
                    Integrating hypnotherapy clearing, the Law of Attraction, and intentional visualization into structured pathways for conscious daily living.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-about-image">
              <div className="rounded-[2rem] border border-amber-500/15 p-2 bg-gradient-to-b from-amber-500/10 to-transparent">
                <img
                  src={IMAGES.aboutUs}
                  alt="Awaken Heal Relate Book"
                  className="w-full h-[320px] object-cover rounded-[1.75rem] shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: SIGNATURE MASTERY */}
        <section
          id="programs"
          className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-6 md:p-12 text-amber-50 shadow-2xl scroll-mt-24"
          style={{
            background: `radial-gradient(circle at 10% 10%, rgba(24, 178, 209, 0.15) 0%, rgba(13, 7, 18, 0.8) 100%)`,
          }}
        >
          {/* Section label */}
          <div className="mb-10 animate-programs-title">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-tight font-serif">The Three Pillars</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B39255] to-transparent mt-4 rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {masteryPrograms.map((item, idx) => {
              const darkPillarStyles = [
                {
                  colorStyle: "from-[#18B2D1]/10 to-slate-950/40 border-[#18B2D1]/20 hover:border-[#18B2D1]/50 text-[#18B2D1]",
                  iconBg: "bg-[#18B2D1]/10",
                  badgeBg: "bg-[#18B2D1]/15 text-[#18B2D1] border-[#18B2D1]/20"
                },
                {
                  colorStyle: "from-[#D95438]/10 to-slate-950/40 border-[#D95438]/20 hover:border-[#D95438]/50 text-[#D95438]",
                  iconBg: "bg-[#D95438]/10",
                  badgeBg: "bg-[#D95438]/15 text-[#D95438] border-[#D95438]/20"
                },
                {
                  colorStyle: "from-[#B39255]/10 to-slate-950/40 border-[#B39255]/20 hover:border-[#B39255]/50 text-[#B39255]",
                  iconBg: "bg-[#B39255]/10",
                  badgeBg: "bg-[#B39255]/15 text-[#B39255] border-[#B39255]/20"
                }
              ];
              const style = darkPillarStyles[idx] || darkPillarStyles[2];
              return (
                <div
                  key={item.title}
                  className={`group rounded-[2rem] border bg-gradient-to-br ${style.colorStyle} p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(179,146,85,0.1)] flex flex-col justify-between animate-program-card`}
                >
                  <div>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg} shadow-inner text-current group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <span className={`text-[10px] ${style.badgeBg} border px-2.5 py-1 rounded-full font-bold uppercase tracking-wider block w-fit mb-3`}>
                      {item.highlight}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-amber-50 mb-3 font-serif">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-amber-100/70">{item.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-200/40">
                    <span>Methodology Module</span>
                    <ChevronRight className="h-4 w-4 text-current opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 04: COURSES */}
        <section
          id="courses"
          className="mt-12 rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-6 md:p-12 shadow-2xl text-amber-50 scroll-mt-24"
        >
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-courses-title">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-tight font-serif">Signature Mastery Programs</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B39255] to-transparent mt-4 rounded-full" />
            </div>
            <p className="text-sm text-amber-100/70 max-w-md sm:text-right">
              Transformative journeys designed to help you reconnect with yourself, find emotional stability, and live with clarity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.title}
                className="group rounded-[2rem] border border-amber-500/10 bg-[#0d0714]/40 overflow-hidden hover:border-[#B39255]/40 hover:bg-[#0d0714]/70 transition-all duration-300 flex flex-col h-full shadow-2xl animate-course-card"
              >
                <div className="relative overflow-hidden h-48 bg-slate-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-[#0d0714]/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/20 flex items-center gap-1 shadow-md">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-amber-100 group-hover:text-[#B39255] transition-colors font-serif">{course.title}</h3>
                    <p className="mt-2.5 text-xs text-amber-200/60 leading-relaxed min-h-[40px]">{course.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-xs font-bold text-[#B39255] hover:text-amber-300 flex items-center gap-1 transition-colors duration-200"
                    >
                      View Details <ChevronRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => openForm(GOOGLE_FORM_LINKS.enroll)}
                      className="rounded-full bg-[#B39255]/10 hover:bg-[#B39255]/20 text-amber-100 px-4 py-2 text-xs font-bold border border-[#B39255]/30 transition-all duration-200"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Krishna Perspective Banner Callout */}
          <div className="mt-12 group rounded-[2.5rem] border border-amber-500/10 bg-[#B39255]/5 p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-amber-400/40 animate-course-card flex flex-col md:flex-row gap-8 items-center overflow-hidden">
            <div className="md:w-2/3 space-y-4">
              <span className="text-[10px] bg-[#B39255]/10 text-[#B39255] border border-[#B39255]/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
                Specialized Coaching Philosophy
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gold-gradient font-serif leading-tight">
                {krishnaPerspective.title}
              </h3>
              <p className="text-sm leading-relaxed text-amber-100/70">
                {krishnaPerspective.desc}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCourse({
                    title: krishnaPerspective.title,
                    duration: krishnaPerspective.duration,
                    desc: krishnaPerspective.desc,
                    image: krishnaPerspective.image,
                    syllabus: krishnaPerspective.syllabus,
                    target: krishnaPerspective.target,
                    schedule: krishnaPerspective.schedule
                  })}
                  className="text-xs font-bold text-[#B39255] hover:text-amber-300 flex items-center gap-1 transition-colors duration-200"
                >
                  View Philosophy Details <ChevronRight className="h-3 w-3" />
                </button>
                <button
                  onClick={() => openForm(GOOGLE_FORM_LINKS.enroll)}
                  className="rounded-full bg-[#B39255]/10 hover:bg-[#B39255]/20 text-amber-100 border border-[#B39255]/30 px-5 py-2.5 text-xs font-bold transition-all duration-200"
                >
                  Apply for Mentorship
                </button>
              </div>
            </div>
            <div className="md:w-1/3 w-full relative">
              <div className="rounded-[1.75rem] overflow-hidden border border-amber-500/10 shadow-2xl aspect-video md:aspect-square bg-slate-950">
                <img
                  src={krishnaPerspective.image}
                  alt={krishnaPerspective.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* COURSE SYLLABUS SHEET (MODAL DETAILED DRAWER) */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#0e0714] rounded-[2.5rem] border border-amber-500/20 p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-amber-50">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-1.5 hover:bg-white/10 rounded-lg text-amber-200/60 hover:text-amber-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block mb-1">
                Program Blueprint
              </span>
              <h3 className="text-2xl font-black text-amber-100 font-serif text-gold-gradient">{selectedCourse.title}</h3>
              <div className="mt-1 flex items-center gap-4 text-xs text-amber-200/50">
                <span className="flex items-center gap-1 text-amber-300"><Clock className="h-3.5 w-3.5" /> Duration: {selectedCourse.duration}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Schedule: {selectedCourse.schedule}</span>
              </div>

              <div className="h-px bg-white/5 my-5" />

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-200/80 uppercase tracking-wider mb-1">Overview</h4>
                  <p className="text-xs leading-relaxed text-amber-100/70">{selectedCourse.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-200/80 uppercase tracking-wider mb-1">Who is this for</h4>
                  <p className="text-xs leading-relaxed text-amber-100/70">{selectedCourse.target}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-200/80 uppercase tracking-wider mb-2">Curriculum details</h4>
                  <ul className="grid gap-2 text-xs text-amber-100/80">
                    {selectedCourse.syllabus.map((syl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-400" />
                        <span>{syl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 py-3 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-200/80 hover:bg-white/10 hover:text-amber-100 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(null);
                    openForm(GOOGLE_FORM_LINKS.enroll);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950 font-bold rounded-full text-xs transition-transform hover:scale-[1.02] shadow-md"
                >
                  Apply & Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 05: WHY CHOOSE US */}
        <section
          id="why-us"
          className="mt-12 rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-6 md:p-12 shadow-2xl text-amber-50 scroll-mt-24"
        >
          {/* Section label */}
          <div className="mb-10 animate-why-title">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-tight font-serif">Specialized Expertise & Benefits</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B39255] to-transparent mt-4 rounded-full" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={feature.name}
                className="cosmic-glass p-6 rounded-[2rem] border border-amber-500/10 bg-[#0d0714]/40 hover:bg-[#0d0714]/70 hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 animate-why-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-amber-100 font-serif">{feature.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-amber-200/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: TESTIMONIALS */}
        <section
          id="testimonials"
          className="mt-12 rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-6 md:p-12 shadow-2xl text-amber-50 scroll-mt-24"
        >
          {/* Section label */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-testimonials-title">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-gold-gradient tracking-tight font-serif">Client Transformation Stories</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B39255] to-transparent mt-4 rounded-full" />
            </div>

            <button
              onClick={() => openForm(GOOGLE_FORM_LINKS.review)}
              className="rounded-full bg-gradient-to-r from-[#B39255]/10 to-[#8A6D35]/10 border border-amber-500/30 text-amber-200 hover:bg-amber-500/20 px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" /> Leave a Review
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="cosmic-glass p-6 rounded-[2rem] border border-amber-500/10 bg-[#0d0714]/40 hover:bg-[#0d0714]/70 hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-testimonial-card"
              >
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950 flex items-center justify-center font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-amber-100 text-sm">{t.name}</div>
                      <div className="text-[10px] text-amber-200/50 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-100/70 italic">“{t.review}”</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-0.5 text-[#B39255]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < t.rating ? "fill-current text-[#B39255]" : "text-white/10"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-[10px] uppercase tracking-[0.25em] text-amber-200/40">
            Conscious Growth Journey • Join Over 2,500+ Guided Individuals
          </div>
        </section>

        {/* SECTION 07: CTA */}
        <section
          id="cta"
          className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-8 md:p-14 text-amber-50 shadow-2xl animate-cta-box"
        >
          {/* Glowing accent orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#B39255]/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black md:text-4xl text-gold-gradient tracking-tight font-serif">
                Begin Your Journey of Returning to Yourself
              </h2>
              <p className="mt-4 text-xs md:text-sm leading-relaxed text-amber-100/70">
                Ready to move from emotional confusion to conscious, grounded living? Schedule a consultation call with Rekha or register for the 21-Day Morning Sadhana challenge to experience a structured path to inner clarity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={() => openForm(GOOGLE_FORM_LINKS.demo)}
                className="rounded-full border border-amber-500/20 bg-[#0d0714]/60 px-6 py-3.5 text-xs font-semibold text-amber-100 hover:bg-amber-500/10 hover:border-amber-400 transition-all shadow-lg"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => openForm(GOOGLE_FORM_LINKS.enroll)}
                className="rounded-full bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] px-8 py-3.5 text-xs font-black text-slate-950 shadow-[0_10px_30px_rgba(179,146,85,0.25)] hover:scale-105 transition-all duration-300 glow-gold"
              >
                Register for Sadhana
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 rounded-[2.5rem] border border-amber-500/10 cosmic-glass p-8 md:p-12 text-amber-50 shadow-2xl relative overflow-hidden">
          <div className="grid gap-10 md:grid-cols-12 relative z-10">
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={IMAGES.logo} alt="Rekha Choudhary Logo" className="h-12 w-auto object-contain filter brightness-110" />
              </div>
              <p className="text-xs leading-relaxed text-amber-200/60">
                {BRAND_CONFIG.description}
              </p>
              <div className="flex gap-3 text-amber-200">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0714]/40 border border-amber-500/20 hover:border-[#B39255] hover:text-[#B39255] hover:bg-amber-500/5 transition-all">f</a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0714]/40 border border-amber-500/20 hover:border-[#B39255] hover:text-[#B39255] hover:bg-amber-500/5 transition-all">i</a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0714]/40 border border-amber-500/20 hover:border-[#B39255] hover:text-[#B39255] hover:bg-amber-500/5 transition-all">x</a>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="font-bold text-xs uppercase tracking-wider text-amber-300 mb-4">Quick Links</div>
              <ul className="space-y-2.5 text-xs text-amber-100/70">
                <li><a href="#about" className="hover:text-[#B39255] transition-colors">About Rekha</a></li>
                <li><a href="#programs" className="hover:text-[#B39255] transition-colors">The Three Pillars</a></li>
                <li><a href="#courses" className="hover:text-[#B39255] transition-colors">Mastery Programs</a></li>
                <li><a href="#why-us" className="hover:text-[#B39255] transition-colors">Expertise & Benefits</a></li>
                <li><a href="#testimonials" className="hover:text-[#B39255] transition-colors">Client Reviews</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="font-bold text-xs uppercase tracking-wider text-amber-300 mb-4">Contact Desk</div>
              <ul className="space-y-3 text-xs text-amber-100/70">
                <li className="flex items-start gap-2">
                  <PhoneCall className="h-4 w-4 text-[#B39255] shrink-0 mt-0.5" />
                  <span>Phone: {BRAND_CONFIG.phone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-[#B39255] shrink-0 mt-0.5" />
                  <span>Email: {BRAND_CONFIG.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#B39255] shrink-0 mt-0.5" />
                  <span>Address: Mindfulness Center, Mumbai, India</span>
                </li>
              </ul>
            </div>

            {/* QUICK CONTACT */}
            <div className="md:col-span-3 space-y-4">
              <div className="font-bold text-xs uppercase tracking-wider text-amber-300">Connect Directly</div>
              <p className="text-xs leading-relaxed text-amber-200/60">
                Have questions about our programs, personal mentorship, or book orders? Click below to send a message directly to our desk.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full py-3 bg-gradient-to-r from-[#FFEAB5] via-[#B39255] to-[#8A6D35] text-slate-950 font-black rounded-full text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(179,146,85,0.3)] transition-all hover:scale-[1.02] duration-300 glow-gold"
              >
                <Send className="h-4 w-4" /> Contact with Rekha
              </button>
            </div>
          </div>

          <div className="mt-10 border-t border-white/5 pt-5 text-center text-[10px] text-amber-200/40 relative z-10 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
            <span>© 2026 Rekha Choudhary. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#B39255] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B39255] transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
