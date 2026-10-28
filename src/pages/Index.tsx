
import { Layout } from '@/components/layout/Layout';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';

import NewHeroSection from '@/components/sections/NewHeroSection';
import ProductsSection from '@/components/sections/ProductSection';

import { WhySanzoxSection } from '@/components/sections/HomePage/WhySanzoxSection';
import { AboutSplitSection } from '@/components/sections/HomePage/AboutSection';
import { HowWeWorkSection } from '@/components/sections/HomePage/HowWeWork';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <NewHeroSection />

      {/* Trust & Products */}
      <TrustedBySection />
      <ProductsSection />

      {/* Services & Company */}
      <ServicesSection />
      <HowWeWorkSection/>
      <AboutSplitSection />

      {/* Industry Expertise & Credibility */}
      <IndustriesSection />
      {/* <StatsSection /> */}
      <TestimonialsSection />

      {/* Questions & Contact */}
      <FAQSection />
      <CTASection/>
      <ContactSection />
    </Layout>
  );
};

export default Index;
