import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from '@/components/SEOHead';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

export function Layout({ children, title, description, image }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SEOHead title={title} description={description} image={image} />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Star background */}
      <div className="fixed inset-0 stars-bg opacity-50 pointer-events-none" />
      
      {/* Main gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-gradient opacity-60" />
      </div>

      <Navbar />
      
      <main className="flex-1 ">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
