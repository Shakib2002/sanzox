-- Seed Services
INSERT INTO public.services (slug, title, short_desc, icon, highlights, featured, display_order, long_desc_md, process_steps, faqs) VALUES
('ai-automation', 'AI Automation', 'Streamline your operations with intelligent automation solutions that save time and boost efficiency.', 'Bot', ARRAY['Workflow Automation', 'AI Chatbots', 'Process Optimization', 'Data Analytics', 'Custom Integrations', 'Reporting Dashboards'], true, 1, 
'## Transform Your Business with AI

Harness the power of artificial intelligence to automate repetitive tasks, make smarter decisions, and scale your operations efficiently.

### What We Offer

- **Intelligent Workflow Automation**: Automate complex business processes with AI-powered workflows that learn and adapt.
- **Custom AI Chatbots**: Deploy conversational AI that handles customer inquiries 24/7.
- **Predictive Analytics**: Leverage machine learning to forecast trends and make data-driven decisions.
- **Process Mining**: Identify bottlenecks and optimization opportunities in your existing workflows.',
'[{"step": 1, "title": "Discovery", "description": "We analyze your current processes and identify automation opportunities."}, {"step": 2, "title": "Strategy", "description": "We design a custom AI solution tailored to your needs."}, {"step": 3, "title": "Development", "description": "Our team builds and tests your automation solution."}, {"step": 4, "title": "Deployment", "description": "We launch and monitor your AI systems for optimal performance."}]'::jsonb,
'[{"question": "How long does implementation take?", "answer": "Typically 4-8 weeks depending on complexity."}, {"question": "Do I need technical expertise?", "answer": "No, we handle everything and provide training."}]'::jsonb),

('youtube-automation', 'YouTube Automation', 'Scale your YouTube presence with automated content strategies, scheduling, and growth systems.', 'Youtube', ARRAY['Content Strategy', 'Upload Automation', 'Analytics Dashboard', 'Growth Systems', 'SEO Optimization', 'Thumbnail Generation'], true, 2,
'## Grow Your YouTube Channel on Autopilot

Our YouTube automation services help creators and businesses scale their video content without burning out.

### What We Offer

- **Content Calendar Automation**: Never miss an upload with automated scheduling and reminders.
- **AI-Powered SEO**: Optimize titles, descriptions, and tags for maximum visibility.
- **Performance Analytics**: Track what works and double down on winning content.
- **Faceless Channel Systems**: Build profitable YouTube channels without being on camera.',
'[{"step": 1, "title": "Audit", "description": "We analyze your channel performance and growth potential."}, {"step": 2, "title": "Strategy", "description": "We create a content and growth roadmap."}, {"step": 3, "title": "Setup", "description": "We implement automation tools and workflows."}, {"step": 4, "title": "Scale", "description": "We continuously optimize for growth."}]'::jsonb,
'[{"question": "Can you help with faceless channels?", "answer": "Yes, we specialize in automated faceless YouTube channels."}, {"question": "What niches work best?", "answer": "We have experience across education, finance, tech, and entertainment."}]'::jsonb),

('video-editing', 'Video Editing', 'Professional video editing that captivates your audience and tells your brand story.', 'Video', ARRAY['Professional Editing', 'Motion Graphics', 'Color Grading', 'Sound Design', 'Subtitles & Captions', 'Multi-format Export'], true, 3,
'## Cinematic Video Production

Transform raw footage into compelling stories that engage your audience and drive results.

### What We Offer

- **Professional Editing**: Clean cuts, pacing, and storytelling that keeps viewers watching.
- **Motion Graphics**: Eye-catching animations and visual effects.
- **Color Grading**: Cinematic color that matches your brand aesthetic.
- **Sound Design**: Professional audio mixing and music selection.',
'[{"step": 1, "title": "Brief", "description": "Share your vision and raw footage."}, {"step": 2, "title": "Edit", "description": "We craft your story with professional editing."}, {"step": 3, "title": "Review", "description": "Provide feedback on the first cut."}, {"step": 4, "title": "Deliver", "description": "Receive your polished final video."}]'::jsonb,
'[{"question": "What formats do you deliver?", "answer": "We export in any format you need - 4K, 1080p, vertical, square, etc."}, {"question": "How fast is turnaround?", "answer": "Standard turnaround is 3-5 business days."}]'::jsonb),

