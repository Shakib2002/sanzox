-- Update site_settings with the correct Android & SaaS branding
-- (replaces the stale AI-automation content stored in the DB)

UPDATE site_settings
SET value = jsonb_build_object(
  -- Branding
  'site_name',               'SANZOX',
  'tagline',                 'Android & SaaS Product Engineering',
  'logo_url',                NULL,

  -- Hero
  'hero_headline',           'Your Pro Team for',
  'hero_description',        'We specialize in engineering high-performance Android applications, custom SaaS platforms, and cutting-edge AI integrations for high-growth startups.',
  'hero_image_url',          NULL,
  'hero_video_url',          NULL,
  'hero_video_enabled',      false,
  'hero_service_words',      '["Android Apps", "SaaS Platforms", "AI Integrations", "UI/UX Design"]'::jsonb,

  -- Works
  'works_marquee_rows',      3,
  'works_industries',        '["Android App Development", "SaaS Platform Engineering", "AI & LLM Integrations", "UI/UX Design Systems"]'::jsonb,

  -- CTA
  'cta_badge',               'Ready to Build?',
  'cta_headline',            'Let''s start',
  'cta_headline_highlight',  'engineering products',
  'cta_headline_suffix',     'that scale',
  'cta_description',         'Ready to build your next custom software product? Get in touch to discuss your Android app or SaaS project with our engineers.',
  'cta_primary_button_text', 'Request Proposal',
  'cta_primary_button_link', '/contact',
  'cta_secondary_button_text', 'View Projects',
  'cta_secondary_button_link', '/works',
  'cta_trust_indicators',    '["Free Consultation", "No Commitment", "Secure Architecture"]'::jsonb,

  -- Social (preserve empties)
  'social_twitter',          '',
  'social_linkedin',         '',
  'social_instagram',        '',
  'social_youtube',          '',
  'social_facebook',         '',
  'social_fiverr',           '',
  'social_upwork',           '',

  -- Footer
  'footer_description',      'Your pro engineering team for custom Android applications, multi-tenant SaaS platforms, and intelligent AI-integrated software.',
  'footer_email',            'hello.sanzox@gmail.com',
  'footer_location',         E'Remote-First Agency\nServing clients worldwide',
  'footer_copyright',        'SANZOX. All rights reserved.',

  -- SEO
  'seo_title',               'Sanzox - Premium Android & SaaS Development Agency',
  'seo_description',         'Sanzox is a premium software engineering agency specializing in custom Android App Development, scalable SaaS platforms, custom AI integrations, and UI/UX design systems.',
  'seo_keywords',            'Android development, Kotlin app dev, Flutter app development, SaaS platform engineering, SaaS developer, AI chatbot integration, RAG vector database, UI UX design systems, software agency, digital agency',
  'seo_og_image',            NULL
)
WHERE key = 'site_settings';
