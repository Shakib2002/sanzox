import { useEffect, useRef, useState } from "react";
import { SpaceParallaxHero } from "@/components/hero/SpaceParallaxHero";
import { BentoStats } from "../hero/BentoStats";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { MagneticButton } from "../ui/MagneticButton";

export default function NewHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center"
      style={{
        background: "hsl(0 0% 3%)",
        isolation: "isolate",
      }}
    >
    
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ transform: "translateZ(0)", zIndex: 0 }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(at 40% 20%, hsl(0 0% 100% / 0.12) 0px, transparent 50%),
              radial-gradient(at 80% 0%, hsl(0 0% 100% / 0.08) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsl(0 0% 100% / 0.06) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsl(0 0% 100% / 0.08) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsl(0 0% 100% / 0.06) 0px, transparent 50%),
              radial-gradient(at 80% 100%, hsl(0 0% 100% / 0.04) 0px, transparent 50%)
            `,
          }}
        />

        {/* Static orb — top left blue */}
        <div
          className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 80%) 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />

        {/* Static orb — top right blue */}
        <div
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 80%) 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />

        {/* Static orb — bottom purple */}
        <div
          className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 70%) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: "translateZ(0)",
          }}
        />

        {/* Static orb — mid cyan */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 75%) 0%, transparent 60%)",
            filter: "blur(50px)",
            transform: "translateZ(0)",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 3%) 100%)",
          }}
        />
      </div>

    
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          zIndex: 1,
        }}
      >
        <SpaceParallaxHero />
      </div>

      {/* ── Content */}
      <div className="max-w-[1400px] relative z-10 flex flex-col items-center text-center gap-6 pt-16 pb-16 px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            background: "hsl(0 0% 100% / 0.06)",
            borderColor: "hsl(0 0% 100% / 0.12)",
            color: "hsl(0 0% 82%)",
            transitionDelay: "0ms",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "hsl(0 0% 82%)", willChange: "transform" }}
          />
          Automate. Scale. Dominate.
        </div>

        {/* Heading */}
        <h1
          className={`heading-xl text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: "120ms",
            fontFamily: "'Space Grotesk', sans-serif",
            color: "hsl(210 40% 98%)",
          }}
        >
          Turning Ideas Into{" "}
          <span
            className="gradient-text shimmer-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(0 0% 96%), hsl(0 0% 68%), hsl(0 0% 96%))",
              backgroundSize: "200% 100%",
            }}
          >
            Scalable
          </span>
          {" "}
          <br className="hidden sm:block" />
          Digital{" "}
          <span
            className="gradient-text shimmer-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(0 0% 68%), hsl(0 0% 96%), hsl(0 0% 68%))",
              backgroundSize: "200% 100%",
            }}
          >
            Products
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-2xl text-lg leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            color: "hsl(215 20% 65%)",
            transitionDelay: "240ms",
          }}
        >
          Empowering businesses with AI-driven software, modern SaaS platforms, and high-performance mobile applications designed to automate processes, increase productivity, and accelerate long-term growth.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "360ms" }}
        >
          <MagneticButton>
            <Link to={'/contact'}>
              <button
                className="btn-glow relative px-8 py-3.5 rounded-full font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "var(--gradient-primary)",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "var(--glow-primary)",
                  willChange: "transform",
                }}
              >
                Get Started →
              </button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link to={'/products'}>
                 <button
                    className="px-8 py-3.5 rounded-full font-semibold text-base tracking-wide border backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: "hsl(0 0% 100% / 0.18)",
                      color: "hsl(0 0% 96%)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "hsl(0 0% 100% / 0.32)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "hsl(0 0% 100% / 0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "hsl(0 0% 100% / 0.18)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    View Projects
                 </button>
            </Link>
          </MagneticButton>
        </div>

        {/* Stats */}
        <motion.div variants={fadeUpVariants}>
          <BentoStats />
        </motion.div>

        {/* YouTube Video Frame */}
        {/* <div
          className={`relative w-full max-w-4xl mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        > */}
          {/* Glow behind frame */}
          {/* <div
            className="absolute -inset-6 rounded-[3rem] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 60%, hsl(0 0% 100% / 0.08), hsl(0 0% 70% / 0.04) 60%, transparent 80%)",
              filter: "blur(32px)",
              transform: "translateZ(0)",
              zIndex: 0,
            }}
          /> */}

          {/* Monitor bezel */}
          {/* <div
            className="relative rounded-[1.5rem]"
            style={{
              background: "hsl(0 0% 100% / 0.06)",
              border: "6px solid hsl(0 0% 100% / 0.2)",
              boxShadow:
                "0 0 0 1px hsl(0 0% 100% / 0.04), 0 30px 80px -10px hsl(0 0% 100% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
              padding: "10px",
              paddingBottom: "22px",
              zIndex: 1,
            }}
          >
            <div
              className="relative rounded-[0.85rem] overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1&color=white"
                title="Product Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setVideoLoaded(true)}
              />
            </div>

            <div className="flex items-center justify-center mt-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "hsl(0 0% 100% / 0.35)",
                  boxShadow: "0 0 8px hsl(0 0% 100% / 0.2)",
                }}
              />
            </div>
          </div> */}

          {/* Floor reflection */}
          {/* <div
            className="pointer-events-none mx-auto mt-1"
            style={{
              width: "70%",
              height: "16px",
              background: "radial-gradient(ellipse, hsl(0 0% 100% / 0.08), transparent 70%)",
              filter: "blur(12px)",
              transform: "translateZ(0)",
            }}
          />
        </div> */}

        {/* Scroll indicator */}
        <div
          className={`flex flex-col items-center gap-2 mt-10 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(215 20% 40%)" }}>
            Explore
          </span>
          <div
            className="w-px h-8 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.35), transparent)",
              willChange: "opacity",
            }}
          />
        </div>
      </div>
    </section>
  );
}