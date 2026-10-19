
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

import logo from '../../assets/6092db2a-794a-45a3-a93e-8de0007250db.png';

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
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: settings } = useSiteSettings();

  const s = settings || defaultSiteSettings;

  const currentPath =
    location.pathname.replace(/\/+$/, '') || '/';

  const isLinkActive = (href: string | null) =>
    href !== null && currentPath === href;

  const isServicesActive =
    currentPath === '/services' ||
    currentPath.startsWith('/services/');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileServicesOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const proposalButton = (
    <Button
      asChild
      className={cn(
        'group relative h-12 overflow-hidden rounded-xl',
        'border border-white/20 bg-white/[0.025]',
        'px-6 font-medium text-white shadow-none',
        'transition-all duration-300',
        'hover:border-white/40 hover:bg-white/[0.06]',
        'hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]',
        'active:scale-[0.98]'
      )}
    >
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2"
      >
        <span>Get Proposal</span>
        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </Button>
  );

  return (
    <>
      {createPortal(
        <motion.header
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-x-0 top-0 z-50 border-transparent bg-transparent py-3"
        >
          <nav
            className={cn(
              'container-custom transition-all duration-300',
              isScrolled &&
                'mx-auto mt-1 w-[calc(100%-2rem)] max-w-[1440px] rounded-full border border-white/[0.08] bg-[#080808]/90 px-4 py-0 shadow-lg shadow-black/20 backdrop-blur-2xl sm:px-6 md:py-2'
            )}
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">

              {/* Logo */}
              <Link
                to="/"
                aria-label={`${s.site_name} home`}
                className="flex min-w-0 items-center justify-self-start"
              >
                <img
                  src={logo}
                  alt={s.site_name}
                  className="h-14 w-auto object-contain"
                />
              </Link>

              {/* Desktop Navigation Pill */}
              <div
                className={cn(
                  'hidden items-center gap-1 lg:flex',
                  'rounded-xl border border-white/[0.10]',
                  'bg-[#141414]/90 p-1.5',
                  'shadow-[0_8px_35px_rgba(0,0,0,0.18)]',
                  'backdrop-blur-2xl'
                )}
              >
                {navLinks.map((link) => {
                  const active = link.dropdown
                    ? isServicesActive
                    : isLinkActive(link.href);

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
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={dropdownOpen}
                          aria-current={active ? 'page' : undefined}
                          onClick={() =>
                            setDropdownOpen((prev) => !prev)
                          }
                          onKeyDown={(event) => {
                            if (event.key === 'ArrowDown') {
                              event.preventDefault();
                              setDropdownOpen(true);
                            }
                          }}
                          className={cn(
                            'flex h-10 items-center gap-1.5',
                            'rounded-lg px-3.5',
                            'text-[13px] font-medium',
                            'transition-all duration-200',
                            active
                              ? 'bg-white/[0.10] text-white'
                              : 'text-white/75 hover:bg-white/[0.06] hover:text-white'
                          )}
                        >
                          {link.name}

                          <ChevronDown
                            size={14}
                            className={cn(
                              'transition-transform duration-200',
                              dropdownOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.98 }}
                              transition={{ duration: 0.18 }}
                              className={cn(
                                'absolute left-1/2 top-full z-50 mt-3',
                                'w-64 -translate-x-1/2 overflow-hidden',
                                'rounded-xl border border-white/10',
                                'bg-[#111111]/95 p-1.5',
                                'shadow-2xl shadow-black/40 backdrop-blur-2xl'
                              )}
                            >
                              <div
                                className="absolute inset-x-0 top-0 h-[2px]"
                                style={{
                                  background: 'var(--gradient-primary)',
                                }}
                              />

                              <div className="pt-1.5">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                      'flex items-center justify-between',
                                      'rounded-lg px-3.5 py-3',
                                      'text-[13px] transition-colors',
                                      currentPath === item.href
                                        ? 'bg-white/[0.08] text-white'
                                        : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                                    )}
                                  >
                                    {item.name}
                                    <ArrowUpRight
                                      size={14}
                                      className="opacity-50"
                                    />
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
                      to={link.href!}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative flex h-10 items-center',
                        'rounded-lg px-3.5',
                        'text-[13px] font-medium',
                        'transition-all duration-200',
                        active
                          ? 'bg-white/[0.10] text-white shadow-inner shadow-white/[0.04]'
                          : 'text-white/75 hover:bg-white/[0.06] hover:text-white'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden justify-self-end lg:block">
                {proposalButton}
              </div>

              {/* Mobile Toggle */}
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className={cn(
                  'flex h-11 w-11 items-center justify-center',
                  'rounded-xl border border-white/15',
                  'bg-[#141414]/90 text-white',
                  'transition-colors hover:bg-white/10 lg:hidden'
                )}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'overflow-hidden border-t border-white/[0.08]',
                  'bg-[#080808]/95 backdrop-blur-2xl lg:hidden'
                )}
              >
                <div className="container-custom space-y-1 py-4">
                  {navLinks.map((link) => {
                    const active = link.dropdown
                      ? isServicesActive
                      : isLinkActive(link.href);

                    if (link.dropdown) {
                      return (
                        <div key={link.name}>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileServicesOpen((prev) => !prev)
                            }
                            aria-expanded={mobileServicesOpen}
                            className={cn(
                              'flex w-full items-center justify-between',
                              'rounded-xl px-4 py-3.5 text-sm font-medium',
                              active
                                ? 'bg-white/[0.08] text-white'
                                : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                            )}
                          >
                            {link.name}
                            <ChevronDown
                              size={16}
                              className={cn(
                                'transition-transform duration-200',
                                mobileServicesOpen && 'rotate-180'
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
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-1 space-y-1 border-l border-white/10 py-1 pl-3">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.href}
                                      className={cn(
                                        'block rounded-lg px-3 py-3 text-sm',
                                        currentPath === item.href
                                          ? 'bg-white/[0.08] text-white'
                                          : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
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
                        to={link.href!}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between',
                          'rounded-xl px-4 py-3.5 text-sm font-medium',
                          active
                            ? 'bg-white/[0.10] text-white'
                            : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  <div className="pt-3">
                    {proposalButton}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>,
        document.body
      )}
    </>
  );
}
