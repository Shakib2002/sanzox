import { useEffect, useState } from 'react';
import { Search, Mail, Calendar, Building, DollarSign, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  budget_range: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    (lead.company?.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Messages From Client</h1>
          <p className="text-muted-foreground">Contact form submissions from your website</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Leads Table */}
      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No leads found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Company</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Service</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{lead.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{lead.company || '-'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{lead.service_interest || '-'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <a href={`mailto:${selectedLead.email}`} className="font-medium text-primary hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
              </div>

              {selectedLead.company && (
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building className="w-3 h-3" /> Company
                  </label>
                  <p className="font-medium">{selectedLead.company}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedLead.service_interest && (
                  <div>
                    <label className="text-sm text-muted-foreground">Service Interest</label>
                    <p className="font-medium">{selectedLead.service_interest}</p>
                  </div>
                )}
                {selectedLead.budget_range && (
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Budget
                    </label>
                    <p className="font-medium">{selectedLead.budget_range}</p>
                  </div>
                )}
              </div>

              {selectedLead.message && (
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Message
                  </label>
                  <p className="mt-1 p-3 bg-secondary/50 rounded-lg text-sm whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Submitted
                </label>
                <p className="font-medium">{formatDate(selectedLead.created_at)}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}