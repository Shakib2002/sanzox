import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Briefcase, MessageSquare, FileText, Users, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  services: number;
  works: number;
  testimonials: number;
  blogPosts: number;
  leads: number;
}

const statCards = [
  { key: 'services', label: 'Services', icon: Settings, href: '/admin/services', color: 'text-blue-400' },
  { key: 'works', label: 'Works', icon: Briefcase, href: '/admin/works', color: 'text-purple-400' },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials', color: 'text-green-400' },
  { key: 'blogPosts', label: 'Blog Posts', icon: FileText, href: '/admin/blog', color: 'text-orange-400' },
  { key: 'leads', label: 'Leads', icon: Users, href: '/admin/leads', color: 'text-pink-400' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    works: 0,
    testimonials: 0,
    blogPosts: 0,
    leads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [services, works, testimonials, blogPosts, leads, recentLeadsData] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('works').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        services: services.count || 0,
        works: works.count || 0,
        testimonials: testimonials.count || 0,
        blogPosts: blogPosts.count || 0,
        leads: leads.count || 0,
      });

      if (recentLeadsData.data) {
        setRecentLeads(recentLeadsData.data);
      }
      
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Link key={card.key} to={card.href}>
            <GlassCard className="hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {loading ? '...' : stats[card.key as keyof Stats]}
              </div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        
        <GlassCard className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No leads yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Service</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-sm">{lead.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{lead.email}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{lead.service_interest || '-'}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}