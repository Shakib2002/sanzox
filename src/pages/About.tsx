import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Users, Zap, Target, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import { CTASection } from '@/components/sections/CTASection';

const values = [
  { icon: Zap, title: 'Move Fast', description: 'We deliver results quickly without compromising quality.' },
  { icon: Target, title: 'Results-Driven', description: 'Every decision is guided by measurable outcomes.' },
  { icon: Users, title: 'Collaborative', description: 'We work as an extension of your team.' },
  { icon: Globe, title: 'Remote-First', description: 'Global talent, flexible processes, exceptional results.' },
];

const team = [
  { name: 'Founder', role: 'CEO & Strategy', initial: 'F' },
  { name: 'Creative Lead', role: 'Design & Brand', initial: 'C' },
  { name: 'Tech Lead', role: 'Development', initial: 'T' },
  { name: 'Automation Expert', role: 'AI & Systems', initial: 'A' },
  { name: 'Video Lead', role: 'Production', initial: 'V' },
  { name: 'Growth Lead', role: 'Marketing', initial: 'G' },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="heading-xl mb-6">
              We're from <span className="gradient-text">another space</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              SANZOX is a remote-first digital agency bringing together the brightest minds 
              in automation, design, and development to transform how businesses grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-4">
                SANZOX was founded with a simple mission: help businesses leverage technology to grow faster 
                and work smarter. We saw too many companies struggling with repetitive tasks, inconsistent 
                content, and outdated digital presence.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Today, we're a team of 13+ experts across automation, video, web development, and growth 
                strategy. We've delivered 30+ successful projects and generated over 5 million views for 
                our clients.
              </p>
              <ul className="space-y-3">
                {['Fast delivery, no compromises', 'Transparent communication', 'Data-driven decisions', 'Long-term partnerships'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={slideInRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold gradient-text mb-4">S</div>
                  <p className="text-muted-foreground">SANZOX</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/20">
        <div className="container-custom">
          <SectionHeading badge="Our Values" title={<>What We <span className="gradient-text">Stand For</span></>} />
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(value => (
              <GlassCard key={value.title} variants={fadeUpVariants} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading badge="Our Team" title={<>Meet the <span className="gradient-text">Crew</span></>} description="A diverse team of experts passionate about helping businesses grow." />
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <GlassCard key={member.name} variants={fadeUpVariants} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4">
                  {member.initial}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
