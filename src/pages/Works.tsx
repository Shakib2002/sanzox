import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { CTASection } from '@/components/sections/CTASection';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { ProjectMarquee } from '@/components/ui/ProjectMarquee';
import heroWorksImage from '@/assets/hero-works.jpg';

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

// Fallback demo data
const demoWorks: Work[] = [
  { id: '1', slug: 'ai-workflow-automation', title: 'AI Workflow Automation', industry: 'SaaS', tags: ['AI Automation', 'Process Optimization'], thumbnail: null, featured: true },
  { id: '2', slug: 'youtube-channel-growth', title: 'YouTube Channel Growth System', industry: 'Creator', tags: ['YouTube Automation', 'Growth'], thumbnail: null, featured: true },
  { id: '3', slug: 'premium-shopify-store', title: 'Premium Shopify Store', industry: 'eCommerce', tags: ['Shopify', 'eCommerce'], thumbnail: null, featured: true },
  { id: '4', slug: 'saas-landing-page', title: 'SaaS Landing Page', industry: 'SaaS', tags: ['Website Development', 'Design'], thumbnail: null, featured: true },
  { id: '5', slug: 'video-series-production', title: 'Educational Video Series', industry: 'Education', tags: ['Video Editing', 'Production'], thumbnail: null, featured: false },
  { id: '6', slug: 'agency-website', title: 'Creative Agency Website', industry: 'Agency', tags: ['Website Development', 'Branding'], thumbnail: null, featured: false },
];

const industries = ['All', 'AI Automation', 'Youtube Automation', 'Video Editing', 'Shopify', 'Website & Application'];

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>(demoWorks);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      const { data, error } = await supabase
        .from('works')
        .select('id, slug, title, industry, tags, thumbnail, featured, video_preview')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setWorks(data as unknown as Work[]);
      }
      setIsLoading(false);
    }
    fetchWorks();
  }, []);

  const filteredWorks = works.filter((work) => {
    const matchesFilter = activeFilter === 'All' || work.industry === activeFilter;
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={heroWorksImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Portfolio
            </span>
            <h1 className="heading-xl mb-6">Our <span className="gradient-text">Works</span></h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Marquee Showcase */}
      <section className="pb-8 overflow-hidden">
        <ProjectMarquee />
      </section>

      {/* Animated Filter Tabs & Search */}
      <section className="pb-8">
        <div className="container-custom">
          <motion.div 
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Animated filter tabs */}
            <div className="relative flex flex-wrap items-center justify-center gap-1 p-1 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/30">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveFilter(industry)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors z-10"
                >
                  {activeFilter === industry && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeFilter === industry ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {industry}
                  </span>
                </button>
              ))}
            </div>

            {/* Search with glow effect */}
            <div className="relative w-full md:w-72 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search works..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/30 focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Works Bento Grid */}
      <section className="section-padding pt-4">
        <div className="container-custom">
          {filteredWorks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">No works found matching your criteria.</p>
              <button 
                onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <BentoGrid works={filteredWorks} />
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
