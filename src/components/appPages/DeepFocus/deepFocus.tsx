import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ListChecks,
  Trophy,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Mail,
  MapPin,
  Zap,
  Layers,
  Star,
  Shield,
  Award,
  Play,
  Crown,
  Brain,
  Timer,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

import deepFocusLogo from '@/assets/products/deep-focus-logo.png'

import image1 from '@/assets/deep-focus/1.png'
import image2 from '@/assets//deep-focus/2.png'
import image3 from '@/assets//deep-focus/3.png'
import image4 from '@/assets//deep-focus/4.png'
import image5 from '@/assets//deep-focus/5.png'
import image6 from '@/assets//deep-focus/6.png'
import image7 from '@/assets//deep-focus/7.png'
import image8 from '@/assets//deep-focus/8.png'

const downloadHref = 'https://play.google.com/store/apps/details?id=com.sanzox.deepfocus';

// Brand tokens — keep every color reference to these two values consistent
const brand = {
  primary: '#04BE81',
  primaryDark: '#039E6C',
  primaryDeep: '#02754F',
  tint: '#E7F8F4',
  ink: '#06211A', // deep green-black for dark sections, replaces generic slate
};

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Focus Challenge', href: '#challenge' },
  { label: 'Explore', href: '#screenshots' },
  { label: 'FAQ', href: '#faq' },
];

