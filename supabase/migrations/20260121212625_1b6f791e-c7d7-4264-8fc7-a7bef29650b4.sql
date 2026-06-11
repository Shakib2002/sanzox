-- Seed Services
INSERT INTO public.services (slug, title, short_desc, icon, highlights, featured, display_order, long_desc_md, process_steps, faqs) VALUES
('android-development', 'Android & Mobile Development', 'High-performance native and cross-platform mobile applications engineered for security, speed, and seamless user experiences.', 'Smartphone', ARRAY['Native Android (Kotlin)', 'Cross-Platform (Flutter)', 'Material Design Systems', 'Offline-First Architecture', 'Firebase/Cloud Integration', 'App Store Publishing'], true, 1, 
'## High-Performance Android & Mobile Applications

Build scalable, secure, and intuitive mobile products with modern frameworks. We specialize in native Kotlin development and cross-platform Flutter solutions.

### What We Offer

- **Native Android Development**: Clean, resource-efficient apps written in Kotlin with Jetpack Compose.
- **Cross-Platform Engineering**: Reach both Android and iOS audiences with a single, highly-optimized Flutter codebase.
- **Offline-First Architectures**: Sync engines and local databases (Room, SQLite, Hive) to ensure your app works seamlessly offline.
- **Store Publishing & Maintenance**: End-to-end management from beta testing in Google Play Console to publishing and updates.',
'[{"step": 1, "title": "Discovery", "description": "We analyze your target audience and map out the user journeys."}, {"step": 2, "title": "Wireframing", "description": "We build high-fidelity interactive wireframes for mobile UI/UX approval."}, {"step": 3, "title": "Engineering", "description": "Our developers write clean, modular Kotlin/Flutter code with complete test coverage."}, {"step": 4, "title": "QA & Release", "description": "We run manual and automated tests on physical devices and publish to Play Store."}]'::jsonb,
'[{"question": "Do you support cross-platform apps?", "answer": "Yes, we specialize in high-performance Flutter applications."}, {"question": "How do you handle background operations?", "answer": "We use Android WorkManager and foreground services for robust background scheduling."}]'::jsonb),

('saas-engineering', 'SaaS Platform Engineering', 'Custom multi-tenant Software-as-a-Service platforms built with scalable backend architectures, stripe billing, and modern dashboards.', 'Globe', ARRAY['Next.js & React Frontends', 'Multi-tenant DB Architectures', 'Stripe Billing & Subscriptions', 'JWT & OAuth Authentication', 'RESTful & GraphQL APIs', 'Cloud Hosting & CI/CD'], true, 2,
'## Custom SaaS Engineering

Launch and scale your business with custom multi-tenant Software-as-a-Service architectures. We handle frontends, backends, databases, and billing integrations.

### What We Offer

- **Multi-Tenant Architectures**: Secure database isolation for tenants via Row-Level Security (RLS) or separate database schematics.
- **Stripe Subscription Engines**: Custom pricing plans, metered billing, customer portals, and automatic webhook synchronization.
- **API Development**: Fast, documented RESTful or GraphQL endpoints built with NestJS, Node.js, or Go.
- **Cloud Infrastructure**: Scalable containerized deployments (Docker, AWS, Vercel, Supabase) with zero-downtime CI/CD pipelines.',
'[{"step": 1, "title": "Database Design", "description": "We model the database schema and security policies."}, {"step": 2, "title": "Backend Engineering", "description": "We write the API core, authorization logic, and Stripe hooks."}, {"step": 3, "title": "Frontend Integration", "description": "We develop the interactive React/Next.js client interface and charts."}, {"step": 4, "title": "Cloud Scale", "description": "We deploy to global cloud servers and configure monitoring tools."}]'::jsonb,
'[{"question": "Can you integrate multiple payment processors?", "answer": "Yes, we support Stripe, PayPal, Paddle, and local gateways."}, {"question": "How is data isolated?", "answer": "We use PostgreSQL RLS or schema-based tenant isolation to ensure complete data security."}]'::jsonb),

