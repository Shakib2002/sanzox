INSERT INTO public.services (
  slug,
  title,
  short_desc,
  long_desc_md,
  icon,
  highlights,
  process_steps,
  faqs,
  featured,
  display_order
)
VALUES (
  'ecommerce-solutions',
  'E-commerce Solutions',
  'Conversion-focused online stores and custom commerce experiences built to make selling simpler and more scalable.',
  '## E-commerce Solutions

We build and improve online stores that make it easy for customers to find products, check out securely, and come back to shop again.

### What We Offer

- **Shopify Development**: Custom Shopify stores, themes, and integrations tailored to your business.
- **Custom Storefronts**: Fast, responsive storefronts designed around your products and customer journey.
- **Checkout & Payments**: Secure payment integrations and a smoother checkout experience.
- **Store Operations**: Connected inventory, order management, and fulfillment workflows.
- **Store Optimization**: Performance, mobile usability, and SEO improvements to support growth.',
  'Store',
  ARRAY[
    'Shopify Store Development',
    'Custom Storefronts',
    'Store Redesign & Migration',
    'Payment & Checkout Integration',
    'Inventory & Order Management',
    'Performance & SEO Optimization'
  ],
  '[
    {"step": 1, "title": "Store Strategy", "description": "Understand your products, customers, operations, and growth goals."},
    {"step": 2, "title": "Experience Design", "description": "Plan intuitive product discovery, storefront layouts, and checkout flows."},
    {"step": 3, "title": "Commerce Build", "description": "Build or improve the store and connect payments, inventory, and fulfillment."},
    {"step": 4, "title": "Launch & Optimize", "description": "Test the full buying journey, launch the store, and refine performance."}
  ]'::jsonb,
  '[
    {"question": "Can you build a store on Shopify?", "answer": "Yes. We create and customize Shopify storefronts, themes, integrations, and store workflows to fit your business."},
    {"question": "Can you improve or migrate an existing store?", "answer": "Yes. We can redesign an existing storefront or help move your catalog and shopping experience to a more suitable platform."},
    {"question": "Can you integrate payment and order systems?", "answer": "We connect checkout and payment providers with the store, and can streamline inventory and order workflows."}
  ]'::jsonb,
  true,
  5
)
ON CONFLICT (slug) DO NOTHING;