('website-development', 'Website Development', 'Custom websites built with modern technologies that convert visitors into customers.', 'Globe', ARRAY['Custom Design', 'Responsive Development', 'SEO Optimization', 'Performance', 'CMS Integration', 'Analytics Setup'], true, 4,
'## Modern Web Development

We build fast, beautiful websites that drive conversions and grow your business.

### What We Offer

- **Custom Design**: Unique designs that stand out from templates.
- **Responsive Development**: Perfect experience on all devices.
- **Performance Optimization**: Lightning-fast load times.
- **SEO Foundation**: Built-in search engine optimization.',
'[{"step": 1, "title": "Discovery", "description": "We learn about your business and goals."}, {"step": 2, "title": "Design", "description": "We create mockups and get your approval."}, {"step": 3, "title": "Development", "description": "We build your site with modern technologies."}, {"step": 4, "title": "Launch", "description": "We deploy and provide ongoing support."}]'::jsonb,
'[{"question": "What technologies do you use?", "answer": "React, Next.js, TypeScript, and modern frameworks."}, {"question": "Do you provide hosting?", "answer": "Yes, we offer managed hosting solutions."}]'::jsonb),

('shopify', 'Shopify Development', 'End-to-end Shopify solutions that help you launch and scale your eCommerce business.', 'ShoppingBag', ARRAY['Store Setup', 'Theme Customization', 'App Integration', 'Conversion Optimization', 'Payment Setup', 'Inventory Management'], true, 5,
'## Shopify Expertise

Launch and scale your eCommerce store with our full-service Shopify development.

### What We Offer

- **Store Setup**: Complete store configuration from scratch.
- **Custom Themes**: Unique designs that convert.
- **App Integration**: Connect the tools you need.
- **Conversion Optimization**: Increase sales with proven strategies.',
'[{"step": 1, "title": "Planning", "description": "We map out your store structure and features."}, {"step": 2, "title": "Design", "description": "We customize your theme and branding."}, {"step": 3, "title": "Build", "description": "We set up products, payments, and shipping."}, {"step": 4, "title": "Launch", "description": "We go live and optimize for sales."}]'::jsonb,
'[{"question": "Can you migrate from another platform?", "answer": "Yes, we handle migrations from WooCommerce, Magento, etc."}, {"question": "Do you build custom apps?", "answer": "Yes, we develop custom Shopify apps when needed."}]'::jsonb);

-- Seed Works/Portfolio
INSERT INTO public.works (slug, title, thumbnail, industry, tags, tech_stack, featured, challenge_md, solution_md, result_md, metrics, live_url) VALUES
('ai-customer-support', 'AI Customer Support System', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800', 'SaaS', ARRAY['AI', 'Automation', 'Chatbot'], ARRAY['Python', 'OpenAI', 'React', 'Node.js'], true,
'A fast-growing SaaS company was overwhelmed with customer support tickets. Their team spent 80% of time answering repetitive questions, leaving complex issues unresolved.',
'We built an AI-powered support system that automatically handles common queries, routes complex issues to the right team members, and learns from every interaction.',
'The AI now handles 75% of all support tickets automatically, response time dropped from 4 hours to 2 minutes, and customer satisfaction increased by 40%.',
'[{"label": "Tickets Automated", "value": "75%"}, {"label": "Response Time", "value": "2 min"}, {"label": "CSAT Increase", "value": "+40%"}]'::jsonb,
'https://example.com'),

('youtube-growth-system', 'YouTube Channel Growth System', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800', 'Media', ARRAY['YouTube', 'Automation', 'Content'], ARRAY['n8n', 'Make', 'Airtable', 'AI Tools'], true,
'A content creator wanted to scale from 1 channel to 5 faceless YouTube channels but lacked the time and systems to manage content production.',
'We designed an end-to-end automation system: AI script generation, automated video production, scheduled uploads, and performance analytics dashboard.',
'All 5 channels now produce 20+ videos per week with minimal manual intervention, generating over 10M monthly views combined.',
'[{"label": "Channels", "value": "5"}, {"label": "Videos/Week", "value": "20+"}, {"label": "Monthly Views", "value": "10M+"}]'::jsonb,
'https://example.com'),

