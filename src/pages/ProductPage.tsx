import { useState } from "react";
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';


// ─── Types ───────────────────────────────────────────────────────────────────
type Status = "available" | "coming-soon" | "beta";
type Category = "mobile" | "saas" | "ai-tool";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: Status;
  categories: Category[];
  icon: string;
  accentColor: string;
  glowColor: string;
  link: string;
}

type FilterKey = "all" | "mobile" | "saas" | "ai-tool" | "coming-soon";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "deep-focus",
    name: "Deep Focus",
    tagline: "Deep work. Better focus. Smarter productivity.",
    description:
      "A productivity and deep work app designed to help users stay focused, manage time efficiently, and improve study and work performance.",
    features: [
      "Pomodoro & Flowmodoro Timer",
      "Ivy Lee Daily Planning System",
      "Focus Analytics Dashboard",
      "Cornell Notes System",
      "Gamified XP & Levels",
      "Ambient Sound Mode",
      "Study Room (Real-time session)",
    ],
    status: "available",
    categories: ["mobile"],
    icon: "🎯",
    accentColor: "#3B82F6",
    glowColor: "rgba(59,130,246,0.35)",
    link: "#",
  },
  {
    id: "maxdrive",
    name: "MaxDrive",
    tagline: "One unified cloud for all your Google Drives.",
    description:
      "A multi-account Google Drive manager that consolidates all storage into one dashboard with AI-powered file management.",
    features: [
      "Multi Google Drive Integration",
      "Smart Upload Distribution",
      "Encrypted Vault (AES-256)",
      "AI File Tagging System",
      "Photo Auto Backup",
      "Background Sync Engine",
      "Storage Analytics & Cleaner",
    ],
    status: "available",
    categories: ["mobile"],
    icon: "☁️",
    accentColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.35)",
    link: "/maxdrive"
  },
  {
    id: "redditlens",
    name: "RedditLens",
    tagline: "Discover trends before they go viral.",
    description:
      "A SaaS intelligence platform that tracks Reddit discussions to surface market trends, user pain points, and business opportunities.",
    features: [
      "Reddit Trend Tracking Engine",
      "Keyword Monitoring System",
      "Community Insight Dashboard",
      "Opportunity Detection AI",
      "Topic Heat Maps",
      "Export Reports (PDF/CSV)",
      "Real-time Alerts System",
    ],
    status: "available",
    categories: ["saas", "ai-tool"],
    icon: "🔭",
    accentColor: "#A855F7",
    glowColor: "rgba(168,85,247,0.35)",
    link: "https://redditlens.cc"
  },
];

// const COMING_SOON: { name: string; icon: string; desc: string }[] = [
//   {
//     name: "AI Writing Assistant",
//     icon: "✍️",
//     desc: "Context-aware writing with long-form memory and tone adaption.",
//   },
//   {
//     name: "TaskFlow Planner",
//     icon: "📋",
//     desc: "Project management reimagined with AI prioritization.",
//   },
//   {
//     name: "Smart CRM",
//     icon: "🤝",
//     desc: "Relationship intelligence for modern sales teams.",
//   },
// ];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "saas", label: "SaaS Platforms" },
  
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function categoryLabel(c: Category): string {
  return c === "mobile" ? "Mobile App" : c === "saas" ? "SaaS" : "AI Tool";
}

