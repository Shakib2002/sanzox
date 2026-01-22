import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

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
    ? works.slice(0, 6)
    : works.filter(w => w.industry === activeFilter).slice(0, 6);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Portfolio"
          title={<>Explore Our <span className="gradient-text">Works</span></>}
          description="Case studies showcasing the transformative results we've delivered for our clients."
        />

        {/* Filter chips */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
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

        {/* Bento Grid */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <BentoGrid works={filteredWorks} />
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
