import { useState } from "react";
import { ArrowUpRight, Brain, Zap, Search, Target, RefreshCw, Sparkles, icons } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import redditlens from "../../assets/products/redditlens.png"
import deepfocus from "../../assets/products/deepfocus.png"
import maxdrive from "../../assets/products/maxdrive.png"

const products = [
  {
    id: 1,
    name: "RedditLens",
    tagline: "Reddit intelligence & trend platform",
    description:
      "AI-powered Reddit analytics platform that helps you discover market trends, user pain points, startup ideas, and business opportunities in real time.",
    categories: ["saas", "analytics"],
    tags: ["Research", "AI insights", "Trend tracking"],
    icon: redditlens,
    link: "https://redditlens.cc",
  },
  {
    id: 2,
    name: "Deep Focus",
    tagline: "Focus & deep work productivity app",
    description:
      "A distraction-free productivity app designed for deep work, intelligent planning, and performance tracking with gamified focus sessions.",
    categories: ["app", "productivity"],
    tags: ["Focus", "Pomodoro", "Planning"],
    icon: deepfocus,
    link: "/deep-focus",
  },
  {
    id: 3,
    name: "MaxDrive",
    tagline: "Unified cloud storage manager",
    description:
      "A multi-account Google Drive manager that unifies all storage in one dashboard with smart upload, encryption, and file intelligence features.",
    categories: ["app", "storage"],
    tags: ["Cloud", "Security", "Sync"],
    icon: maxdrive,
    link: "https://www.maxdrive.site",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS" },
  { key: "app", label: "Mobile Apps" },
 
];

export default function ProductsSection() {
  const [active, setActive] = useState("all");

  const visible = products.filter(
      (p) => active === "all" || p.categories.includes(active)
  );

  return (
    <section className="relative w-full overflow-hidden py-12">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header - No Description */}
        <div className="flex flex-col items-center text-center -mb-4">
        <SectionHeading
          badge="SANZOX Ecosystem"
          title={<>Intelligent products built for<span className="gradient-text"> modern digital</span> workflows.</>}
        />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActive(filter.key)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300
                ${
                  active === filter.key
                    ? "bg-white/[0.08] border-white/15 text-white"
                    : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-white/5
                  bg-gradient-to-b from-white/[0.02] to-transparent
                  backdrop-blur-sm
                  p-7
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-white/20
                  hover:bg-white/[0.04]
                  hover:shadow-2xl hover:shadow-black/30
                "
              >
                {/* Modern gradient border effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/[0.04] to-white/0" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-white/50 to-transparent group-hover:w-full transition-all duration-700 ease-out" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with subtle animation */}
                  <div className="mb-8 transition-transform duration-300 group-hover:scale-105 origin-left">
                    <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center shadow-lg shadow-black/20 backdrop-blur-sm">
                      <img src={product.icon} alt="" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="mb-5">
                      <h3
                        className="text-white text-2xl font-semibold tracking-tight mb-2 group-hover:text-neutral-300 transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-neutral-400 text-xs uppercase tracking-[0.2em] font-medium">
                        {product.tagline}
                      </p>
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-4">
                      {product.description}
                    </p>

                    {/* Tags with refined styling */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            text-[11px] font-medium
                            px-3 py-1
                            rounded-full
                            border border-white/10
                            bg-white/[0.03]
                            text-neutral-300
                            backdrop-blur-sm
                            transition-all duration-200
                            group-hover:border-white/20
                            group-hover:bg-white/[0.06]
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA with refined animation */}
                    <div className="mt-auto pt-5 border-t border-white/5 transition-all duration-300 group-hover:border-white/10">
                      <a
                        href={product.link}
                        className="
                          inline-flex items-center gap-2
                          text-sm font-medium
                          text-zinc-400
                          transition-all duration-300
                          group-hover:text-white
                        "
                      >
                        Explore Product
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
     <div className="max-w-2xl mx-auto pt-10">
       <a href="/products"  className="w-1/3 md:w-1/4 mx-auto flex justify-center items-center border py-3 md:py-3.5 px-2 md:px-6 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95 text-sm"
          style={{
                    background: 'var(--gradient-primary)',
                    color: 'hsl(var(--primary-foreground))',
                    boxShadow: 'var(--glow-primary)',
                    willChange: 'transform',
                  }}
                  >Explore More</a>
     </div>
    </section>
  );
}