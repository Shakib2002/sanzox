import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface HeroSettings {
  video_enabled: boolean;
  video_url: string | null;
  image_url: string | null;
}

const defaultSettings: HeroSettings = {
  video_enabled: false,
  video_url: null,
  image_url: null,
};

export function useHeroSettings() {
  return useQuery({
    queryKey: ['hero-settings'],
    queryFn: async (): Promise<HeroSettings> => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'hero_settings')
        .maybeSingle();

      if (error) {
        console.error('Error fetching hero settings:', error);
        return defaultSettings;
      }

      if (!data) {
        return defaultSettings;
      }

      return {
        ...defaultSettings,
        ...(data.value as Partial<HeroSettings>),
      };
    },
  });
}

export function useUpdateHeroSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: HeroSettings) => {
      // Check if settings exist
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'hero_settings')
        .maybeSingle();

      const jsonValue = JSON.parse(JSON.stringify(settings));

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: jsonValue })
          .eq('key', 'hero_settings');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([{ key: 'hero_settings', value: jsonValue }]);

        if (error) throw error;
      }

      return settings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-settings'] });
    },
  });
}