('ai-integrations', 'AI & LLM Integrations', 'Supercharge your mobile apps and SaaS products with cutting-edge artificial intelligence, custom chatbots, and vector search capabilities.', 'Bot', ARRAY['OpenAI / Gemini API Integration', 'Retrieval-Augmented Generation (RAG)', 'Vector DBs (Pinecone/pgvector)', 'Conversational Agents', 'Semantic Search Systems', 'Predictive Modeling'], true, 3,
'## AI & LLM Integrations

Make your software smart by integrating large language models, retrieval pipelines, semantic search engines, and automated workflows.

### What We Offer

- **LLM API Integrations**: Customized prompting and API hookups for OpenAI GPT-4, Google Gemini, and Anthropic Claude.
- **RAG Systems**: Feed your proprietary documentation to LLMs securely using embeddings and vector search databases.
- **Conversational Agents**: Advanced customer support bots that can call API functions and take action.
- **Vector Search Engine**: Set up pgvector or Pinecone for high-dimensional semantic search engines.',
'[{"step": 1, "title": "Use Case Analysis", "description": "We identify which AI features will bring the most value to your platform."}, {"step": 2, "title": "Prompt Engineering", "description": "We design and test prompts, system logs, and agent structures."}, {"step": 3, "title": "Integration", "description": "We write vector embedding scripts and database connection endpoints."}, {"step": 4, "title": "Evaluation", "description": "We test agent accuracy and configure rate limiters to optimize API costs."}]'::jsonb,
'[{"question": "Do you support local LLMs?", "answer": "Yes, we can deploy open-source models like Llama or Mistral on your cloud servers."}, {"question": "How do you protect private data?", "answer": "We filter private data and ensure LLMs do not use your proprietary documents for training."}]'::jsonb),

('design-systems', 'UI/UX Design Systems', 'Interactive high-fidelity design prototypes, comprehensive design tokens, and state-of-the-art interactive component libraries.', 'Layers', ARRAY['Figma Design Systems', 'Interactive Prototyping', 'Responsive UI Layouts', 'Micro-interactions & Motion', 'Brand Identity Assets', 'Accessibility (A11y)'], true, 4,
'## UI/UX Design Systems

We craft custom Figma design systems, interactive prototypes, and reusable UI components that make your SaaS and mobile products feel premium.

### What We Offer

- **Figma Design Systems**: Comprehensive typography, color palettes, and component states designed for easy developer handoff.
- **High-Fidelity Prototyping**: Interactive clickable clickthroughs to simulate user journeys before writing code.
- **Micro-interactions**: Subtle hover states, loading transitions, and page animations that wow users.
- **Accessibility Compliance**: Ensuring contrast ratios, keyboard accessibility, and screen reader compatibility.',
'[{"step": 1, "title": "Research", "description": "We analyze your brand guidelines and competitor designs."}, {"step": 2, "title": "UX Wireframing", "description": "We map out user flows and structure information layouts."}, {"step": 3, "title": "UI Design", "description": "We apply typography, colors, and gradients to wireframes."}, {"step": 4, "title": "Design System Handoff", "description": "We document Figma variables and compile react tokens."}]'::jsonb,
'[{"question": "Do you provide Figma files?", "answer": "Yes, you receive complete access to the raw Figma files and variables."}, {"question": "Are designs mobile-responsive?", "answer": "Absolutely. All layouts are designed for mobile, tablet, and desktop views."}]'::jsonb);

-- Seed Works/Portfolio
INSERT INTO public.works (slug, title, thumbnail, industry, tags, tech_stack, featured, challenge_md, solution_md, result_md, metrics, live_url) VALUES
('ai-customer-support', 'AI Customer Support System', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800', 'AI & LLM Integrations', ARRAY['AI', 'Automation', 'Chatbot'], ARRAY['Python', 'OpenAI', 'React', 'Node.js'], true,
'A fast-growing SaaS company was overwhelmed with customer support tickets. Their team spent 80% of time answering repetitive questions, leaving complex issues unresolved.',
'We built an AI-powered support system that automatically handles common queries, routes complex issues to the right team members, and learns from every interaction.',
'The AI now handles 75% of all support tickets automatically, response time dropped from 4 hours to 2 minutes, and customer satisfaction increased by 40%.',
'[{"label": "Tickets Automated", "value": "75%"}, {"label": "Response Time", "value": "2 min"}, {"label": "CSAT Increase", "value": "+40%"}]'::jsonb,
'https://example.com'),

