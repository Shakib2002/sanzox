import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Star background */}
      <div className="fixed inset-0 stars-bg opacity-50 pointer-events-none" />
      
      {/* Main gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-gradient opacity-60" />
      </div>

      <Navbar />
      
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
