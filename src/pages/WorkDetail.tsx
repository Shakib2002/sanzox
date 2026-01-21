import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

// Demo work data
const worksData: Record<string, {
  title: string;
  industry: string;
  tags: string[];
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  liveUrl?: string;
}> = {
  'ai-workflow-automation': {
    title: 'AI Workflow Automation',
    industry: 'SaaS',
    tags: ['AI Automation', 'Process Optimization'],
    challenge: 'A growing SaaS company was spending 40+ hours weekly on manual data entry and customer support tasks.',
    solution: 'We built a comprehensive AI automation system using Make.com and OpenAI to handle data processing, ticket routing, and automated responses.',
    result: 'The client now saves 35+ hours per week and has reduced response times by 80%.',
    metrics: [{ label: 'Hours Saved/Week', value: '35+' }, { label: 'Response Time', value: '-80%' }, { label: 'Customer Satisfaction', value: '+45%' }],
    techStack: ['Make.com', 'OpenAI', 'Airtable', 'Slack', 'Zendesk'],
    liveUrl: '#',
  },
  'youtube-channel-growth': {
    title: 'YouTube Channel Growth System',
    industry: 'Creator',
    tags: ['YouTube Automation', 'Growth'],
    challenge: 'A content creator struggled to maintain consistent uploads and optimize for YouTube algorithm.',
    solution: 'We implemented an end-to-end YouTube automation system covering content planning, SEO optimization, and automated publishing.',
    result: 'The channel grew from 50K to 500K subscribers in 8 months.',
    metrics: [{ label: 'Subscriber Growth', value: '10x' }, { label: 'Monthly Views', value: '2M+' }, { label: 'Upload Consistency', value: '100%' }],
    techStack: ['TubeBuddy', 'VidIQ', 'Make.com', 'Notion', 'Canva'],
    liveUrl: '#',
  },
  'premium-shopify-store': {
    title: 'Premium Shopify Store',
    industry: 'eCommerce',
    tags: ['Shopify', 'eCommerce'],
    challenge: 'An emerging fashion brand needed a premium online store that could handle high traffic and showcase their products beautifully.',
    solution: 'We designed and built a custom Shopify store with advanced filtering, quick checkout, and integrated inventory management.',
    result: 'The store launched successfully and achieved $100K in sales in the first month.',
    metrics: [{ label: 'First Month Sales', value: '$100K' }, { label: 'Conversion Rate', value: '4.2%' }, { label: 'Cart Abandonment', value: '-35%' }],
    techStack: ['Shopify', 'Liquid', 'Klaviyo', 'Judge.me', 'ShipStation'],
    liveUrl: '#',
  },
  'saas-landing-page': {
    title: 'SaaS Landing Page',
    industry: 'SaaS',
    tags: ['Website Development', 'Design'],
    challenge: 'A B2B SaaS startup needed a high-converting landing page to launch their product.',
    solution: 'We designed and developed a modern, fast landing page with clear value proposition and optimized conversion funnels.',
    result: 'The page achieved a 12% demo booking rate, exceeding industry benchmarks.',
    metrics: [{ label: 'Demo Booking Rate', value: '12%' }, { label: 'Page Load Time', value: '<1s' }, { label: 'Bounce Rate', value: '28%' }],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: '#',
  },
};

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? worksData[slug] : null;

  if (!work) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Work Not Found</h1>
            <Button asChild><Link to="/works">View All Works</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <Link to="/works" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Works
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{work.industry}</span>
              {work.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm">{tag}</span>
              ))}
            </div>
            <h1 className="heading-xl mb-4">{work.title}</h1>
            {work.liveUrl && (
              <Button variant="outline" asChild>
                <a href={work.liveUrl} target="_blank" rel="noopener noreferrer">
                  View Live <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">{work.title[0]}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="heading-md mb-4 text-primary">The Challenge</h2>
                <p className="text-muted-foreground text-lg">{work.challenge}</p>
              </div>
              
              {/* Solution */}
              <div>
                <h2 className="heading-md mb-4 text-primary">Our Solution</h2>
                <p className="text-muted-foreground text-lg">{work.solution}</p>
              </div>
              
              {/* Result */}
              <div>
                <h2 className="heading-md mb-4 text-primary">The Result</h2>
                <p className="text-muted-foreground text-lg">{work.result}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              <GlassCard>
                <h3 className="font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  {work.metrics.map(metric => (
                    <div key={metric.label} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="text-xl font-bold text-primary">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Tech Stack */}
              <GlassCard>
                <h3 className="font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {work.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-sm">{tech}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/20">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Want Similar Results?</h2>
          <p className="text-muted-foreground mb-8">Let's discuss how we can help transform your business.</p>
          <Button size="lg" asChild className="btn-glow">
            <Link to="/contact">Start Your Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
