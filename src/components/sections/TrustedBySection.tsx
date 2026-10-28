import { TextReveal } from '@/components/ui/TextReveal';


const icon = (slug: string) =>
  `https://cdn.simpleicons.org/${slug}`;


const techRow1 = [
  { name: 'React Native', slug: 'react' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'Swift', slug: 'swift' },
  { name: 'Kotlin', slug: 'kotlin' },
  { name: 'Expo', slug: 'expo' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'LangChain', slug: 'langchain' },
];

const techRow2 = [
  { name: 'Shopify', slug: 'shopify' },
  { name: 'WooCommerce', slug: 'woocommerce' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Figma', slug: 'figma' },
  { name: 'Framer', slug: 'framer' },
  { name: 'Sketch', slug: 'sketch' },
  { name: 'Python', slug: 'python' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Zapier', slug: 'zapier' },
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

function BrandCard({ brand }: { brand: { name: string; slug: string } }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/60 select-none">
      <div className="w-8 h-8 flex items-center justify-center">
        <img
          src={icon(brand.slug)}
          alt={brand.name}
          width={20}
          height={20}
          loading="lazy"
          className="w-5 h-5 object-contain"
        />
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

      <div className="space-y-6">
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: 'marquee-left 40s linear infinite' }}
          >
            {Array.from({ length: REPEAT }).map((_, gi) => (
              <div key={gi} className="flex gap-8 pr-8">
                {techRow1.map((b, i) => (
                  <BrandCard key={i} brand={b} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: 'marquee-right 44s linear infinite' }}
          >
            {Array.from({ length: REPEAT }).map((_, gi) => (
              <div key={gi} className="flex gap-8 pr-8">
                {techRow2.map((b, i) => (
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