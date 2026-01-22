import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Target, Users, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import { CTASection } from '@/components/sections/CTASection';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import heroAboutImage from '@/assets/hero-about.jpg';
import ourStoryTeam from '@/assets/our-story-team.jpg';

// Fallback team photos for when database is empty
import founderImage from '@/assets/team/founder.jpg';
import creativeLeadImage from '@/assets/team/creative-lead.jpg';
import techLeadImage from '@/assets/team/tech-lead.jpg';
import automationExpertImage from '@/assets/team/automation-expert.jpg';
import videoLeadImage from '@/assets/team/video-lead.jpg';
import growthLeadImage from '@/assets/team/growth-lead.jpg';

const values = [
  { icon: Zap, title: 'Move Fast', description: 'We deliver results quickly without compromising quality.' },
  { icon: Target, title: 'Results-Driven', description: 'Every decision is guided by measurable outcomes.' },
  { icon: Users, title: 'Collaborative', description: 'We work as an extension of your team.' },
  { icon: Globe, title: 'Remote-First', description: 'Global talent, flexible processes, exceptional results.' },
];

// Fallback team data when database is empty
const fallbackTeam = [
  { 
    id: '1',
    name: 'John Doe', 
    role: 'CEO & Strategy', 
    image_url: founderImage,
    bio: 'Visionary leader with 10+ years in digital transformation.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: 'https://twitter.com/sanzox',
    email: 'hello@sanzox.com'
  },
  { 
    id: '2',
    name: 'Jane Smith', 
    role: 'Creative Director', 
    image_url: creativeLeadImage,
    bio: 'Award-winning designer crafting brand experiences.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: 'https://twitter.com/sanzox',
    email: 'hello@sanzox.com'
  },
  { 
    id: '3',
    name: 'Michael Johnson', 
    role: 'Tech Lead', 
    image_url: techLeadImage,
    bio: 'Full-stack architect building scalable solutions.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: null,
    email: 'hello@sanzox.com'
  },
  { 
    id: '4',
    name: 'Emily Davis', 
    role: 'AI & Automation', 
    image_url: automationExpertImage,
    bio: 'AI specialist transforming workflows with intelligent automation.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: 'https://twitter.com/sanzox',
    email: 'hello@sanzox.com'
  },
  { 
    id: '5',
    name: 'David Williams', 
    role: 'Video Production', 
    image_url: videoLeadImage,
    bio: 'Cinematic storyteller creating engaging content.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: 'https://twitter.com/sanzox',
    email: 'hello@sanzox.com'
  },
  { 
    id: '6',
    name: 'Sarah Brown', 
    role: 'Growth Marketing', 
    image_url: growthLeadImage,
    bio: 'Data-driven marketer scaling brands.',
    linkedin_url: 'https://linkedin.com/company/sanzox',
    twitter_url: 'https://twitter.com/sanzox',
    email: 'hello@sanzox.com'
  },
];

export default function AboutPage() {
  const { data: dbTeam } = useTeamMembers(true);
  
  // Use database team if available, otherwise fallback
  const team = dbTeam && dbTeam.length > 0 ? dbTeam : fallbackTeam;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
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
              <div className="aspect-square rounded-2xl overflow-hidden border border-border/50 relative group">
                <img 
                  src={ourStoryTeam} 
                  alt="SANZOX Team at work" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary">
                  13+ Team Members
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
                key={member.id}
                variants={fadeUpVariants}
                custom={index}
              >
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio || ''}
                  image={member.image_url || ''}
                  socials={{
                    linkedin: member.linkedin_url || undefined,
                    twitter: member.twitter_url || undefined,
                    email: member.email || undefined,
                  }}
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
