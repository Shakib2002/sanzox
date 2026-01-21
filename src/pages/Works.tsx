import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { CTASection } from '@/components/sections/CTASection';
import heroWorksImage from '@/assets/hero-works.jpg';

interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured: boolean;
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

const industries = ['All', 'SaaS', 'Creator', 'eCommerce', 'Agency', 'Education'];

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>(demoWorks);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      const { data, error } = await supabase
        .from('works')
        .select('id, slug, title, industry, tags, thumbnail, featured')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setWorks(data);
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
      <section className="pt-20 pb-16 relative overflow-hidden">
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

      {/* Filters & Search */}
      <section className="pb-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveFilter(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === industry
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          {filteredWorks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No works found matching your criteria.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredWorks.map((work) => (
                <GlassCard key={work.id} variants={fadeUpVariants} className="group overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 overflow-hidden">
                    {work.thumbnail ? (
                      <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">{work.title[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ExternalLink className="w-8 h-8 text-primary" />
                    </div>
                    {work.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {work.industry && (
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {work.industry}
                      </span>
                    )}
                    {work.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    <Link to={`/works/${work.slug}`}>{work.title}</Link>
                  </h3>

                  <Link
                    to={`/works/${work.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </GlassCard>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