('ecommerce-redesign', 'E-Commerce Store Redesign', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'eCommerce', ARRAY['Shopify', 'Design', 'Conversion'], ARRAY['Shopify', 'Liquid', 'JavaScript', 'Figma'], true,
'An established fashion brand had an outdated Shopify store with poor mobile experience and low conversion rates despite strong traffic.',
'We redesigned the entire store with a mobile-first approach, implemented one-click checkout, and optimized the product pages for conversions.',
'Conversion rate increased from 1.2% to 3.8%, mobile revenue grew by 150%, and average order value increased by 25%.',
'[{"label": "Conversion Rate", "value": "3.8%"}, {"label": "Mobile Revenue", "value": "+150%"}, {"label": "AOV Increase", "value": "+25%"}]'::jsonb,
'https://example.com'),

('saas-landing-page', 'SaaS Landing Page', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'SaaS', ARRAY['Web Development', 'Design', 'Conversion'], ARRAY['React', 'TypeScript', 'Tailwind', 'Framer Motion'], false,
'A B2B SaaS startup needed a high-converting landing page to launch their product and attract enterprise customers.',
'We designed and developed a stunning landing page with clear value proposition, social proof, interactive demos, and optimized lead capture forms.',
'The landing page achieved a 12% demo booking rate, well above the 3% industry average, helping them close their first 50 enterprise customers.',
'[{"label": "Demo Booking Rate", "value": "12%"}, {"label": "Enterprise Clients", "value": "50+"}, {"label": "Load Time", "value": "<1s"}]'::jsonb,
'https://example.com'),

('workflow-automation', 'Business Workflow Automation', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'Finance', ARRAY['Automation', 'Integration', 'Workflow'], ARRAY['Zapier', 'Make', 'Airtable', 'Slack'], false,
'A financial services firm was drowning in manual data entry, with employees spending 20+ hours weekly on repetitive tasks.',
'We mapped their entire workflow and built automated pipelines connecting their CRM, accounting software, and communication tools.',
'The automation saves 25+ hours per week, eliminated data entry errors, and freed the team to focus on high-value client work.',
'[{"label": "Hours Saved/Week", "value": "25+"}, {"label": "Error Reduction", "value": "99%"}, {"label": "ROI", "value": "500%"}]'::jsonb,
'https://example.com');

