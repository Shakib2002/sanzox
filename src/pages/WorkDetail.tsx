import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, TrendingUp, Layers } from 'lucide-react';
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

const contentSections = [
  {
    key: 'challenge_md' as keyof Work,
    label: 'The challenge',
    step: '01',
  },
  {
    key: 'solution_md' as keyof Work,
    label: 'Our solution',
    step: '02',
  },
  {
    key: 'result_md' as keyof Work,
    label: 'The result',
    step: '03',
  },
];

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
        let parsedMetrics: { label: string; value: string }[] = [];
        if (data.metrics && Array.isArray(data.metrics)) {
          parsedMetrics = data.metrics.map((m: unknown) => {
            const metric = m as { label?: string; value?: string };
            return { label: metric.label || '', value: metric.value || '' };
          });
        }
        setWork({ ...data, metrics: parsedMetrics } as Work);
      }
      setLoading(false);
    };
    fetchWork();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!work) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.1), hsl(280 70% 55% / 0.1))',
                border: '1px solid hsl(217 91% 60% / 0.2)',
                color: 'hsl(217 91% 60%)',
              }}
            >
              <Layers size={28} />
            </div>
            <h1 className="heading-lg mb-3">Work not found</h1>
            <p className="text-muted-foreground mb-6 text-sm">This project doesn't exist or may have been removed.</p>
            <Button asChild>
              <Link to="/works">View all works</Link>
            </Button>
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

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="pt-20 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Link
              to="/works"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to works
            </Link>

            <div className="flex flex-wrap gap-2 mb-5">
              {work.industry && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.12), hsl(280 70% 55% / 0.12))',
                    border: '1px solid hsl(217 91% 60% / 0.25)',
                    color: 'hsl(217 91% 60%)',
                  }}
                >
                  {work.industry}
                </span>
              )}
              
            </div>

            <h1 className="text-2xl md:text-5xl mb-6 max-w-3xl font-bold">{work.title}</h1>

            {work.live_url && (
              <Button
                variant="outline"
                asChild
                className="rounded-xl border-border/50 hover:border-primary/50 transition-colors"
              >
                <a href={work.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 w-4 h-4" />
                  View live project
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────── */}
      {(work.gallery?.length || work.thumbnail) && (
        <section className="pb-16">
          <div className="container-custom">
            <WorkGallery
              images={work.gallery || []}
              thumbnail={work.thumbnail}
              title={work.title}
            />
          </div>
        </section>
      )}


      {/* ── Metrics (full width strip) ────────────────── */}
      {work.metrics && work.metrics.length > 0 && (
        <section className="py-12 border-y border-border/30 bg-secondary/10">
          <div className="container-custom">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Key metrics</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {work.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col gap-1"
                >
                  <span
                    className="text-3xl md:text-4xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Main Content ──────────────────────────────── */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: story */}
            <div className="lg:col-span-2 space-y-14">
              {contentSections.map(({ key, label, step }) => {
                const content = work[key] as string | null;
                if (!content) return null;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs font-mono font-medium px-2 py-0.5 rounded"
                        style={{
                          background: 'hsl(217 91% 60% / 0.1)',
                          color: 'hsl(217 91% 60%)',
                          border: '1px solid hsl(217 91% 60% / 0.2)',
                        }}
                      >
                        {step}
                      </span>
                      <h2 className="text-xl font-semibold">{label}</h2>
                    </div>
                    <div className="prose prose-invert prose-base max-w-none text-muted-foreground leading-relaxed
                      prose-p:text-muted-foreground prose-headings:text-foreground
                      prose-strong:text-foreground prose-li:text-muted-foreground
                      prose-ul:my-4 prose-li:my-1">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-5">
              {/* Tech Stack */}
              {work.tech_stack && work.tech_stack.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Layers size={15} className="text-primary" />
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tech stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {work.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Industry */}
              {work.industry && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <GlassCard className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Industry</p>
                    <p className="text-sm font-medium">{work.industry}</p>
                  </GlassCard>
                </motion.div>
              )}

              {/* Tags */}
              {work.tags && work.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <GlassCard className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary/60 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Live link CTA card */}
              {work.live_url && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <a
                    href={work.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 rounded-xl group transition-all"
                    style={{
                      background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.08), hsl(280 70% 55% / 0.08))',
                      border: '1px solid hsl(217 91% 60% / 0.2)',
                    }}
                  >
                    <span className="text-sm font-medium">View live project</span>
                    <ExternalLink
                      size={15}
                      className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.08), hsl(280 70% 55% / 0.08))',
              border: '1px solid hsl(217 91% 60% / 0.2)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(217 91% 60% / 0.1), transparent)',
              }}
            />
            <div className="relative z-10">
              <h2 className="heading-lg mb-4">Want similar results?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
                Let's discuss how we can help transform your business with a tailored solution.
              </p>
              <Button
                size="lg"
                asChild
                className="btn-glow px-8 py-4 rounded-xl font-semibold text-base"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                  color: 'hsl(222 47% 6%)',
                  boxShadow: '0 0 30px hsl(217 91% 60% / 0.3)',
                }}
              >
                <Link to="/contact">
                  Start your project <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}