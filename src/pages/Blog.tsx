import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import heroBlogImage from '@/assets/hero-blog.jpg';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover: string | null;
  author: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
}

// Demo data
const demoPosts: BlogPost[] = [
  { id: '1', slug: 'offline-first-android-apps-guide', title: 'Building Offline-First Android Apps: Room, SQLite, and WorkManager Guide', excerpt: 'Learn how to architect high-performance, offline-first native Android applications using Kotlin, Room database, and WorkManager.', cover: null, author: 'SANZOX Team', tags: ['Android', 'Mobile Development'], published_at: '2026-06-01', created_at: '2026-06-01' },
  { id: '2', slug: 'multi-tenant-saas-architecture', title: 'How to Architect a Multi-Tenant SaaS App with Next.js and Supabase', excerpt: 'Discover step-by-step how to design and build a scalable multi-tenant SaaS application with Next.js, Postgres schema partitioning, and Supabase auth.', cover: null, author: 'SANZOX Team', tags: ['SaaS', 'Web Engineering'], published_at: '2026-05-25', created_at: '2026-05-25' },
  { id: '3', slug: 'stripe-saas-subscription-billing', title: 'Stripe Subscription Billing for SaaS: Pitfalls and Best Practices', excerpt: 'A complete software engineering guide to implementing Stripe billing, webhook handlers, and coupon systems in B2B SaaS platforms.', cover: null, author: 'SANZOX Team', tags: ['SaaS', 'Stripe Integration'], published_at: '2026-05-18', created_at: '2026-05-18' },
];

const allTags = ['All', 'Android', 'SaaS', 'Mobile Development', 'Web Engineering', 'Stripe Integration', 'AI'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(demoPosts);
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, cover, author, tags, published_at, created_at')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setPosts(data);
      }
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={heroBlogImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Blog
            </span>
            <h1 className="heading-xl mb-6">Insights & <span className="gradient-text">Resources</span></h1>
            <p className="text-xl text-muted-foreground">
              Tips, guides, and insights on automation, growth, and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found.</p>
            </div>
          ) : (
            <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <GlassCard key={post.id} variants={fadeUpVariants} className="group overflow-hidden flex flex-col">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 overflow-hidden">
                    {post.cover ? (
                      <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">{post.title[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">{tag}</span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at || post.created_at)}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                      Read <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
