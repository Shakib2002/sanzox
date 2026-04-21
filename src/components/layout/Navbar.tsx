import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

import logo from "../../assets/6092db2a-794a-45a3-a93e-8de0007250db.png"

const services = [
  { name: 'AI Automation', href: '/services/ai-automation' },
  { name: 'Youtube Automation', href: '/services/youtube-automation' },
  { name: 'Video Editing', href: '/services/video-editing' },
  { name: 'Website Development', href: '/services/website-development' },
  { name: 'Digital Marketing', href: '/services/digital-marketing' },
  { name: 'Flutter App Development', href: '/services/flutter-app-development' },
  
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: null, dropdown: services },
  { name: 'Works', href: '/works' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { data: settings } = useSiteSettings();
 
  const s = settings || defaultSiteSettings;
 
  const isServicesActive = location.pathname.startsWith('/services');
 
  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
 
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
          </Link>
 
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 text-[16px] font-bold transition-colors',
                        isServicesActive ? 'gradient-text' : 'text-muted-foreground hover:gradient-text'
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform duration-200 flex-shrink-0',
                          dropdownOpen ? 'rotate-180' : 'rotate-0'
                        )}
                        style={{
                          color: isServicesActive
                            ? 'hsl(217 91% 60%)'
                            : 'currentColor',
                        }}
                      />
                    </button>
 
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden"
                        >
                          {/* Decorative top gradient line */}
                          <div
                            className="h-[2px] w-full"
                            style={{
                              background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                            }}
                          />
                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                  'flex items-center px-4 py-2.5 text-[14px] font-medium transition-colors',
                                  location.pathname === item.href
                                    ? 'gradient-text bg-primary/5'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                                )}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
 
              return (
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
              );
            })}
          </div>
 
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="btn-glow relative px-6 py-3.5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                color: 'hsl(222 47% 6%)',
                boxShadow: '0 0 30px hsl(217 91% 60% / 0.4)',
                willChange: 'transform',
              }}
            >
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
              {navLinks.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={cn(
                          'w-full flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium transition-colors',
                          isServicesActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={cn(
                            'transition-transform duration-200',
                            mobileServicesOpen ? 'rotate-180' : 'rotate-0'
                          )}
                        />
                      </button>
 
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1 ml-4 space-y-1 border-l-2 border-border/50 pl-3"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                  'block py-2 px-3 rounded-lg text-sm font-medium transition-colors',
                                  location.pathname === item.href
                                    ? 'text-primary bg-primary/5'
                                    : 'text-muted-foreground hover:bg-secondary'
                                )}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }
 
                return (
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
                );
              })}
 
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  asChild
                  className="w-full btn-glow relative py-3.5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                    color: 'hsl(222 47% 6%)',
                    boxShadow: '0 0 30px hsl(217 91% 60% / 0.4)',
                    willChange: 'transform',
                  }}
                >
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