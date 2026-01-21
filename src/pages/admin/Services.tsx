import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, GripVertical } from 'lucide-react';
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

const serviceSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100),
  slug: z.string().trim().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  short_desc: z.string().trim().min(1, 'Description is required').max(500),
  icon: z.string().trim().max(50).optional(),
  featured: z.boolean().optional(),
  highlights: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface Service {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  icon: string | null;
  featured: boolean | null;
  highlights: string[] | null;
  display_order: number | null;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { title: '', slug: '', short_desc: '', icon: '', featured: false, highlights: '' },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) setServices(data);
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingService(null);
    form.reset({ title: '', slug: '', short_desc: '', icon: '', featured: false, highlights: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    form.reset({
      title: service.title,
      slug: service.slug,
      short_desc: service.short_desc,
      icon: service.icon || '',
      featured: service.featured || false,
      highlights: service.highlights?.join(', ') || '',
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: ServiceFormData) => {
    const highlights = data.highlights
      ? data.highlights.split(',').map((h) => h.trim()).filter(Boolean)
      : [];

    const payload = {
      title: data.title,
      slug: data.slug,
      short_desc: data.short_desc,
      icon: data.icon || null,
      featured: data.featured || false,
      highlights,
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', editingService.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Service updated' });
    } else {
      const { error } = await supabase.from('services').insert(payload);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Service created' });
    }

    setDialogOpen(false);
    fetchServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Service deleted' });
    fetchServices();
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredServices.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No services found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Slug</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Icon</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Featured</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{service.title}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{service.slug}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{service.icon || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${service.featured ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                        {service.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(service)}>
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => deleteService(service.id)}>
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl><Input placeholder="AI Automation" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug *</FormLabel>
                  <FormControl><Input placeholder="ai-automation" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="short_desc" render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl><Textarea placeholder="Brief description..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="icon" render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (Lucide icon name)</FormLabel>
                  <FormControl><Input placeholder="Bot" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="highlights" render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlights (comma-separated)</FormLabel>
                  <FormControl><Input placeholder="Feature 1, Feature 2, Feature 3" {...field} /></FormControl>
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
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingService ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}