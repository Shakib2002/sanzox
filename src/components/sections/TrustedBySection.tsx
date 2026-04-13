import { TextReveal } from '@/components/ui/TextReveal';
import {
  ShoppingCart,
  Store,
  Users,
  Briefcase,
  Video,
  Globe,
  Smartphone,
  Megaphone,
  TrendingUp,
  Building2
} from 'lucide-react';

const logosRow1 = [
  { name: 'E-commerce Brands', icon: ShoppingCart, color: 'text-blue-400' },
  { name: 'Local Businesses', icon: Store, color: 'text-green-400' },
  { name: 'SaaS Startups', icon: Globe, color: 'text-purple-400' },
  { name: 'Digital Agencies', icon: Briefcase, color: 'text-orange-400' },
  { name: 'Content Creators', icon: Video, color: 'text-pink-400' },
];

const logosRow2 = [
  { name: 'Freelance Teams', icon: Users, color: 'text-cyan-400' },
  { name: 'Mobile Businesses', icon: Smartphone, color: 'text-sky-400' },
  { name: 'Marketing Teams', icon: Megaphone, color: 'text-rose-400' },
  { name: 'Growth Startups', icon: TrendingUp, color: 'text-emerald-400' },
  { name: 'Enterprise Solutions', icon: Building2, color: 'text-yellow-400' },
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
            Trusted by growing businesses and innovators worldwide
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