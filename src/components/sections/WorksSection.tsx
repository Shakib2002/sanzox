import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WorkGrid } from '@/components/ui/WorkGrid';
import { WorksFilterBar } from '@/components/ui/WorksFilterBar';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { WorksSkeleton } from '@/components/ui/WorksSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useWorks } from '@/hooks/useWorks';
import { Work } from '@/types/work';

const defaultIndustries = [
  'Android App Development',
  'SaaS Platform Engineering',
  'AI & LLM Integrations',
  'UI/UX Design Systems',
];

export function WorksSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: siteSettings } = useSiteSettings();

  const industries = [
    'All',
    ...(siteSettings?.works_industries?.length
      ? siteSettings.works_industries
      : defaultIndustries),
  ];

  const { data: works, isLoading, error } = useWorks({
    industry: activeFilter,
    limit: 6,
  });

  const handleOpen = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Portfolio"
          title={<>Explore Our <span className="gradient-text">Works</span></>}
          description="Case studies showcasing the transformative results we've delivered for our clients."
        />

        {/* Filter bar */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <WorksFilterBar
            industries={industries}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </motion.div>

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load works. Please try again later.</AlertDescription>
          </Alert>
        )}

        {/* Loading skeleton */}
        {isLoading && <WorksSkeleton count={6} />}

        {/* Works grid */}
        <AnimatePresence mode="wait">
          {!isLoading && !error && works && works.length > 0 && (
            <motion.div
              key="grid"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <WorkGrid works={works} onOpen={handleOpen} />
            </motion.div>
          )}

          {!isLoading && !error && works?.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No works found for this category.</p>
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* Quick-view modal */}
      {selectedWork && (
        <QuickViewModal
          work={selectedWork}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