('logistics-offline-app', 'Offline-First Logistics App', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 'Android App Development', ARRAY['Android', 'Kotlin', 'Room', 'Offline-First'], ARRAY['Kotlin', 'Jetpack Compose', 'Room', 'WorkManager', 'Supabase'], true,
'Logistics company drivers struggled to update shipment statuses in rural regions with unstable mobile networks, leading to delayed tracking updates.',
'Built a native Android app with an offline-first SQLite database using Room. Enqueued background status updates via WorkManager when connection is restored.',
'Eliminated status sync drop-offs, reduced local database sync latency by 95%, and saved driver device battery consumption by 30%.',
'[{"label": "Sync Latency", "value": "-95%"}, {"label": "Battery Optimization", "value": "+30%"}, {"label": "ROI", "value": "500%"}]'::jsonb,
'https://example.com'),

('native-android-ecommerce', 'Native Android E-Commerce App', 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800', 'Android App Development', ARRAY['E-Commerce', 'Android', 'Kotlin', 'Material Design'], ARRAY['Kotlin', 'Jetpack Compose', 'Google Pay', 'Firebase'], true,
'Retail brand experienced extremely high checkout abandonment rates on mobile browsers.',
'Built a native Android e-commerce application using Jetpack Compose with Google Pay integration for one-tap checkout.',
'Increased mobile conversions by 48% and achieved a 4.8-star rating on the Google Play Store.',
'[{"label": "Mobile Conversions", "value": "+48%"}, {"label": "App Store Rating", "value": "4.8"}, {"label": "AOV Increase", "value": "+25%"}]'::jsonb,
'https://example.com'),

('saas-landing-page', 'SaaS Landing Page', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'SaaS Platform Engineering', ARRAY['Web Development', 'Design', 'Conversion'], ARRAY['React', 'TypeScript', 'Tailwind', 'Framer Motion'], false,
'A B2B SaaS startup needed a high-converting landing page to launch their product and attract enterprise customers.',
'We designed and developed a stunning landing page with clear value proposition, social proof, interactive demos, and optimized lead capture forms.',
'The landing page achieved a 12% demo booking rate, well above the 3% industry average, helping them close their first 50 enterprise customers.',
'[{"label": "Demo Booking Rate", "value": "12%"}, {"label": "Enterprise Clients", "value": "50+"}, {"label": "Load Time", "value": "<1s"}]'::jsonb,
'https://example.com'),

