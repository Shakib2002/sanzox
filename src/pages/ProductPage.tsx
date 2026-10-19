import { Layout } from '@/components/layout/Layout';
import { FeaturedProductsSection } from '@/components/sections/productpagesection/FeaturedProductsSection';
import OurAppJourney from '@/components/sections/productpagesection/OurAppJourney';
import ProductApproachSection from '@/components/sections/productpagesection/ProductApproachSection';
import { ProductCTASection } from '@/components/sections/productpagesection/ProductCTASection';
import { ProductDetailsSection } from '@/components/sections/productpagesection/ProductDetailsSection';
import ProductHeroSection from '@/components/sections/productpagesection/ProductHeroSection';
import { ProductRoadmapSection } from '@/components/sections/productpagesection/ProductRoadmapSection';
import WhyOurApp from '@/components/sections/productpagesection/WhyOurApp';

export default function ProductPage() {
  return (
    <Layout
      title="Products | SANZOX"
      description="Explore intelligent digital products from SANZOX, including DeepFocus, MaxDrive, and RedditLens."
    >
      <div className="bg-[#080808] font-sans text-white">
        <ProductHeroSection />
        <FeaturedProductsSection />
        <ProductRoadmapSection />
        <WhyOurApp />
        <ProductApproachSection />
        <OurAppJourney />
        <ProductCTASection />
      </div>
    </Layout>
  );
}
