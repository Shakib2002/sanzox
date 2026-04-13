import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

import logo from "../../assets/6092db2a-794a-45a3-a93e-8de0007250db.png"

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Works', href: '/works' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: settings } = useSiteSettings();

  const s = settings || defaultSiteSettings;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 py-2">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-3xl font-bold tracking-tight"
          >

             <img src={logo} alt={s.site_name} className="h-14 md:h-20 w-auto" />

            {/* {s.logo_url ? (
             <></>
            ) : (
              <span className="gradient-text">{s.site_name}</span>
            )} */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-[16px] font-bold transition-colors hover:gradient-text',
                  location.pathname === link.href
                    ? 'gradient-text'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild             
            className="btn-glow relative px-6 py-3.5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
              color: "hsl(222 47% 6%)",
              boxShadow: "0 0 30px hsl(217 91% 60% / 0.4)",
              willChange: "transform",
            }}>
              <Link to="/contact">Get Proposal</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'block py-3 px-4 rounded-lg text-base font-medium transition-colors',
                      location.pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button asChild             
                className="w-full btn-glow relative py-3.5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
                  color: "hsl(222 47% 6%)",
                  boxShadow: "0 0 30px hsl(217 91% 60% / 0.4)",
                  willChange: "transform",
                }}>
                  <Link to="/contact">Get Proposal</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}