-- Seed Testimonials
INSERT INTO public.testimonials (name, role, company, quote, rating, featured, avatar) VALUES
('Sarah Chen', 'CEO', 'TechFlow Inc', 'SANZOX transformed our customer support with AI automation. We went from 4-hour response times to instant replies. Our customers are happier, and our team can focus on what matters.', 5, true, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
('Marcus Johnson', 'Founder', 'GrowthMedia', 'The YouTube automation system they built is incredible. We scaled from 1 to 5 channels producing 100+ videos per month. Game changer for our content business.', 5, true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
('Emily Rodriguez', 'Marketing Director', 'StyleHouse', 'Our Shopify store redesign resulted in a 3x increase in conversion rate. The team understood our brand and delivered beyond expectations.', 5, true, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'),
('David Park', 'COO', 'FinanceFirst', 'The workflow automation saved us 100+ hours per month. What used to take our team days now happens automatically. Best investment we made.', 5, true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('Lisa Thompson', 'Head of Digital', 'MediaWorks', 'Professional, fast, and incredibly talented. They delivered our website in half the time we expected and it looks absolutely stunning.', 5, false, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150'),
('James Wilson', 'Entrepreneur', 'WilsonVentures', 'I have worked with many agencies but SANZOX is different. They actually understand business outcomes, not just deliverables.', 5, false, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150');

-- Seed Blog Posts
INSERT INTO public.blog_posts (slug, title, excerpt, author, tags, published, published_at, content_md, cover) VALUES
('ai-automation-guide-2024', 'The Complete Guide to AI Automation in 2024', 'Learn how AI automation can transform your business operations and save countless hours of manual work.', 'SANZOX Team', ARRAY['AI', 'Automation', 'Business'], true, NOW() - INTERVAL '5 days',
'## Introduction to AI Automation

Artificial Intelligence is no longer a futuristic concept—it''s here, and it''s transforming how businesses operate. In this comprehensive guide, we''ll explore how you can leverage AI automation to streamline your operations.

### What is AI Automation?

AI automation combines artificial intelligence with process automation to handle tasks that previously required human intervention. Unlike traditional automation that follows rigid rules, AI automation can learn, adapt, and make decisions.

### Key Benefits

1. **Time Savings**: Automate repetitive tasks and free up your team
2. **Cost Reduction**: Lower operational costs by up to 40%
3. **Improved Accuracy**: Eliminate human error in routine processes
4. **Scalability**: Handle increased workload without proportional cost increases

### Getting Started

The first step is identifying processes in your business that are repetitive, time-consuming, and rule-based. These are prime candidates for AI automation.

### Common Use Cases

- Customer support chatbots
- Data entry and processing
- Email management and responses
- Report generation
- Lead qualification

### Conclusion

AI automation is not just for large enterprises. Businesses of all sizes can benefit from implementing intelligent automation solutions.',
'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'),

('youtube-growth-strategies', '10 YouTube Growth Strategies That Actually Work', 'Discover proven strategies to grow your YouTube channel and build a loyal audience in 2024.', 'SANZOX Team', ARRAY['YouTube', 'Growth', 'Content'], true, NOW() - INTERVAL '10 days',
'## Growing Your YouTube Channel in 2024

YouTube remains one of the most powerful platforms for content creators and businesses. Here are 10 strategies that actually work.

### 1. Optimize Your Titles and Thumbnails

Your title and thumbnail are the first things viewers see. Spend 50% of your time on these elements. Use curiosity gaps, numbers, and emotional triggers.

### 2. Master YouTube SEO

Research keywords using tools like VidIQ or TubeBuddy. Include your target keyword in the title, description, and tags.

### 3. Hook Viewers in the First 30 Seconds

The first 30 seconds determine whether viewers stay or leave. Start with a compelling hook that promises value.

### 4. Create Content Series

Playlists and series keep viewers watching longer, improving your session time and algorithmic favor.

### 5. Post Consistently

Consistency beats frequency. It''s better to post once a week reliably than sporadically post multiple times.

### 6. Engage With Your Community

Reply to comments, especially in the first hour after posting. This signals engagement to the algorithm.

### 7. Collaborate With Other Creators

Cross-promotion exposes you to new audiences and builds relationships in your niche.

### 8. Analyze and Iterate

Use YouTube Analytics to understand what works. Double down on successful content types.

### 9. Repurpose Content

Turn long videos into shorts, clips, and social media posts to maximize reach.

### 10. Build Systems

Create templates, workflows, and processes that allow you to produce content efficiently.',
'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800'),

('shopify-conversion-tips', 'Boost Your Shopify Conversion Rate by 50%', 'Practical tips and strategies to optimize your Shopify store and dramatically increase sales.', 'SANZOX Team', ARRAY['Shopify', 'eCommerce', 'Conversion'], true, NOW() - INTERVAL '15 days',
'## Optimizing Your Shopify Store for Conversions

If you''re getting traffic but not sales, your store likely has conversion issues. Here''s how to fix them.

### Understanding Conversion Rate

The average Shopify store converts at 1.4%. Top stores convert at 3-5%. Every 0.1% improvement can mean thousands in additional revenue.

### Quick Wins

1. **Simplify your checkout**: Remove unnecessary form fields
2. **Add trust badges**: SSL, payment icons, money-back guarantee
3. **Speed up your site**: Every second of delay costs 7% in conversions

### Product Page Optimization

Your product page is where decisions happen. Include:
- High-quality images from multiple angles
- Clear, benefit-focused descriptions
- Social proof (reviews, testimonials)
- Urgency elements (stock levels, limited time offers)

### Mobile Experience

Over 70% of traffic is mobile. Test your store on various devices and ensure:
- Fast loading times
- Easy navigation
- Large, tappable buttons
- Streamlined checkout

### Conclusion

Conversion optimization is an ongoing process. Test one change at a time, measure results, and keep iterating.',
'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800');