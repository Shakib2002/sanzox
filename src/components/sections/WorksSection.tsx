import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { WorksSkeleton } from '@/components/ui/WorksSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useWorks } from '@/hooks/useWorks';

const defaultIndustries = ['AI Automation', 'Youtube Automation', 'Video Editing', 'Shopify', 'Website & Application'];

export function WorksSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data: siteSettings } = useSiteSettings();
  
  const industries = ['All', ...(siteSettings?.works_industries?.length 
    ? siteSettings.works_industries 
    : defaultIndustries)];

  // Fetch works from database with filter
  const { data: works, isLoading, error } = useWorks({
    industry: activeFilter,
    limit: 6,
  });

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

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load works. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {isLoading && <WorksSkeleton count={6} />}

        {/* Works Grid */}
        {!isLoading && !error && works && works.length > 0 && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <BentoGrid works={works} />
          </motion.div>
        )}

        {/* Empty state */}
        {!isLoading && !error && works?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No works found for this category.</p>
          </div>
        )}

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
