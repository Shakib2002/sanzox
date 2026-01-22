-- Insert sample works entries
INSERT INTO public.works (title, slug, industry, thumbnail, tags, tech_stack, metrics, featured, challenge_md, solution_md, result_md, live_url) VALUES
(
  'AI-Powered Customer Support Bot',
  'ai-customer-support-bot',
  'AI Automation',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  ARRAY['AI', 'Chatbot', 'Automation', 'NLP'],
  ARRAY['OpenAI', 'Python', 'FastAPI', 'React'],
  '[{"label": "Response Time", "value": "-85%"}, {"label": "Customer Satisfaction", "value": "+42%"}]'::jsonb,
  true,
  'Client needed to handle 10,000+ daily support tickets with a small team, leading to long wait times and frustrated customers.',
  'Built an intelligent chatbot using GPT-4 that handles common queries, escalates complex issues, and learns from interactions.',
  'Reduced average response time from 4 hours to 35 minutes while improving CSAT scores by 42%.'
  ,
  'https://example.com/demo'
),
(
  'YouTube Growth Engine',
  'youtube-growth-engine',
  'Youtube Automation',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
  ARRAY['YouTube', 'Analytics', 'Growth', 'SEO'],
  ARRAY['Python', 'YouTube API', 'TensorFlow', 'Next.js'],
  '[{"label": "Subscriber Growth", "value": "+340%"}, {"label": "Views", "value": "2.5M+"}]'::jsonb,
  true,
  'Content creator struggled to grow beyond 5K subscribers despite consistent uploads.',
  'Developed automated thumbnail testing, optimal posting schedule analysis, and AI-powered title optimization.',
  'Channel grew from 5K to 75K subscribers in 8 months with 2.5M+ total views.'
  ,
  NULL
),
(
  'Cinematic Brand Documentary',
  'cinematic-brand-documentary',
  'Video Editing',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
  ARRAY['Documentary', 'Brand Story', 'Cinematography', '4K'],
  ARRAY['DaVinci Resolve', 'After Effects', 'Premiere Pro'],
  '[{"label": "Watch Time", "value": "8.5 min"}, {"label": "Engagement", "value": "+127%"}]'::jsonb,
  false,
  'Luxury brand needed a compelling origin story video to connect with their audience emotionally.',
  'Created a 10-minute documentary featuring founder interviews, behind-the-scenes footage, and stunning visuals.',
  'Video achieved 127% higher engagement than previous content and was featured in industry publications.'
  ,
  'https://vimeo.com/example'
),
(
  'Premium Skincare E-Commerce',
  'premium-skincare-ecommerce',
  'Shopify',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
  ARRAY['E-Commerce', 'Shopify', 'Beauty', 'D2C'],
  ARRAY['Shopify', 'Liquid', 'JavaScript', 'Klaviyo'],
  '[{"label": "Conversion Rate", "value": "+68%"}, {"label": "AOV", "value": "+$45"}]'::jsonb,
  true,
  'Skincare brand had a dated Shopify store with low conversion rates and poor mobile experience.',
  'Redesigned the entire store with luxury aesthetics, optimized checkout flow, and integrated personalized recommendations.',
  'Conversion rate increased by 68% and average order value grew by $45 within the first quarter.'
  ,
  'https://example-skincare.com'
),
(
  'SaaS Analytics Dashboard',
  'saas-analytics-dashboard',
  'Website & Application',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  ARRAY['SaaS', 'Dashboard', 'Analytics', 'B2B'],
  ARRAY['React', 'TypeScript', 'D3.js', 'Supabase'],
  '[{"label": "User Retention", "value": "+56%"}, {"label": "Time on Platform", "value": "+3.2x"}]'::jsonb,
  true,
  'B2B SaaS company had fragmented data across multiple tools, making it hard for users to get insights.',
  'Built a unified analytics dashboard with real-time data visualization, custom reports, and automated alerts.',
  'User retention improved by 56% and average time on platform increased 3.2x.'
  ,
  'https://dashboard-demo.example.com'
),
(
  'Automated Content Pipeline',
  'automated-content-pipeline',
  'AI Automation',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  ARRAY['Content', 'Automation', 'AI', 'Workflow'],
  ARRAY['n8n', 'OpenAI', 'Airtable', 'Zapier'],
  '[{"label": "Content Output", "value": "+400%"}, {"label": "Time Saved", "value": "30hrs/week"}]'::jsonb,
  false,
  'Marketing agency was manually creating and distributing content across 12 platforms, taking 40+ hours weekly.',
  'Built an automated pipeline that generates, optimizes, and schedules content across all platforms from a single brief.',
  'Reduced content production time by 75% while quadrupling output volume.'
  ,
  NULL
);
