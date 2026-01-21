import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { WhySanzoxSection, AboutSplitSection } from '@/components/sections/AboutSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <WhySanzoxSection />
      <StatsSection />
      <AboutSplitSection />
      <TechStackSection />
      <WorksSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
