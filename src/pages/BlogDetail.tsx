import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

// Demo data
const postsData: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  published_at: string;
  readTime: string;
}> = {
  'ai-automation-guide': {
    title: 'The Complete Guide to AI Automation in 2024',
    excerpt: 'Learn how AI automation can transform your business operations.',
    content: `
## Introduction

AI automation is revolutionizing how businesses operate. In this comprehensive guide, we'll explore the key concepts, tools, and strategies you need to implement AI automation in your organization.

## What is AI Automation?

AI automation combines artificial intelligence with traditional automation to create systems that can learn, adapt, and improve over time. Unlike rule-based automation, AI automation can handle complex, unstructured tasks.

## Key Benefits

1. **Time Savings** - Automate repetitive tasks and free up your team
2. **Reduced Errors** - AI systems maintain consistent accuracy
3. **Scalability** - Handle increased workload without proportional cost increases
4. **24/7 Operations** - AI systems never sleep

## Getting Started

The first step in implementing AI automation is identifying the right use cases. Look for tasks that are:

- Repetitive and time-consuming
- Rule-based or pattern-based
- High-volume
- Currently prone to human error

## Popular Tools

Here are some tools we recommend for AI automation:

- **Make.com** - Visual workflow automation
- **Zapier** - Connect apps and automate workflows
- **OpenAI API** - Add AI capabilities to your automations
- **n8n** - Self-hosted automation platform

## Conclusion

AI automation is not just a trend—it's the future of business operations. Start small, measure results, and scale what works.
    `,
    author: 'SANZOX Team',
    tags: ['AI', 'Automation'],
    published_at: '2024-01-15',
    readTime: '8 min read',
  },
  'youtube-growth-strategies': {
    title: '10 YouTube Growth Strategies That Actually Work',
    excerpt: 'Discover proven strategies to grow your YouTube channel.',
    content: `
## Introduction

Growing a YouTube channel requires strategy, consistency, and the right techniques. Here are 10 proven strategies that actually work.

## 1. Optimize Your Titles and Thumbnails

Your title and thumbnail are the first things viewers see. Make them compelling and clickable without being misleading.

## 2. Post Consistently

The YouTube algorithm favors channels that post regularly. Find a schedule you can maintain and stick to it.

## 3. Engage With Your Audience

Reply to comments, ask questions, and build a community around your channel.

## 4. Use Analytics

Study your YouTube Analytics to understand what's working and what isn't.

## 5. Collaborate With Others

Cross-promotion through collaborations can expose your channel to new audiences.

## Conclusion

Growth takes time, but with consistent effort and the right strategies, you can build a successful YouTube channel.
    `,
    author: 'SANZOX Team',
    tags: ['YouTube', 'Growth'],
    published_at: '2024-01-10',
    readTime: '6 min read',
  },
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Post Not Found</h1>
            <Button asChild><Link to="/blog">View All Posts</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      <SEOHead 
        title={`${post.title} | Blog | SANZOX`}
        description={post.excerpt}
        type="article"
      />
      {/* Hero */}
      <section className="pt-20 pb-8 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{tag}</span>
              ))}
            </div>
            <h1 className="heading-xl mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {post.author[0]}
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image Placeholder */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">{post.title[0]}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="heading-md mt-12 mb-4 text-foreground">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">{children}</h3>,
                p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">{children}</ol>,
                li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Share this article:</span>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
