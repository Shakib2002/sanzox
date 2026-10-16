import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from '@/components/SEOHead';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, title, description, image, hideNavbar, hideFooter }: LayoutProps) {
  return (
    <div className="site-theme relative min-h-screen flex flex-col overflow-x-clip bg-[#080808] font-sans text-white">
      <SEOHead title={title} description={description} image={image} />
      
      {/* Subtle neutral ambient light */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-gradient opacity-40" />
      </div>

      {!hideNavbar && <Navbar />}
      
      <main className="flex-1 ">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}