const featureItems = [
  {
    icon: Brain,
    title: 'Deep Focus Sessions',
    description: 'Enter flow state with our intelligent timer that adapts to your natural focus rhythms.',
    badge: '',
    gradient: 'from-[#04BE81] to-[#039E6C]',
  },
  {
    icon: ListChecks,
    title: 'Smart Task Management',
    description: 'Organize priorities, break down complex work, and track completion with AI-powered insights.',
    badge: '',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Crown,
    title: '21-Day Challenge',
    description: 'Build unshakeable focus habits through our proven gamified consistency framework.',
    badge: '',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const coreFeatures = [
  {
    title: 'Focus Timer',
    subtitle: 'Flow State Engine',
    description: 'Enter deep work with our intelligent timer that adapts to your natural focus rhythms. Block distractions and achieve flow state faster.',
    bullets: ['Adaptive focus sessions', 'Distraction blocking', 'Flow state tracking'],
    image: '/images/focus-timer-.png',
    alt: 'Focus timer screen',
    reversed: false,
    gradient: 'from-[#E7F8F4] to-[#E7F8F4]',
    icon: Timer,
  },
  {
    title: 'Task Management',
    subtitle: 'Priority Matrix',
    description: 'Transform chaos into clarity with our intuitive task system. Prioritize effectively, track progress, and celebrate completions.',
    bullets: ['Priority-based sorting', 'Progress tracking', 'Completion analytics'],
    image: '/images/task.png',
    alt: 'Task management screen',
    reversed: true,
    gradient: 'from-emerald-200/20 to-teal-200/20',
    icon: ListChecks,
  },
  {
    title: 'Progress Analytics',
    subtitle: 'Performance Insights',
    description: 'Visualize your productivity journey with rich analytics. Understand your patterns and optimize for peak performance.',
    bullets: ['Activity heatmaps', 'Streak visualization', 'Performance metrics'],
    image: '/images/progress.png',
    alt: 'Progress tracking screen',
    reversed: false,
    gradient: 'from-blue-200/20 to-indigo-200/20',
    icon: BarChart3,
  },
];

// App Screenshots — display four items per slide with a single-step sliding motion
const galleryItems = [
  { id: 1, title: 'Home', image: image1, alt: 'App home screen', description: 'Overview of your focus journey' },
  { id: 2, title: 'Focus Timer', image: image2, alt: 'App timer screen', description: 'Deep work session in progress' },
  { id: 3, title: '21-Day Challenge', image: image3, alt: 'Task screen', description: 'Build lasting habits' },
  { id: 4, title: 'Task Management', image: image4, alt: 'Challenge screen', description: 'Organize your priorities' },
  { id: 5, title: 'Progress Analytics', image: image5, alt: 'Progress screen', description: 'Track your improvement' },
  { id: 6, title: 'Daily Goals', image: image6, alt: 'Daily goals screen', description: 'Stay consistent and intentional' },
  { id: 7, title: 'Focus Stats', image: image7, alt: 'Focus stats screen', description: 'Measure momentum over time' },
  { id: 8, title: 'Rewards', image: image8, alt: 'Rewards screen', description: 'Celebrate every milestone' },
];

const faqItems = [
  {
    question: 'What makes Deep Focus different?',
    answer:
      'Deep Focus combines scientific focus techniques with intuitive design. Unlike other apps, we focus on building sustainable habits through our 21-day challenge and adaptive focus sessions that work with your natural rhythm.',
  },
  {
    question: 'How does the 21-Day Challenge work?',
    answer:
      'The challenge guides you through 21 days of consistent focus sessions. Each day builds upon the previous, gradually strengthening your focus muscle. You\'ll receive daily prompts, track progress, and celebrate milestones.',
  },
  {
    question: 'Is Deep Focus suitable for teams?',
    answer:
      'Deep Focus is used by individuals, teams, and enterprises. We offer team plans with shared analytics, leaderboards, and collaborative features coming soon.',
  },
  {
    question: 'What platforms are supported?',
    answer:
      'Deep Focus is currently available on Android via Google Play. iOS and web versions are in development and coming soon.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'We take data security seriously. All data is encrypted in transit and at rest. We never share your data with third parties and comply with GDPR and CCPA regulations.',
  },
];

const testimonials = [
  {
    quote: "Deep Focus transformed how I work. I've never been more productive or focused.",
    author: 'Sarah Chen',
    role: 'Product Designer',
    rating: 5,
  },
  {
    quote: 'The 21-day challenge was a game-changer. I finally built the focus habit I always wanted.',
    author: 'Marcus Rivera',
    role: 'Software Engineer',
    rating: 5,
  },
  {
    quote: "Simple, elegant, and incredibly effective. Deep Focus is my daily productivity companion.",
    author: 'Aisha Patel',
    role: 'Entrepreneur',
    rating: 5,
  },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593125131602',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/deepfocus_app',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-4.63-4.63" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Challenge', href: '#challenge' },
  { label: 'Screenshots', href: '#screenshots' },
  { label: 'FAQ', href: '#faq' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/deep-focus/privacy-policy' },
  { label: 'Terms of Service', href: '/deep-focus/terms-and-conditions' },
];

export default function DeepFocus() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 4;
  const totalSlides = Math.max(1, galleryItems.length - visibleCount + 1);
  const visibleItems = galleryItems.slice(currentSlide, currentSlide + visibleCount);

  return (
    <Layout
      title="Deep Focus | SANZOX"
      description="Deep Focus helps you stay focused, manage your tasks, and build better productivity habits."
      hideNavbar
      hideFooter
    >
      <div className="relative bg-white text-slate-950 overflow-x-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#E7F8F4] via-[#E7F8F4]/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#E7F8F4]/60 via-[#E7F8F4]/30 to-transparent blur-3xl" />
        </div>

        <style>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% auto;
            animation: gradient 8s ease infinite;
          }
        `}</style>

        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl">
          <div className="container-custom flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <img
                src={deepFocusLogo}
                alt="Deep Focus"
                className="h-10 w-auto object-contain rounded-xl"
              />
              <p className="text-2xl font-bold tracking-tight text-slate-900">Deep Focus</p>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-md font-medium text-slate-900 transition hover:text-[#04BE81] relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#04BE81] transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Button
                asChild
                className="group relative overflow-hidden rounded-full bg-[#04BE81] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#04BE81]/30 hover:shadow-[#04BE81]/40 transition-all"
              >
                <a href={downloadHref} target="_blank" rel="noreferrer">
                  <span className="relative z-10 flex items-center gap-2">
                    Download App
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-[#039E6C] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                </a>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 lg:hidden backdrop-blur-sm"
                aria-label="Toggle Deep Focus menu"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-slate-200/80 bg-white/95 backdrop-blur-xl lg:hidden">
              <div className="container-custom flex flex-col gap-2 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#E7F8F4] hover:text-[#04BE81]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-[#04BE81] px-4 py-3 text-sm font-semibold text-white text-center transition hover:bg-[#039E6C]"
                >
                  Download App
                </a>
              </div>
            </div>
          )}
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-32 overflow-hidden">
            <div className="container-custom grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#02754F] shadow-sm">
                 Focus on Goals               
                 </div>
                <div className="space-y-6 max-w-2xl">
                  <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                    <span className="block">Focus Better.</span>
                    <span className="block bg-gradient-to-r from-[#04BE81] via-[#039E6C] to-[#02754F] bg-clip-text text-transparent animate-gradient">
                      Get More Done.
                    </span>
                  </h1>
                  <p className="text-lg leading-8 text-slate-600 sm:text-xl max-w-xl">
                    Deep Focus combines science-backed focus techniques with intuitive design to help you achieve flow state and build lasting productivity habits.
                  </p>
                </div>

                <div className="flex  items-center gap-4">
                  <Button
                    asChild
                    className="rounded-full border-2 border-[#04BE81]/30 bg-gray-950 h-12 px-5 flex items-center text-white hover:bg-gray-800 transition-all"
                  >
                    <a href={downloadHref} target="_blank" rel="noreferrer" className="inline-flex items-center h-full gap-3 px-3">
                      <svg viewBox="0 0 512 512" aria-hidden="true" className="h-6 w-6">
                        <path d="M48 32c-5 3-8 9-8 16v416c0 7 3 13 8 16l218-224L48 32z" fill="#34A853" opacity=".95" />
                        <path d="M362 188 96 26c-6-4-12-4-17-2l214 220 69-56z" fill="#4285F4" opacity=".7" />
                        <path d="M362 324 293 268 79 488c5 2 11 2 17-2l266-162z" fill="#FBBC05" opacity=".85" />
                        <path d="M456 230l-78-46-74 60 74 60 78-46c14-8 14-20 0-28z" fill="#EA4335" />
                      </svg>
                      <span className="flex flex-col leading-tight text-left">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/90">Get it on</span>
                        <span className="text-sm font-semibold">Google Play</span>
                      </span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-2 border-[#04BE81]/30 bg-[#E7F8F4] h-12 px-5 py-3 flex items-center text-base font-semibold text-[#02754F] hover:bg-[#E7F8F4]/70 transition-all"
                  >
                    <a href="#features" className="inline-flex items-center h-full">Explore Features</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="relative"
              >
                <div className="relative mx-auto w-full max-w-[540px]">
                  <div className="absolute -inset-4 rounded-[48px] bg-[#E7F8F4]/60 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[36px] bg-white p-4 shadow-2xl shadow-[#04BE81]/10">
                    <div className="relative overflow-hidden rounded-[28px]">
                      <img
                        src="/images/focus-timer-.png"
                        alt="Deep Focus app overview"
                        className="h-[500px] md:h-[640px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gradient-to-b from-white to-[#E7F8F4]/40 px-4 py-20 sm:px-6 lg:px-8">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-3xl text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#02754F]">
                  <Sparkles size={14} />
                Features
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Everything you need to <span className="bg-gradient-to-r from-[#04BE81] to-[#039E6C] bg-clip-text text-transparent">achieve flow</span>
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                  Science-backed tools designed to help you enter deep work, maintain focus, and build lasting productivity habits.
                </p>
              </motion.div>

              <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {featureItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity`} />
                      <div className="relative">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7F8F4] text-[#04BE81] group-hover:scale-110 transition-transform">
                          <Icon size={28} />
                        </div>
                        <div className="mt-6">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                            {/* <span className="rounded-full bg-[#E7F8F4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#02754F]">
                              {item.badge}
                            </span> */}
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        </div>
                        {/* <div className="mt-6 flex items-center gap-1 text-sm font-medium text-[#04BE81]">
                          Learn more
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div> */}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="container-custom">
              <div className="space-y-32">
                {coreFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`grid gap-12 lg:grid-cols-2 lg:items-center ${feature.reversed ? 'lg:grid-flow-dense' : ''}`}
                    >
                      <div className={feature.reversed ? 'lg:col-start-2' : ''}>
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#02754F]">
                            <Icon size={14} />
                            {feature.subtitle}
                          </div>
                          <h3 className="text-3xl font-bold text-slate-950 sm:text-4xl">{feature.title}</h3>
                          <p className="text-lg leading-8 text-slate-600">{feature.description}</p>
                        </div>
                        <ul className="mt-8 space-y-4">
                          {feature.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3">
                              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F8F4] text-[#04BE81]">
                                <CheckCircle2 size={14} />
                              </span>
                              <span className="text-slate-600">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={feature.reversed ? 'lg:col-start-1' : ''}>
                        <div className="relative">
                          <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${feature.gradient} blur-2xl opacity-60`} />
                          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl">
                            <img src={feature.image} alt={feature.alt} className="w-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-gradient-to-b from-[#E7F8F4]/40 to-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-3xl text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#02754F]">
                  <Award size={14} />
                  Trusted by Thousands
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  What our users say
                </h2>
              </motion.div>

              <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-1 text-[#04BE81]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-base leading-7 text-slate-600">"{testimonial.quote}"</p>
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="font-semibold text-slate-950">{testimonial.author}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Challenge Section */}
          <section id="challenge" className="relative overflow-hidden bg-gradient-to-br from-[#06211A] via-[#0A2E22] to-[#0D3B2A] px-4 py-20 text-white sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#04BE81]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#04BE81]/5 blur-3xl" />
            </div>
            <div className="container-custom relative z-10">
              <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/30 bg-[#04BE81]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#6FEFC4]">
                    <Trophy size={14} />
                    21-Day Challenge
                  </div>
                  <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Build a <span className="text-[#04BE81]">focus habit</span> in 21 days
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-300 max-w-lg">
                    Our proven framework guides you through 21 days of consistent focus sessions. Each day builds upon the previous, gradually strengthening your focus muscle.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      'Daily guided focus sessions',
                      'Progress tracking and insights',
                      'Milestone celebrations',
                      'Community support',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 size={18} className="text-[#04BE81]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-10 group relative overflow-hidden rounded-full bg-white px-8 py-6 text-sm font-semibold text-[#06211A] shadow-xl shadow-white/10 hover:shadow-white/20 transition-all"
                  >
                    <a href={downloadHref} target="_blank" rel="noreferrer">
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Challenge
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-[#E7F8F4] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    </a>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-[#04BE81]/10 rounded-3xl blur-2xl" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl">
                    <div className="p-6">
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 21 }, (_, index) => {
                          const day = index + 1;
                          const status = day <= 7 ? 'completed' : day === 8 ? 'active' : 'upcoming';
                          return (
                            <div
                              key={day}
                              className={`aspect-square rounded-xl border p-2 text-center text-sm font-medium transition ${
                                status === 'completed'
                                  ? 'border-[#04BE81]/50 bg-[#04BE81]/20 text-[#6FEFC4]'
                                  : status === 'active'
                                  ? 'border-[#04BE81]/60 bg-[#04BE81]/10 text-[#04BE81] shadow-[0_0_20px_rgba(4,190,129,0.2)]'
                                  : 'border-white/10 bg-white/5 text-slate-500'
                              }`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                        <div>
                          <p className="text-sm text-slate-400">Current Streak</p>
                          <p className="text-2xl font-bold text-white">7 days</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Completion Rate</p>
                          <p className="text-2xl font-bold text-[#04BE81]">100%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
         {/* Screenshots Gallery */}
        <section id="screenshots" className="bg-gradient-to-b from-white to-[#E7F8F4]/40 px-4 py-20 sm:px-6 lg:px-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#02754F]">
                <Layers size={14} />
                What's Inside
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Beautifully <span className="bg-gradient-to-r from-[#04BE81] to-[#039E6C] bg-clip-text text-transparent">crafted</span> for focus
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                Every screen is designed with intention; clean, minimal, and optimized for deep work.
              </p>
            </motion.div>

            <div className="mt-16">
              <div className="relative mx-auto max-w-7xl px-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                  disabled={currentSlide === 0}
                  className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2.5 text-slate-700 shadow-lg transition hover:border-[#04BE81] hover:text-[#04BE81] disabled:cursor-not-allowed disabled:opacity-40 sm:p-3"
                  aria-label="Previous screenshots"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
                  disabled={currentSlide === totalSlides - 1}
                  className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2.5 text-slate-700 shadow-lg transition hover:border-[#04BE81] hover:text-[#04BE81] disabled:cursor-not-allowed disabled:opacity-40 sm:p-3"
                  aria-label="Next screenshots"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="overflow-hidden" aria-live="polite">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / visibleCount)}%)`,
                      transition: 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                  >
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="shrink-0 px-2"
                        style={{ flex: `0 0 ${100 / visibleCount}%` }}
                      >
                        <div className="group relative">
                          <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl">
                              <img
                                src={item.image}
                                alt={item.alt}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === index ? 'w-8 bg-[#04BE81]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
          {/* FAQ Section */}
          <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="container-custom mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#04BE81]/20 bg-[#E7F8F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#02754F]">
                  <Shield size={14} />
                  FAQ
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Frequently Asked <span className="bg-gradient-to-r from-[#04BE81] to-[#039E6C] bg-clip-text text-transparent">Questions</span>
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Everything you need to know about Deep Focus.
                </p>
              </motion.div>

              <style>{`
                .faq-item-custom {
                  border: 1px solid #e2e8f0;
                  border-radius: 16px;
                  background: white;
                  transition: border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                              box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                              grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                  overflow: hidden;
                }

                .faq-item-custom:hover {
                  border-color: #cbd5e1;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                }

                .faq-item-custom.active {
                  border-color: #04BE81;
                  box-shadow: 0 4px 24px rgba(4, 190, 129, 0.12);
                }

                .faq-question-btn {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 1rem;
                  padding: 1.25rem 1.5rem;
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: #0f172a;
                  text-align: left;
                  transition: background-color 0.2s ease;
                  border-radius: 16px;
                }

                .faq-question-btn:hover {
                  background-color: #f8fafc;
                }

                .faq-question-btn .q-number {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  min-width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #E7F8F4;
                  color: #02754F;
                  font-size: 11px;
                  font-weight: 700;
                  flex-shrink: 0;
                }

                .faq-question-btn .chevron-icon {
                  flex-shrink: 0;
                  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                  color: #04BE81;
                }

                .faq-item-custom.active .faq-question-btn .chevron-icon {
                  transform: rotate(180deg);
                }

                .faq-answer-grid {
                  display: grid;
                  grid-template-rows: 0fr;
                  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .faq-item-custom.active .faq-answer-grid {
                  grid-template-rows: 1fr;
                }

                .faq-answer-inner-wrap {
                  overflow: hidden;
                }

                .faq-answer-inner {
                  padding: 0 1.5rem 1.5rem 1.5rem;
                  border-top: 1px solid #f1f5f9;
                  color: #475569;
                  font-size: 0.95rem;
                  line-height: 1.75;
                }

                .faq-answer-inner .answer-text {
                  padding-top: 1.25rem;
                  padding-left: 2.5rem;
                }
              `}</style>

              <div className="mt-16 space-y-3">
                {faqItems.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div key={faq.question} className={`faq-item-custom ${isOpen ? 'active' : ''}`}>
                      <button onClick={() => setOpenFaqIndex(isOpen ? -1 : index)} className="faq-question-btn">
                        <span className="flex items-center gap-3">
                          <span className="q-number">{String(index + 1).padStart(2, '0')}</span>
                          {faq.question}
                        </span>
                        <ChevronDown className="chevron-icon h-5 w-5" />
                      </button>

                      <div className="faq-answer-grid">
                        <div className="faq-answer-inner-wrap">
                          <div className="faq-answer-inner">
                            <div className="answer-text">{faq.answer}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E7F8F4]/40 to-white" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              }}
            />
            <div className="container-custom relative z-10 text-center text-black">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-3xl"
              >
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Ready to <span className="text-[#02754F]">transform</span> your focus?
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Join thousands of users who have already improved their productivity with Deep Focus.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 ">
                  <Button
                    asChild
                    className="group relative overflow-hidden rounded-full bg-[#02754F] px-8 py-6 text-base font-semibold text-[#fcfcfc]  shadow-black/20 hover:shadow-black/30 transition-all"
                  >
                    <a href={downloadHref} target="_blank" rel="noreferrer">
                      <span className="relative z-10 flex items-center gap-2">
                        Download Deep Focus
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-[#02754F] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    </a>
                  </Button>
                  <p className="text-sm text-gray-700">Free download • No credit card required</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#06211A] text-white">
            <div className="container-custom px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={deepFocusLogo}
                      alt="Deep Focus"
                      className="h-12 w-12 rounded-2xl bg-white/10 p-2 object-contain"
                    />
                    <div>
                      <p className="text-xl font-bold">Deep Focus</p>
                    </div>
                  </div>
                  <p className="max-w-sm text-sm leading-7 text-slate-400">
                    Focus better. Get more done. The premium productivity companion for achieving flow state.
                  </p>
                  <li className="flex items-center gap-3 text-slate-400">
                      <Mail size={16} className="text-[#04BE81]/70" />
                      hello.sanzox@gmail.com
                    </li>
                </div>

                

                <div className="lg:col-span-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#04BE81]/70">Quick Links</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li>
                      <Link to="/about" className="text-slate-400 transition hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="text-slate-400 transition hover:text-white">
                        Contact 
                      </Link>
                    </li>
                    
                  </ul>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#04BE81]/70">Legal</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {legalLinks.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href} className="text-slate-400 transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

       

               <div className="lg:col-span-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#04BE81]/70">Follow Us</h3>
                   <div className="flex gap-3 mt-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-[#04BE81] hover:bg-[#04BE81]/10 hover:text-[#04BE81]"
                        aria-label={social.label}
                      >
                        <span className="text-base">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div> 

              </div>
            </div>

            <div className="border-t border-white/5">
              <div className="container-custom px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
                  <p>© 2026 SANZOX. All rights reserved.</p>
                 
                  <div className="flex items-center gap-6">
                     <p>A Product of <Link to="https://www.sanzox.com" className="hover:text-slate-500 transition font-semibold text-gray-300">SANZOX</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </Layout>
  );
}