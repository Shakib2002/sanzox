import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import NewHeroSection from '@/components/sections/NewHeroSection';
import { ContactSection } from '@/components/sections/ContactSection';
import ProductsSection from '@/components/sections/ProductSection';
import { WhySanzoxSection } from '@/components/sections/HomePage/WhySanzoxSection';
import { AboutSplitSection } from '@/components/sections/HomePage/AboutSection';

const Index = () => {
  return (
    <Layout>
      <NewHeroSection/>
      {/* <HeroSection /> */}
      <TrustedBySection />
      <ProductsSection/>
      <ServicesSection />
      <WhySanzoxSection />
      <AboutSplitSection />
      <StatsSection />
      {/* <WorksSection /> */}
      <IndustriesSection />
      <TestimonialsSection />
      {/* <TechStackSection /> */}
      {/* <CTASection /> */}
      <FAQSection />
      <ContactSection/>
    </Layout>
  );
};

export default Index;
