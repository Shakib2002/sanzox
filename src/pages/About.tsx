import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import { CTASection } from '@/components/sections/CTASection';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import heroAboutImage from '@/assets/hero-about.jpg';

// Team photos
import founderImage from '@/assets/team/founder.jpg';
import creativeLeadImage from '@/assets/team/creative-lead.jpg';
import techLeadImage from '@/assets/team/tech-lead.jpg';
import automationExpertImage from '@/assets/team/automation-expert.jpg';
import videoLeadImage from '@/assets/team/video-lead.jpg';
import growthLeadImage from '@/assets/team/growth-lead.jpg';

import { Zap, Target, Users, Globe } from 'lucide-react';

const values = [
  { icon: Zap, title: 'Move Fast', description: 'We deliver results quickly without compromising quality.' },
  { icon: Target, title: 'Results-Driven', description: 'Every decision is guided by measurable outcomes.' },
  { icon: Users, title: 'Collaborative', description: 'We work as an extension of your team.' },
  { icon: Globe, title: 'Remote-First', description: 'Global talent, flexible processes, exceptional results.' },
];

const team = [
  { 
    name: 'Alex Chen', 
    role: 'CEO & Strategy', 
    image: founderImage,
    bio: 'Visionary leader with 10+ years in digital transformation. Passionate about helping businesses scale through innovation.',
    socials: { linkedin: '#', twitter: '#', email: 'alex@sanzox.com' }
  },
  { 
    name: 'Maya Rodriguez', 
    role: 'Creative Director', 
    image: creativeLeadImage,
    bio: 'Award-winning designer crafting brand experiences that captivate and convert. Former lead at top agencies.',
    socials: { linkedin: '#', twitter: '#', email: 'maya@sanzox.com' }
  },
  { 
    name: 'James Wilson', 
    role: 'Tech Lead', 
    image: techLeadImage,
    bio: 'Full-stack architect building scalable solutions. Open source contributor and performance optimization expert.',
    socials: { linkedin: '#', email: 'james@sanzox.com' }
  },
  { 
    name: 'Sarah Kim', 
    role: 'AI & Automation', 
    image: automationExpertImage,
    bio: 'AI specialist transforming workflows with intelligent automation. Making businesses 10x more efficient.',
    socials: { linkedin: '#', twitter: '#', email: 'sarah@sanzox.com' }
  },
  { 
    name: 'Marcus Thompson', 
    role: 'Video Production', 
    image: videoLeadImage,
    bio: 'Cinematic storyteller creating content that drives engagement. 50M+ views across client projects.',
    socials: { linkedin: '#', twitter: '#', email: 'marcus@sanzox.com' }
  },
  { 
    name: 'Elena Vasquez', 
    role: 'Growth Marketing', 
    image: growthLeadImage,
    bio: 'Data-driven marketer scaling brands from startup to enterprise. Expert in conversion optimization.',
    socials: { linkedin: '#', twitter: '#', email: 'elena@sanzox.com' }
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={heroAboutImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
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
          <SectionHeading 
            badge="Our Team" 
            title={<>Meet the <span className="gradient-text">Crew</span></>} 
            description="A diverse team of experts passionate about helping businesses grow. Hover to learn more about each team member." 
          />
          <motion.div 
            variants={staggerContainerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeUpVariants}
                custom={index}
              >
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  socials={member.socials}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
