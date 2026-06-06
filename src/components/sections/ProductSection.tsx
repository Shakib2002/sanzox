import { useState } from "react";
import { ArrowUpRight, Brain, Zap, Search, Target, RefreshCw, Sparkles } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const products = [
  {
    id: 1,
    name: "MentalCouch",
    tagline: "AI wellness & journaling",
    description:
      "AI-powered mental wellness platform with mood tracking, intelligent coaching, and productivity insights for modern minds.",
    categories: ["saas"],
    tags: ["Wellness", "AI coaching", "Journaling"],
    icon: Brain,
    link: "#",
  },
  {
    id: 2,
    name: "Rechly",
    tagline: "AI outreach automation",
    description:
      "Cold email automation and lead generation platform with intelligent follow-up systems and smart workflow management.",
    categories: ["saas", "automation"],
    tags: ["Lead gen", "Automation", "Outreach"],
    icon: Zap,
    link: "#",
  },
  {
    id: 3,
    name: "Reditlens",
    tagline: "Reddit intelligence platform",
    description:
      "Discover pain points, startup ideas, and market opportunities through AI-powered Reddit analysis and trend tracking.",
    categories: ["saas"],
    tags: ["Research", "AI insights", "Trends"],
    icon: Search,
    link: "#",
  },
  {
    id: 4,
    name: "Deepwork",
    tagline: "Focus & productivity app",
    description:
      "Productivity platform designed for deep focus, intelligent planning, and distraction-free work sessions.",
    categories: ["app"],
    tags: ["Focus", "Pomodoro", "Planning"],
    icon: Target,
    link: "#",
  },
  {
    id: 5,
    name: "Flowcore",
    tagline: "Workflow automation engine",
    description:
      "Build intelligent workflows, automate repetitive operations, and connect business systems with AI actions.",
    categories: ["automation"],
    tags: ["Workflow", "Integrations", "AI actions"],
    icon: RefreshCw,
    link: "#",
  },
  {
    id: 6,
    name: "Novafolio",
    tagline: "Personal brand platform",
    description:
      "Minimal personal branding and portfolio platform for creators, developers, and modern digital professionals.",
    categories: ["personal"],
    tags: ["Portfolio", "Branding", "Creator"],
    icon: Sparkles,
    link: "#",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS" },
  { key: "app", label: "Apps" },
  { key: "automation", label: "Automation" },
  { key: "personal", label: "Personal" },
];

export default function ProductsSection() {
  const [active, setActive] = useState("all");

  const visible = products.filter(
      (p) => active === "all" || p.categories.includes(active)
  );

  return (
    <section className="relative w-full overflow-hidden py-12 px-4">
      <div className="relative z-10 max-w-7xl mx-auto">
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
                    ? "bg-blue-500/10 border-blue-500/20 text-white"
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
                  hover:border-blue-500/30
                  hover:bg-white/[0.04]
                  hover:shadow-2xl hover:shadow-blue-500/5
                "
              >
                {/* Modern gradient border effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-transparent group-hover:w-full transition-all duration-700 ease-out" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with subtle animation */}
                  <div className="mb-8 transition-transform duration-300 group-hover:scale-105 origin-left">
                    <div className="w-14 h-14 rounded-2xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shadow-lg shadow-blue-500/5 backdrop-blur-sm">
                      <Icon size={28} className="text-blue-400" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="mb-5">
                      <h3
                        className="text-white text-2xl font-semibold tracking-tight mb-2 group-hover:text-blue-100 transition-colors"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {product.name}
                      </h3>

                      <p className="text-blue-400/80 text-xs uppercase tracking-[0.2em] font-medium">
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
                            border border-blue-500/15
                            bg-blue-500/5
                            text-blue-300/90
                            backdrop-blur-sm
                            transition-all duration-200
                            group-hover:border-blue-500/30
                            group-hover:bg-blue-500/10
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
                          group-hover:text-blue-400
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
    </section>
  );
}