function matchesFilter(product: Product, filter: FilterKey): boolean {
  if (filter === "all") return true;
  if (filter === "coming-soon") return product.status === "coming-soon";
  return product.categories.includes(filter as Category);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  if (status === "available")
    return (
      <span style={styles.badgeAvailable}>
        <span style={styles.dot} />
        Available
      </span>
    );
  if (status === "beta")
    return <span style={styles.badgeBeta}>Beta</span>;
  return <span style={styles.badgeSoon}>Coming Soon</span>;
}

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      style={{
        ...styles.catBadge,
        background:
          category === "mobile"
            ? "rgba(59,130,246,0.15)"
            : category === "saas"
            ? "rgba(168,85,247,0.15)"
            : "rgba(34,197,94,0.15)",
        color:
          category === "mobile"
            ? "#93C5FD"
            : category === "saas"
            ? "#D8B4FE"
            : "#86EFAC",
      }}
    >
      {categoryLabel(category)}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? `0 0 0 1px hsl(217 91% 60% / 0.5), 0 20px 60px hsl(217 91% 60% / 0.15)`
          : "0 0 0 1px hsl(217 91% 60% / 0.15), 0 4px 24px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        style={{
          ...styles.iconWrap,
          background: `radial-gradient(circle at 30% 30%, ${product.accentColor}33, transparent 70%)`,
          border: `1px solid ${product.accentColor}44`,
        }}
      >
        <span style={{ fontSize: 28 }}>{product.icon}</span>
      </div>

      {/* Header row */}
      <div style={styles.cardHeader}>
        <div>
          <h3 style={styles.productName}>{product.name}</h3>
          <div style={styles.badgeRow}>
            {product.categories.map((c) => (
              <CategoryBadge key={c} category={c} />
            ))}
          </div>
        </div>
        <StatusBadge status={product.status} />
      </div>

      {/* Tagline */}
      <p style={{ ...styles.tagline, color: "hsl(217 91% 70%)" }}>
        {product.tagline}
      </p>

      {/* Description */}
      <p style={styles.description}>{product.description}</p>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Features */}
      <ul style={styles.featureList}>
        {product.features.slice(0, 5).map((f) => (
          <li key={f} style={styles.featureItem}>
            <span style={{ ...styles.featureDot, background: "hsl(217 91% 60%)" }} />
            {f}
          </li>
        ))}
        {product.features.length > 5 && (
          <li style={{ ...styles.featureItem, opacity: 0.45 }}>
            <span style={{ ...styles.featureDot, background: "hsl(217 91% 60% / 0.5)" }} />+{" "}
            {product.features.length - 5} more
          </li>
        )}
      </ul>

      {/* CTA */}
      <a
        href={product.link}
        style={{
          ...styles.ctaButton,
          background: hovered
            ? "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))"
            : "transparent",
          border: `1px solid ${hovered ? "hsl(217 91% 60%)" : "hsl(217 91% 60% / 0.3)"}`,
          color: hovered ? "#fff" : "hsl(210 40% 98%)",
          boxShadow: hovered ? "0 0 20px hsl(217 91% 60% / 0.4)" : "none",
        }}
      >
        View Product →
      </a>
    </div>
  );
}

function ComingSoonCard({
  item,
}: {
  item: { name: string; icon: string; desc: string };
}) {
  return (
    <div style={styles.soonCard}>
      <span style={styles.soonIcon}>{item.icon}</span>
      <p style={styles.soonName}>{item.name}</p>
      <p style={styles.soonDesc}>{item.desc}</p>
      <span style={styles.badgeSoon}>Coming Soon</span>
    </div>
  );
}