('ai-saas-document-search', 'AI-Integrated SaaS Document Search', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', 'AI & LLM Integrations', ARRAY['AI', 'SaaS', 'RAG', 'Vector Search'], ARRAY['Next.js', 'OpenAI API', 'Pgvector', 'Supabase'], false,
'Legal firm took hours querying unstructured documents and case files for exact clauses.',
'Engineered a semantic RAG (Retrieval-Augmented Generation) document search tool using OpenAI embeddings and pgvector storage.',
'Increased search precision by 92% and reduced query lookup latency to under 200ms.',
'[{"label": "Search Precision", "value": "92%"}, {"label": "Query Latency", "value": "<200ms"}, {"label": "ROI", "value": "500%"}]'::jsonb,
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
('offline-first-android-apps-guide', 'Building Offline-First Android Apps: Room, SQLite, and WorkManager Guide', 'Learn how to architect high-performance, offline-first native Android applications using Kotlin, Room database, and WorkManager.', 'SANZOX Team', ARRAY['Android', 'Mobile Development'], true, NOW() - INTERVAL '5 days',
'## Introduction

In modern mobile app development, building an app that requires a continuous internet connection results in a poor user experience. Whether users are in a subway, a remote region, or experiencing network latency, your application should remain fully responsive and functional. 

An **offline-first architecture** caches data locally and synchronizes changes in the background when connection is restored. In this guide, we''ll walk through the process of building an offline-first native Android application using Kotlin, the Room database persistence library, and WorkManager for background sync operations.

---

## 1. Core Principles of Offline-First Architecture

To design a robust offline-first app, you must implement the repository pattern as the single source of truth:

1. **Local Database First:** The UI always queries data from the local database (Room/SQLite), never directly from the network API.
2. **Reactive UI Hydration:** The UI observes the local database using Flow, LiveData, or Compose State. Any update to the DB automatically propagates to the screen.
3. **Background Sync:** Network calls fetch fresh data, write it to the database, and enqueue upload jobs. The UI updates Reactively.

```
[Jetpack Compose UI] ──> Observes Flow ──> [Room Local DB]
[Repository] ──> Writes data ──> [Room Local DB]
[Repository] ──> Enqueues Sync ──> [WorkManager] ──> Remote REST API
```

---

## 2. Setting Up Room for Local Persistence

The Room library acts as an abstraction layer over SQLite. First, define your entities and data access objects (DAOs).

### Step A: The Entity Definition

```kotlin
@Entity(tableName = "projects")
data class ProjectEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val updatedAt: Long,
    val isPendingSync: Boolean = false
)
```

### Step B: The DAO Interface

```kotlin
@Dao
interface ProjectDao {
    @Query("SELECT * FROM projects ORDER BY updatedAt DESC")
    fun getProjectsFlow(): Flow<List<ProjectEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProjects(projects: List<ProjectEntity>)

    @Query("SELECT * FROM projects WHERE isPendingSync = 1")
    suspend fun getPendingProjects(): List<ProjectEntity>
}
```

---

## 3. Scheduling Background Sync with WorkManager

WorkManager is the recommended Android API for deferrable, guaranteed background work. It handles constraint checks (e.g., waiting for an active internet connection or device charging) and manages system battery optimization.

### Step A: Create the Sync Worker

```kotlin
class DataSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val database = AppDatabase.getInstance(applicationContext)
        val apiService = RetrofitClient.apiService
        
        try {
            // Retrieve data pending upload
            val pendingData = database.projectDao().getPendingProjects()
            for (project in pendingData) {
                apiService.uploadProject(project.toNetworkModel())
                database.projectDao().insertProjects(
                    listOf(project.copy(isPendingSync = false))
                )
            }
            Result.success()
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
```

### Step B: Enqueueing the Work with Network Constraints

```kotlin
val constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.CONNECTED)
    .setRequiresBatteryNotLow(true)
    .build()

val syncRequest = OneTimeWorkRequestBuilder<DataSyncWorker>()
    .setConstraints(constraints)
    .setBackoffCriteria(
        BackoffPolicy.EXPONENTIAL,
        WorkRequest.MIN_BACKOFF_MILLIS,
        TimeUnit.MILLISECONDS
    )
    .build()

WorkManager.getInstance(context).enqueueUniqueWork(
    "unique_data_sync",
    ExistingWorkPolicy.REPLACE,
    syncRequest
)
```

---

## Conclusion

Building offline-first Android apps requires shifting from standard network call paradigms to a local database-first methodology. Utilizing **Kotlin Coroutines**, **Room**, and **WorkManager** ensures your app remains lightning fast, network-independent, and optimized for battery consumption.',
'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800'),

('multi-tenant-saas-architecture', 'How to Architect a Multi-Tenant SaaS App with Next.js and Supabase', 'Discover step-by-step how to design and build a scalable multi-tenant SaaS application with Next.js, Postgres schema partitioning, and Supabase auth.', 'SANZOX Team', ARRAY['SaaS', 'Web Engineering'], true, NOW() - INTERVAL '10 days',
'## Introduction

Software-as-a-Service (SaaS) products must isolate user data while remaining scalable and easy to maintain. The choice of **multi-tenancy architecture** dictates how databases partition client records. 

In this guide, we''ll design a modern multi-tenant SaaS architecture using **Next.js** for subdomain routing and **Supabase (PostgreSQL)** for tenant isolation.

---

## 1. Database Tenant Isolation Models

There are three primary models to partition tenant data in PostgreSQL:

| Model | Description | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Database-Per-Tenant** | Each client gets a dedicated database server. | Maximum security | High hosting cost, hard schema updates. |
| **Schema-Per-Tenant** | One database with separate namespaces (schemas) per tenant. | Clean separation | Difficult to run cross-tenant queries. |
| **Shared Database (Row-Level Security)** | Single schema; every table has a \`tenant_id\` column. | Lowest cost, easy schema updates | Risks data leaks if security rules fail. |

For most startups, **Shared Database with Supabase Row-Level Security (RLS)** offers the best ROI, scaling to millions of records with near-zero overhead.

---

## 2. Implementing Row-Level Security in Supabase

Row-Level Security allows you to attach access control rules directly to database tables. This acts as a fireproof barrier preventing Tenant A from reading Tenant B''s data.

### Step A: Enable RLS on the Table

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

### Step B: Create a User Tenant Mapping Table

```sql
CREATE TABLE tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN (''owner'', ''admin'', ''member''))
);
```

### Step C: Define the Access Policy

```sql
CREATE POLICY "Users can only access their tenant''s data"
ON public.projects
FOR ALL
USING (
  tenant_id IN (
    SELECT tenant_id 
    FROM public.tenant_members 
    WHERE user_id = auth.uid()
  )
);
```

Now, any client query generated by Supabase client libraries (e.g., \`supabase.from(''projects'').select(''*'')\`) automatically appends this filter on the database server.

---

## 3. Subdomain and Domain Routing in Next.js

A premium B2B SaaS needs to serve tenants on custom subdomains (e.g., \`client-a.yourdomain.com\`) or dedicated custom domains (e.g., \`app.client-a.com\`). 

Next.js Middleware intercepts incoming requests and rewrites the path based on the host header.

```typescript
// middleware.ts
import { NextResponse } from ''next/server'';
import type { NextRequest } from ''next/server'';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get(''host'') || '''';

  // Exclude assets
  if (url.pathname.startsWith(''/_next'') || url.pathname.includes(''.'')) {
    return NextResponse.next();
  }

  // Detect subdomains
  const currentHost = hostname.replace(''.localhost:3000'', '''').replace(''.sanzox.com'', '''');
  
  if (currentHost && currentHost !== ''www'' && currentHost !== ''app'') {
    // Rewrite internal route to dynamic folder structure
    url.pathname = \`/_tenants/\${currentHost}\${url.pathname}\`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
```

---

## Conclusion

By combining **Supabase''s Row-Level Security (RLS)** with **Next.js Middleware routing**, you get a highly secure, scalable, and cost-efficient B2B SaaS boilerplate. You can onboard new customers instantly with dynamic subdomains and guaranteed database isolation.',
'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'),

('stripe-saas-subscription-billing', 'Stripe Subscription Billing for SaaS: Pitfalls and Best Practices', 'A complete software engineering guide to implementing Stripe billing, webhook handlers, and coupon systems in B2B SaaS platforms.', 'SANZOX Team', ARRAY['SaaS', 'Stripe Integration'], true, NOW() - INTERVAL '15 days',
'## Introduction

A SaaS product is only as good as its billing infrastructure. While Stripe makes payment processing simple, engineering a robust subscription engine with coupon codes, billing portals, webhook handlers, and multi-tier pricing requires careful architectural planning.

In this guide, we''ll design a reliable, production-ready Stripe integration workflow for subscription-based B2B platforms.

---

## 1. The Stripe Subscription Lifecycle

A common mistake is updating user subscription states directly in response to API requests. Payments can fail, cards expire, and trials expire asynchronously. You must synchronize your database states solely through **Stripe Webhooks**.

```
[Client] ──> Upgrade Plan ──> [SaaS App]
[SaaS App] ──> Create Checkout ──> [Stripe API]
[Stripe API] ──> Redirect to Checkout ──> [Client]
[Client] ──> Complete Payment ──> [Stripe Checkout]
[Stripe Checkout] ──> Webhook: subscription.created ──> [SaaS App Webhook]
[SaaS App Webhook] ──> Update DB ──> [Database]
```

---

## 2. Implementing a Secure Stripe Webhook Handler

Webhooks must be protected against tampering and payload spoofing. Stripe provides signature validation to guarantee the event originated from their servers.

```typescript
// pages/api/webhooks/stripe.ts
import { buffer } from ''micro'';
import Stripe from ''stripe'';
import { supabaseAdmin } from ''@/lib/supabaseAdmin'';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: ''2023-10-16'',
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: any, res: any) {
  if (req.method !== ''POST'') return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers[''stripe-signature'']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Handle billing events
  switch (event.type) {
    case ''customer.subscription.updated'':
    case ''customer.subscription.deleted'':
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscriptionStatus(subscription);
      break;
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }

  res.json({ received: true });
}
```

---

## 3. Best Practices for Stripe Subscriptions

* **Idempotency Keys:** Always pass an idempotency key (e.g. \`uuid\`) when invoking Stripe payment requests to avoid double billing clients during latency spikes.
* **Avoid Storing Card Details:** Never write raw credit card numbers to your local database. Save only the Stripe \`customer_id\`, \`subscription_id\`, and \`price_id\`.
* **Utilize Customer Portal:** Instead of coding custom UI components for card updates, plan cancellations, or receipt history, redirect users to the pre-built **Stripe Customer Portal**. It handles security compliance and updates automatically.

---

## Conclusion

By centering subscription status synchronization around Stripe webhooks, validating signatures, and decoupling card storage, you build a resilient, enterprise-grade billing machine that protects transactions and maintains accurate tenant access states.',
'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800');