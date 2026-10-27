import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import teamCollaboration from '@/assets/team/team-image-1.webp';
import collaboration from '@/assets/team/collaboration.webp';
import image1 from '@/assets/team/discuss.webp';

import { ArrowRight, Check, Sparkles } from 'lucide-react';

export function AboutSplitSection() {
  const checklistItems = [
    'AI-powered solutions built for real business challenges',
    'Scalable products designed for long-term growth',
    'Transparent collaboration with clear milestones',
    'Dedicated experts focused on measurable outcomes',
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.03),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              About SANZOX
            </span>

            <h2 className="heading-lg mb-6 leading-tight">
              Powering modern{' '}
              <span className="gradient-text relative">
                businesses
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M1 5.5C40 2 80 2 120 4C160 6 180 5 199 3" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
              <span className="gradient-text">.</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
              SANZOX is an AI-powered software company that builds SaaS platforms,
              mobile applications, automation systems, and digital products designed
              to help businesses scale faster, operate smarter, and grow sustainably.
            </p>

            <ul className="space-y-3.5 mb-10">
              {checklistItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary group-hover/item:border-primary transition-all duration-300">
                    <Check className="w-3.5 h-3.5 text-primary group-hover/item:text-primary-foreground transition-colors duration-300" strokeWidth={3} />
                  </div>
                  <span className="text-foreground/90 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="btn-glow relative px-6 py-6 rounded-full font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'hsl(var(--primary-foreground))',
                  boxShadow: 'var(--glow-primary)',
                  willChange: 'transform',
                }}
              >
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Bento Collage (2 cols x 3 rows) */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            {/* soft glow */}
            <div className="absolute -inset-6 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[520px] sm:h-[620px]">

              {/* A: Tall image (col 1, rows 1-2) */}
              <div className="group relative row-span-2 overflow-hidden rounded-2xl rounded-tl-[3rem] sm:rounded-tl-[4rem] border border-border/40 shadow-lg">
                <img
                  src={collaboration}
                  alt="Team collaboration"
                  loading="lazy"
                  className="h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

            {/* B: Stat (col 2, row 1) */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl rounded-tr-[3rem] sm:rounded-tr-[4rem] border border-white/30 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
       
            {/* glass layer: no color, just frost + soft shine */}
            <div className="absolute inset-0  backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br " />
            <h3 className="relative z-10 text-3xl sm:text-5xl font-bold tabular-nums text-white drop-shadow-md mb-1">10+</h3>
            <p className="relative z-10 text-sm text-white/90 font-medium drop-shadow">
                Years of<br />experience
            </p>
            </div>

              {/* C: Image (col 2, row 2) */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/40 shadow-lg">
                <img
                  src={image1}
                  alt="Working together"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

            {/* D: Stat (col 1, row 3) */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl rounded-bl-[3rem] sm:rounded-bl-[4rem] border border-white/30 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
    
            <div className="absolute inset-0  backdrop-blur-xl" />
            <div className="absolute inset-0 " />
            <h3 className="relative z-10 text-3xl sm:text-5xl font-bold tabular-nums text-white drop-shadow-md mb-1">50+</h3>
            <p className="relative z-10 text-sm text-white/90 font-medium drop-shadow">
                Happy clients in<br />Bangladesh
            </p>
            </div>


              {/* E: Image (col 2, row 3) */}
              <div className="group relative overflow-hidden rounded-2xl rounded-br-[3rem] sm:rounded-br-[4rem] border border-border/40 shadow-lg">
                <img
                  src={teamCollaboration}
                  alt="Working on laptop"
                  loading="lazy"
                  className="h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}