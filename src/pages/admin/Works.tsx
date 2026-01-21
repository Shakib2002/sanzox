import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/admin/ImageUpload';

const workSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100),
  slug: z.string().trim().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  industry: z.string().trim().max(50).optional(),
  thumbnail: z.string().optional(),
  live_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string().optional(),
  tech_stack: z.string().optional(),
  featured: z.boolean().optional(),
  challenge_md: z.string().optional(),
  solution_md: z.string().optional(),
  result_md: z.string().optional(),
});

type WorkFormData = z.infer<typeof workSchema>;

interface Work {
  id: string;
  title: string;
  slug: string;
  industry: string | null;
  thumbnail: string | null;
  live_url: string | null;
  tags: string[] | null;
  tech_stack: string[] | null;
  featured: boolean | null;
  challenge_md: string | null;
  solution_md: string | null;
  result_md: string | null;
}

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const { toast } = useToast();

  const form = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    defaultValues: { title: '', slug: '', industry: '', thumbnail: '', live_url: '', tags: '', tech_stack: '', featured: false, challenge_md: '', solution_md: '', result_md: '' },
  });

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setWorks(data);
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingWork(null);
    form.reset({ title: '', slug: '', industry: '', thumbnail: '', live_url: '', tags: '', tech_stack: '', featured: false, challenge_md: '', solution_md: '', result_md: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (work: Work) => {
    setEditingWork(work);
    form.reset({
      title: work.title,
      slug: work.slug,
      industry: work.industry || '',
      thumbnail: work.thumbnail || '',
      live_url: work.live_url || '',
      tags: work.tags?.join(', ') || '',
      tech_stack: work.tech_stack?.join(', ') || '',
      featured: work.featured || false,
      challenge_md: work.challenge_md || '',
      solution_md: work.solution_md || '',
      result_md: work.result_md || '',
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: WorkFormData) => {
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    const tech_stack = data.tech_stack ? data.tech_stack.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const payload = {
      title: data.title,
      slug: data.slug,
      industry: data.industry || null,
      thumbnail: data.thumbnail || null,
      live_url: data.live_url || null,
      tags,
      tech_stack,
      featured: data.featured || false,
      challenge_md: data.challenge_md || null,
      solution_md: data.solution_md || null,
      result_md: data.result_md || null,
    };

    if (editingWork) {
      const { error } = await supabase.from('works').update(payload).eq('id', editingWork.id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Work updated' });
    } else {
      const { error } = await supabase.from('works').insert(payload);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Work created' });
    }

    setDialogOpen(false);
    fetchWorks();
  };

  const deleteWork = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work?')) return;
    const { error } = await supabase.from('works').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Work deleted' });
    fetchWorks();
  };

  const filteredWorks = works.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Works</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Work
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search works..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredWorks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No works found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Industry</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Tags</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Featured</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredWorks.map((work) => (
                  <tr key={work.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {work.thumbnail && (
                          <img src={work.thumbnail} alt="" className="w-10 h-10 rounded object-cover" />
                        )}
                        <span className="text-sm font-medium">{work.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{work.industry || '-'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {work.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-secondary text-xs">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${work.featured ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                        {work.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {work.live_url && (
                          <a href={work.live_url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline"><ExternalLink className="w-3 h-3" /></Button>
                          </a>
                        )}
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(work)}>
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => deleteWork(work.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWork ? 'Edit Work' : 'Add Work'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl><Input placeholder="Project Title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug *</FormLabel>
                    <FormControl><Input placeholder="project-title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl><Input placeholder="SaaS, eCommerce, etc." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="live_url" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="thumbnail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      bucket="works"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="AI, Automation" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tech_stack" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Stack (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="React, Node.js" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="challenge_md" render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge</FormLabel>
                  <FormControl><Textarea placeholder="Describe the challenge..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="solution_md" render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl><Textarea placeholder="Describe the solution..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="result_md" render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl><Textarea placeholder="Describe the results..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="featured" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Featured</FormLabel>
                    <p className="text-sm text-muted-foreground">Show on homepage</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancel</Button>
                <Button type="submit" className="flex-1">{editingWork ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}