export default function ProductPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "coming-soon"
      ? []
      : PRODUCTS.filter((p) => matchesFilter(p, activeFilter));

  const showComingSoon =
    activeFilter === "all" || activeFilter === "coming-soon";

  return (
    <Layout title="Products | SANZOX">
      <div style={styles.page}>
        {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroGlow1} />
        <div style={styles.heroGlow2} />

        <div style={styles.heroInner}>
          <div style={styles.eyebrow}>AI Software Studio</div>
          <h1 style={styles.heroTitle}>
            Software products
            <br />
            built by{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 60%), hsl(217 91% 60%))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SANZOX
            </span>
          </h1>
          <p style={styles.heroSub}>
            We design and build AI-powered apps, SaaS platforms, and digital
            tools that solve real-world problems in productivity, storage, and
            intelligence.
          </p>

      

          {/* CTAs */}
          <div style={styles.ctaRow}>
            <a href="#products" style={styles.ctaPrimary}>
              Explore Products
            </a>
            <a href="/contact" style={styles.ctaSecondary}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section id="products" style={styles.filterSection}>
        <div style={styles.filterBar}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              style={{
                ...styles.filterPill,
                ...(activeFilter === f.key ? styles.filterPillActive : {}),
              }}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      {filtered.length > 0 && (
        <section style={styles.gridSection}>
          <div style={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      

      {/* ── CTA  */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.08), hsl(280 70% 55% / 0.08))',
              border: '1px solid hsl(217 91% 60% / 0.2)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(217 91% 60% / 0.12), transparent)',
              }}
            />
            <div className="relative z-10">
              <h2 className="heading-lg mb-4 text-3xl md:text-5xl font-bold text-white">Want to build a custom project?</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                If you have a unique idea and want to build a custom software solution, get in touch with our team today.
              </p>
              <Button
                size="lg"
                asChild
                className="btn-glow px-8 py-4 rounded-xl font-semibold text-base transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                  color: 'hsl(222 47% 6%)',
                  boxShadow: '0 0 30px hsl(217 91% 60% / 0.3)',
                }}
              >
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </Layout>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "relative",
    width: "100%",
    paddingTop: "60px", 
  },

  // Hero
  hero: {
    position: "relative",
    padding: "10px 24px 80px",
    textAlign: "center",
    overflow: "hidden",
    zIndex: 1,
  },
  heroGlow1: {
    position: "absolute",
    top: -80,
    left: "50%",
    transform: "translateX(-80%)",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroGlow2: {
    position: "absolute",
    top: -40,
    right: "10%",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroInner: {
    position: "relative",
    maxWidth: 760,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "hsl(217 91% 70%)",
    background: "hsl(217 91% 60% / 0.1)",
    border: "1px solid hsl(217 91% 60% / 0.2)",
    padding: "6px 16px",
    borderRadius: 100,
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: "clamp(32px, 6vw, 66px)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: "#F9FAFB",
    margin: "0 0 24px",
  },
  heroSub: {
    fontSize: "clamp(16px, 2vw, 19px)",
    lineHeight: 1.65,
    color: "#9CA3AF",
    maxWidth: 580,
    margin: "0 auto 48px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 48,
    marginBottom: 48,
    flexWrap: "wrap" as const,
  },
  statItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 4,
  },
  statVal: {
    fontSize: 28,
    fontWeight: 800,
    color: "#F9FAFB",
    letterSpacing: "-0.02em",
  },
  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: 500,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "13px 28px",
    borderRadius: 10,
    background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
    color: "hsl(222 47% 6%)",
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
    letterSpacing: "-0.01em",
    boxShadow: "0 0 30px hsl(217 91% 60% / 0.4)",
    transition: "transform 0.3s, opacity 0.2s",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "13px 28px",
    borderRadius: 10,
    background: "transparent",
    border: "1px solid hsl(217 91% 60% / 0.3)",
    color: "hsl(210 40% 98%)",
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
  },

  // Filter
  filterSection: {
    position: "relative",
    zIndex: 1,
    padding: "0 24px 48px",
    display: "flex",
    justifyContent: "center",
  },
  filterBar: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
    justifyContent: "center",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 100,
    padding: "6px 8px",
  },
  filterPill: {
    padding: "8px 20px",
    borderRadius: 100,
    border: "none",
    background: "transparent",
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  filterPillActive: {
    background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
    color: "hsl(222 47% 6%)",
    boxShadow: "0 0 20px hsl(217 91% 60% / 0.4)",
  },

  // Grid
  gridSection: {
    position: "relative",
    zIndex: 1,
    padding: "0 24px 80px",
    maxWidth: 1280,
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 24,
  },

  // Card
  card: {
    background: "hsl(222 47% 11% / 0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: 20,
    padding: 28,
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexShrink: 0,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  productName: {
    fontSize: 20,
    fontWeight: 700,
    color: "#F9FAFB",
    margin: "0 0 8px",
    letterSpacing: "-0.02em",
  },
  badgeRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap" as const,
  },
  catBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 100,
    letterSpacing: "0.05em",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
    letterSpacing: "-0.01em",
  },
  description: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#9CA3AF",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    marginBottom: 18,
  },
  featureList: {
    listStyle: "none",
    margin: "0 0 24px",
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    flexGrow: 1,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    color: "#D1D5DB",
    fontWeight: 450,
  },
  featureDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    flexShrink: 0,
  },
  ctaButton: {
    display: "block",
    textAlign: "center" as const,
    padding: "11px 0",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.25s",
    marginTop: "auto",
  },

  // Badges
  badgeAvailable: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    color: "#4ADE80",
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.25)",
    padding: "4px 10px",
    borderRadius: 100,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#4ADE80",
    display: "inline-block",
    boxShadow: "0 0 6px #4ADE80",
  },
  badgeBeta: {
    fontSize: 11,
    fontWeight: 600,
    color: "#FCD34D",
    background: "rgba(252,211,77,0.12)",
    border: "1px solid rgba(252,211,77,0.25)",
    padding: "4px 10px",
    borderRadius: 100,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  badgeSoon: {
    fontSize: 11,
    fontWeight: 600,
    color: "#A78BFA",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.25)",
    padding: "4px 10px",
    borderRadius: 100,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
    display: "inline-block",
  },

  // Coming soon section
  soonSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px 100px",
  },
  soonHeader: {
    textAlign: "center" as const,
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: "clamp(26px,4vw,40px)",
    fontWeight: 800,
    color: "#F9FAFB",
    letterSpacing: "-0.03em",
    margin: "0 0 14px",
  },
  sectionSub: {
    fontSize: 16,
    color: "#6B7280",
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  soonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  soonCard: {
    background: "hsl(222 47% 11% / 0.3)",
    border: "1px dashed hsl(217 91% 60% / 0.2)",
    borderRadius: 20,
    padding: 28,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: 10,
  },
  soonIcon: {
    fontSize: 30,
    marginBottom: 4,
  },
  soonName: {
    fontSize: 17,
    fontWeight: 700,
    color: "#D1D5DB",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  soonDesc: {
    fontSize: 13,
    color: "#6B7280",
    margin: 0,
    lineHeight: 1.55,
    flexGrow: 1,
  },

  // Footer
  footer: {
    position: "relative",
    zIndex: 1,
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "28px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1280,
    margin: "0 auto",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: "0.06em",
    background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 60%))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  footerText: {
    fontSize: 13,
    color: "#4B5563",
  },
};