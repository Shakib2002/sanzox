import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

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
  { id: '1', slug: 'ai-automation-guide', title: 'The Complete Guide to AI Automation in 2024', excerpt: 'Learn how AI automation can transform your business operations and save countless hours.', cover: null, author: 'SANZOX Team', tags: ['AI', 'Automation'], published_at: '2024-01-15', created_at: '2024-01-15' },
  { id: '2', slug: 'youtube-growth-strategies', title: '10 YouTube Growth Strategies That Actually Work', excerpt: 'Discover proven strategies to grow your YouTube channel and build a loyal audience.', cover: null, author: 'SANZOX Team', tags: ['YouTube', 'Growth'], published_at: '2024-01-10', created_at: '2024-01-10' },
  { id: '3', slug: 'shopify-conversion-tips', title: 'Boost Your Shopify Conversion Rate by 50%', excerpt: 'Practical tips to optimize your Shopify store and increase sales.', cover: null, author: 'SANZOX Team', tags: ['Shopify', 'eCommerce'], published_at: '2024-01-05', created_at: '2024-01-05' },
];

const allTags = ['All', 'AI', 'Automation', 'YouTube', 'Growth', 'Shopify', 'eCommerce', 'Web Development'];

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
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
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
