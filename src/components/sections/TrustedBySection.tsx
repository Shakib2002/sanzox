import { TextReveal } from '@/components/ui/TextReveal';
import {
  Zap, Rocket, Globe, Layers, Sparkles,
  Code2, Cpu, Cloud, Palette, TrendingUp
} from 'lucide-react';

const logosRow1 = [
  { name: 'TechFlow', icon: Zap, color: 'text-blue-400' },
  { name: 'LaunchPad', icon: Rocket, color: 'text-orange-400' },
  { name: 'GlobalSync', icon: Globe, color: 'text-green-400' },
  { name: 'StackBuild', icon: Layers, color: 'text-purple-400' },
  { name: 'SparkAI', icon: Sparkles, color: 'text-yellow-400' },
];

const logosRow2 = [
  { name: 'CodeNest', icon: Code2, color: 'text-cyan-400' },
  { name: 'ChipWorks', icon: Cpu, color: 'text-rose-400' },
  { name: 'CloudBase', icon: Cloud, color: 'text-sky-400' },
  { name: 'DesignCo', icon: Palette, color: 'text-pink-400' },
  { name: 'GrowthLab', icon: TrendingUp, color: 'text-emerald-400' },
];

const marqueeStyles = `
  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-100% / 4)); }
  }
  @keyframes marquee-right {
    0%   { transform: translateX(calc(-100% / 4)); }
    100% { transform: translateX(0); }
  }
`;

// 4 copies render করা হচ্ছে, animation সরে মাত্র ১ copy এর width
const REPEAT = 4;

function BrandCard({ brand }: any) {
  const Icon = brand.icon;
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/60 select-none">
      <div className={`w-8 h-8 flex items-center justify-center ${brand.color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
        {brand.name}
      </span>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-16 overflow-hidden">
      <style>{marqueeStyles}</style>

      <div className="container-custom mb-8">
        <TextReveal>
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
            Trusted by innovative brands worldwide
          </p>
        </TextReveal>
      </div>

      <div className="space-y-6">

        {/* Row 1 — left scroll */}
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: 'marquee-left 28s linear infinite' }}
          >
            {Array.from({ length: REPEAT }).map((_, gi) => (
              <div key={gi} className="flex gap-8 pr-8">
                {logosRow1.map((b, i) => (
                  <BrandCard key={i} brand={b} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: 'marquee-right 32s linear infinite' }}
          >
            {Array.from({ length: REPEAT }).map((_, gi) => (
              <div key={gi} className="flex gap-8 pr-8">
                {logosRow2.map((b, i) => (
                  <BrandCard key={i} brand={b} />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}