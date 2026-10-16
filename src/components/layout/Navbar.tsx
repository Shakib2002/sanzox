import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

import logo from "../../assets/6092db2a-794a-45a3-a93e-8de0007250db.png"

const services = [
  { name: 'Android Development', href: '/services/android-development' },
  { name: 'SaaS Engineering', href: '/services/saas-engineering' },
  { name: 'AI & LLM Integrations', href: '/services/ai-integrations' },
  { name: 'UI/UX Design Systems', href: '/services/design-systems' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: null, dropdown: services },
  { name: 'Products', href: '/products' },
  // { name: 'Works', href: '/works' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  const dropdownRef = useRef(null);
  const location = useLocation();
  const { data: settings } = useSiteSettings();
 
  const s = settings || defaultSiteSettings;
 
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';
  const isLinkActive = (href: string | null) => href !== null && currentPath === href;
  const isServicesActive = currentPath === '/services' || currentPath.startsWith('/services/');
 
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
    <>
    <div aria-hidden="true" className="h-20 md:h-24" />
    {createPortal(<motion.header
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,padding,backdrop-filter] duration-300',
        isScrolled
          ? 'border-white/10 bg-[#080808]/85 py-1 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-transparent bg-transparent py-2'
      )}
    >
      <nav className="container-custom">
        <div className={cn(
          'flex items-center justify-between transition-[height] duration-300',
          isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
        )}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-3xl font-bold tracking-tight"
          >
            <img
              src={logo}
              alt={s.site_name}
              className={cn('w-auto transition-[height] duration-300', isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16')}
            />
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
                      aria-current={isServicesActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-1 border-b-2 border-transparent pb-1 text-[16px] font-bold transition-colors hover:border-white/60',
                        isServicesActive
                          ? 'border-white/70 text-white'
                          : 'text-muted-foreground hover:text-white'
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
                            ? 'hsl(var(--foreground))'
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
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl shadow-xl overflow-hidden"
                        >
                          {/* Decorative top gradient line */}
                          <div
                            className="h-[2px] w-full"
                            style={{
                              background: 'var(--gradient-primary)',
                            }}
                          />
                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                  'flex items-center px-4 py-2.5 text-[14px] font-medium transition-colors',
                                  currentPath === item.href
                                    ? 'bg-white/[0.08] text-white'
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
                    'border-b-2 border-transparent pb-1 text-[16px] font-bold transition-colors hover:border-white/60 hover:gradient-text',
                    isLinkActive(link.href)
                      ? 'border-white/70 text-white'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isLinkActive(link.href) ? 'page' : undefined}
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
              className="btn-glow relative px-6 py-3.5 rounded-full font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'var(--gradient-primary)',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: 'var(--glow-primary)',
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
                          'w-full flex items-center justify-between py-3 px-4 rounded-full text-base font-medium transition-colors',
                          isServicesActive
                            ? 'bg-white/[0.08] text-white'
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
                            className="mt-1 ml-4 space-y-1 rounded-2xl border border-white/[0.06] bg-[#111111]/90 p-2"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                  'block py-2 px-3 rounded-full text-sm font-medium transition-colors',
                                  currentPath === item.href
                                    ? 'bg-white/[0.08] text-white'
                                    : 'text-muted-foreground hover:bg-secondary'
                                )}
                                aria-current={currentPath === item.href ? 'page' : undefined}
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
                        'block py-3 px-4 rounded-full text-base font-medium transition-colors',
                        isLinkActive(link.href)
                          ? 'bg-white/[0.08] text-white'
                          : 'text-muted-foreground hover:bg-secondary'
                      )}
                      aria-current={isLinkActive(link.href) ? 'page' : undefined}
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
                  className="w-full btn-glow relative py-3.5 rounded-full font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'hsl(var(--primary-foreground))',
                    boxShadow: 'var(--glow-primary)',
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
    </motion.header>, document.body)}
    </>
  );
}