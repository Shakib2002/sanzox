import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { WorkGallery } from '@/components/WorkGallery';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';

interface Work {
  id: string;
  title: string;
  slug: string;
  industry: string | null;
  thumbnail: string | null;
  gallery: string[] | null;
  live_url: string | null;
  tags: string[] | null;
  tech_stack: string[] | null;
  challenge_md: string | null;
  solution_md: string | null;
  result_md: string | null;
  metrics: { label: string; value: string }[] | null;
}

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        // Parse metrics from JSON
        let parsedMetrics: { label: string; value: string }[] = [];
        if (data.metrics && Array.isArray(data.metrics)) {
          parsedMetrics = data.metrics.map((m: unknown) => {
            const metric = m as { label?: string; value?: string };
            return {
              label: metric.label || '',
              value: metric.value || ''
            };
          });
        }
        setWork({ 
          ...data, 
          metrics: parsedMetrics 
        } as Work);
      }
      setLoading(false);
    };

    fetchWork();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

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
      <SEOHead 
        title={`${work.title} | Works | SANZOX`}
        description={work.challenge_md?.slice(0, 155) || `Explore ${work.title} - a project by SANZOX`}
        image={work.thumbnail || undefined}
      />
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <Link to="/works" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Works
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {work.industry && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{work.industry}</span>
              )}
              {work.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm">{tag}</span>
              ))}
            </div>
            <h1 className="heading-xl mb-4">{work.title}</h1>
            {work.live_url && (
              <Button variant="outline" asChild>
                <a href={work.live_url} target="_blank" rel="noopener noreferrer">
                  View Live <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        <div className="container-custom">
          <WorkGallery
            images={work.gallery || []}
            thumbnail={work.thumbnail}
            title={work.title}
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              {work.challenge_md && (
                <div>
                  <h2 className="heading-md mb-4 text-primary">The Challenge</h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                    <ReactMarkdown>{work.challenge_md}</ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Solution */}
              {work.solution_md && (
                <div>
                  <h2 className="heading-md mb-4 text-primary">Our Solution</h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                    <ReactMarkdown>{work.solution_md}</ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Result */}
              {work.result_md && (
                <div>
                  <h2 className="heading-md mb-4 text-primary">The Result</h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                    <ReactMarkdown>{work.result_md}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              {work.metrics && work.metrics.length > 0 && (
                <GlassCard>
                  <h3 className="font-semibold mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {work.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="text-xl font-bold text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Tech Stack */}
              {work.tech_stack && work.tech_stack.length > 0 && (
                <GlassCard>
                  <h3 className="font-semibold mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tech_stack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-sm">{tech}</span>
                    ))}
                  </div>
                </GlassCard>
              )}
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
