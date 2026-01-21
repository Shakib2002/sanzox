import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEOHead({ title, description, image, type = 'website' }: SEOHeadProps) {
  const location = useLocation();
  const { data: settings } = useSiteSettings();
  const s = settings || defaultSiteSettings;

  const finalTitle = title || s.seo_title;
  const finalDescription = description || s.seo_description;
  const finalImage = image || s.seo_og_image;
  const siteUrl = window.location.origin;
  const currentUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      if (!content) return;
      
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMeta('description', finalDescription);
    updateMeta('keywords', s.seo_keywords);
    
    // Open Graph tags
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', currentUrl, true);
    updateMeta('og:site_name', s.site_name, true);
    
    if (finalImage) {
      updateMeta('og:image', finalImage, true);
      updateMeta('og:image:width', '1200', true);
      updateMeta('og:image:height', '630', true);
    }

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);
    
    if (finalImage) {
      updateMeta('twitter:image', finalImage);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

  }, [finalTitle, finalDescription, finalImage, s.seo_keywords, s.site_name, currentUrl, type]);

  return null;
}
