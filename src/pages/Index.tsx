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
import NewHeroSection from '@/components/sections/NewHeroSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <Layout>
      <NewHeroSection/>
      {/* <HeroSection /> */}
      <TrustedBySection />
      <ServicesSection />
      <WhySanzoxSection />
      <StatsSection />
      <WorksSection />
      <IndustriesSection />
      <TestimonialsSection />
      <AboutSplitSection />
      {/* <TechStackSection /> */}
      <CTASection />
      <FAQSection />
      <ContactSection/>
    </Layout>
  );
};

export default Index;
