import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProjectMarquee } from '@/components/ui/ProjectMarquee';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

// Demo works data
const works = [
  {
    id: '1',
    slug: 'ai-workflow-automation',
    title: 'AI Workflow Automation',
    industry: 'SaaS',
    tags: ['AI Automation', 'Process Optimization'],
    thumbnail: null,
    featured: true,
  },
  {
    id: '2',
    slug: 'youtube-channel-growth',
    title: 'YouTube Channel Growth System',
    industry: 'Creator',
    tags: ['YouTube Automation', 'Growth'],
    thumbnail: null,
    featured: true,
  },
  {
    id: '3',
    slug: 'shopify-store-launch',
    title: 'Premium Shopify Store',
    industry: 'eCommerce',
    tags: ['Shopify', 'eCommerce'],
    thumbnail: null,
    featured: true,
  },
  {
    id: '4',
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page',
    industry: 'SaaS',
    tags: ['Website Development', 'Design'],
    thumbnail: null,
    featured: true,
  },
  {
    id: '5',
    slug: 'video-series-production',
    title: 'Educational Video Series',
    industry: 'Education',
    tags: ['Video Editing', 'Production'],
    thumbnail: null,
    featured: false,
  },
  {
    id: '6',
    slug: 'agency-website',
    title: 'Creative Agency Website',
    industry: 'Agency',
    tags: ['Website Development', 'Branding'],
    thumbnail: null,
    featured: false,
  },
];

const industries = ['All', 'SaaS', 'Creator', 'eCommerce', 'Agency', 'Education'];

export function WorksSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredWorks = activeFilter === 'All' 
    ? works.slice(0, 4)
    : works.filter(w => w.industry === activeFilter).slice(0, 4);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Portfolio"
          title={<>Explore Our <span className="gradient-text">Works</span></>}
          description="Case studies showcasing the transformative results we've delivered for our clients."
        />

        {/* Project Marquee */}
        <ProjectMarquee />

        {/* Filter chips */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
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
        </motion.div>

        {/* Works grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredWorks.map((work) => (
            <GlassCard
              key={work.id}
              variants={fadeUpVariants}
              className="group overflow-hidden"
            >
              {/* Thumbnail placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/30">{work.title[0]}</span>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {work.industry}
                </span>
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

        {/* View all button */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" asChild>
            <Link to="/works">
              View All Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
