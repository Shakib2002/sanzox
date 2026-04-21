import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layers } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { CTASection } from '@/components/sections/CTASection';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { ProjectMarquee } from '@/components/ui/ProjectMarquee';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured: boolean;
  video_preview?: string | null;
}

const defaultIndustries = [
  'AI Automation',
  'Youtube Automation',
  'Video Editing',
  'Shopify',
  'Website & Application',
];

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { data: siteSettings } = useSiteSettings();

  const industries = [
    'All',
    ...(siteSettings?.works_industries?.length
      ? siteSettings.works_industries
      : defaultIndustries),
  ];

  useEffect(() => {
    async function fetchWorks() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('works')
        .select('id, slug, title, industry, tags, thumbnail, featured, video_preview')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWorks(data as unknown as Work[]);
      }
      setIsLoading(false);
    }
    fetchWorks();
  }, []);

  const filteredWorks = works.filter((work) => {
    const matchesFilter = activeFilter === 'All' || work.industry === activeFilter;
    const matchesSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5">
              Portfolio
            </span>
            <h1 className="heading-xl mb-5">
              Our <span className="gradient-text">Works</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of successful projects and see how we've helped
              businesses achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────── */}
      <section className="pb-10 overflow-hidden">
        <ProjectMarquee />
      </section>

      {/* ── Filters & Search ───────────────────────────── */}
      <section className="pb-10">
        <div className="container-custom">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveFilter(industry)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={
                    activeFilter === industry
                      ? {
                          background:
                            'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                          color: 'hsl(222 47% 6%)',
                          boxShadow: '0 0 18px hsl(217 91% 60% / 0.3)',
                        }
                      : {
                          background: 'hsl(var(--secondary) / 0.5)',
                          color: 'hsl(var(--muted-foreground))',
                          border: '1px solid hsl(var(--border) / 0.4)',
                        }
                  }
                >
                  {industry}
                </button>
              ))}

              {/* Search — inline with pills on md+ */}
              {/* <div className="relative ml-auto w-full sm:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 bg-secondary/50 border-border/30 focus:border-primary/50 rounded-full text-sm transition-colors"
                />
              </div> */}
            </div>

            {/* Result count */}
            {/* {!isLoading && (
              <p className="text-sm text-muted-foreground">
                {filteredWorks.length}{' '}
                {filteredWorks.length === 1 ? 'project' : 'projects'} found
                {activeFilter !== 'All' && (
                  <span className="text-primary"> · {activeFilter}</span>
                )}
              </p>
            )} */}
          </motion.div>
        </div>
      </section>

      {/* ── Grid / Empty / Loading ─────────────────────── */}
      <section className="pb-20">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-secondary/40 animate-pulse"
                    style={{ height: i % 3 === 0 ? 280 : 220 }}
                  />
                ))}
              </motion.div>
            ) : filteredWorks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      'linear-gradient(135deg, hsl(217 91% 60% / 0.1), hsl(280 70% 55% / 0.1))',
                    border: '1px solid hsl(217 91% 60% / 0.2)',
                    color: 'hsl(217 91% 60%)',
                  }}
                >
                  <Layers size={28} />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Try a different filter or search term to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-sm text-primary hover:underline underline-offset-4 transition-all"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BentoGrid works={filteredWorks} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}