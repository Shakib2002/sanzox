import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured: boolean | null;
  video_preview: string | null;
  metrics: { label: string; value: string }[] | null;
  challenge_md: string | null;
  solution_md: string | null;
  result_md: string | null;
  gallery: string[];
  tech_stack: string[];
  live_url: string | null;
  created_at: string;
}

export function useWorks(options?: { featured?: boolean; limit?: number; industry?: string }) {
  return useQuery({
    queryKey: ['works', options],
    queryFn: async () => {
      let query = supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.featured) {
        query = query.eq('featured', true);
      }

      if (options?.industry && options.industry !== 'All') {
        query = query.eq('industry', options.industry);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform the data to ensure proper typing
      return (data || []).map((work) => ({
        ...work,
        tags: work.tags || [],
        gallery: work.gallery || [],
        tech_stack: work.tech_stack || [],
        metrics: Array.isArray(work.metrics) 
          ? (work.metrics as { label: string; value: string }[]) 
          : null,
      })) as Work[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useWork(slug: string) {
  return useQuery({
    queryKey: ['work', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        throw error;
      }

      return {
        ...data,
        tags: data.tags || [],
        gallery: data.gallery || [],
        tech_stack: data.tech_stack || [],
        metrics: Array.isArray(data.metrics) 
          ? (data.metrics as { label: string; value: string }[]) 
          : null,
      } as Work;
    },
    enabled: !!slug,
  });

  console.log({ works, isLoading, error });
}
