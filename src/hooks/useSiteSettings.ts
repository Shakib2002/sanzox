import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  // Branding
  logo_url: string | null;
  site_name: string;
  tagline: string;
  
  // Hero Section
  hero_headline: string;
  hero_description: string;
  hero_image_url: string | null;
  hero_video_enabled: boolean;
  hero_video_url: string | null;
  hero_service_words: string[];
  
  // Works Section
  works_marquee_rows: 2 | 3;
  
  // Social Links
  social_twitter: string;
  social_linkedin: string;
  social_instagram: string;
  social_youtube: string;
  social_facebook: string;
  social_fiverr: string;
  social_upwork: string;
  
  // Footer
  footer_description: string;
  footer_email: string;
  footer_location: string;
  footer_copyright: string;
  
  // SEO
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_og_image: string | null;
}

export const defaultSiteSettings: SiteSettings = {
  // Branding
  logo_url: null,
  site_name: 'SANZOX',
  tagline: 'AI-Powered Digital Agency',
  
  // Hero Section
  hero_headline: 'Your Pro Team for',
  hero_description: 'We specialize in AI Automation, YouTube Automation, Video Editing, Website Development, and Shopify solutions that transform your brand.',
  hero_image_url: null,
  hero_video_enabled: false,
  hero_video_url: null,
  hero_service_words: ['AI Automation', 'Web Development', 'Video Editing', 'Shopify Solutions'],
  
  // Works Section
  works_marquee_rows: 3,
  
  // Social Links
  social_twitter: '',
  social_linkedin: '',
  social_instagram: '',
  social_youtube: '',
  social_facebook: '',
  social_fiverr: '',
  social_upwork: '',
  
  // Footer
  footer_description: 'Your pro team for automation-driven growth. We specialize in AI, YouTube, and digital solutions that transform brands.',
  footer_email: 'hello@sanzox.com',
  footer_location: 'Remote-First Agency\nServing clients worldwide',
  footer_copyright: 'SANZOX. All rights reserved.',
  
  // SEO
  seo_title: 'SANZOX | AI-Powered Digital Agency',
  seo_description: 'We specialize in AI Automation, YouTube Automation, Video Editing, Website Development, and Shopify solutions that transform your brand.',
  seo_keywords: 'AI automation, digital agency, web development, video editing, YouTube automation, Shopify',
  seo_og_image: null,
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'site_settings')
        .maybeSingle();

      if (error) {
        console.error('Error fetching site settings:', error);
        return defaultSiteSettings;
      }

      if (!data) {
        return defaultSiteSettings;
      }

      return {
        ...defaultSiteSettings,
        ...(data.value as Partial<SiteSettings>),
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      // Get current settings
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id, value')
        .eq('key', 'site_settings')
        .maybeSingle();

      const currentSettings = existing?.value as Partial<SiteSettings> || {};
      const mergedSettings = { ...currentSettings, ...settings };
      const jsonValue = JSON.parse(JSON.stringify(mergedSettings));

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: jsonValue })
          .eq('key', 'site_settings');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([{ key: 'site_settings', value: jsonValue }]);

        if (error) throw error;
      }

      return mergedSettings as SiteSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    },
  });
}
