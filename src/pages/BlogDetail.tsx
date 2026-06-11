import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

// Demo data
const postsData: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  published_at: string;
  readTime: string;
}> = {
  'offline-first-android-apps-guide': {
    title: 'Building Offline-First Android Apps: Room, SQLite, and WorkManager Guide',
    excerpt: 'Learn how to architect high-performance, offline-first native Android applications using Kotlin, Room database, and WorkManager.',
    content: `
## Introduction

In modern mobile app development, building an app that requires a continuous internet connection results in a poor user experience. Whether users are in a subway, a remote region, or experiencing network latency, your application should remain fully responsive and functional. 

An **offline-first architecture** caches data locally and synchronizes changes in the background when connection is restored. In this guide, we'll walk through the process of building an offline-first native Android application using Kotlin, the Room database persistence library, and WorkManager for background sync operations.

---

## 1. Core Principles of Offline-First Architecture

To design a robust offline-first app, you must implement the repository pattern as the single source of truth:

1. **Local Database First:** The UI always queries data from the local database (Room/SQLite), never directly from the network API.
2. **Reactive UI Hydration:** The UI observes the local database using Flow, LiveData, or Compose State. Any update to the DB automatically propagates to the screen.
3. **Background Sync:** Network calls fetch fresh data, write it to the database, and enqueue upload jobs. The UI updates Reactively.

\`\`\`
[Jetpack Compose UI] ──> Observes Flow ──> [Room Local DB]
[Repository] ──> Writes data ──> [Room Local DB]
[Repository] ──> Enqueues Sync ──> [WorkManager] ──> Remote REST API
\`\`\`

---

## 2. Setting Up Room for Local Persistence

The Room library acts as an abstraction layer over SQLite. First, define your entities and data access objects (DAOs).

### Step A: The Entity Definition

\`\`\`kotlin
@Entity(tableName = "projects")
data class ProjectEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val updatedAt: Long,
    val isPendingSync: Boolean = false
)
\`\`\`

### Step B: The DAO Interface

\`\`\`kotlin
@Dao
interface ProjectDao {
    @Query("SELECT * FROM projects ORDER BY updatedAt DESC")
    fun getProjectsFlow(): Flow<List<ProjectEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProjects(projects: List<ProjectEntity>)

    @Query("SELECT * FROM projects WHERE isPendingSync = 1")
    suspend fun getPendingProjects(): List<ProjectEntity>
}
\`\`\`

---

## 3. Scheduling Background Sync with WorkManager

WorkManager is the recommended Android API for deferrable, guaranteed background work. It handles constraint checks (e.g., waiting for an active internet connection or device charging) and manages system battery optimization.

### Step A: Create the Sync Worker

\`\`\`kotlin
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
\`\`\`

### Step B: Enqueueing the Work with Network Constraints

\`\`\`kotlin
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
\`\`\`

---

## Conclusion

Building offline-first Android apps requires shifting from standard network call paradigms to a local database-first methodology. Utilizing **Kotlin Coroutines**, **Room**, and **WorkManager** ensures your app remains lightning fast, network-independent, and optimized for battery consumption.
    `,
    author: 'SANZOX Team',
    tags: ['Android', 'Mobile Development'],
    published_at: '2026-06-01',
    readTime: '10 min read',
  },
  'multi-tenant-saas-architecture': {
    title: 'How to Architect a Multi-Tenant SaaS App with Next.js and Supabase',
    excerpt: 'Discover step-by-step how to design and build a scalable multi-tenant SaaS application with Next.js, Postgres schema partitioning, and Supabase auth.',
    content: `
## Introduction

Software-as-a-Service (SaaS) products must isolate user data while remaining scalable and easy to maintain. The choice of **multi-tenancy architecture** dictates how databases partition client records. 

In this guide, we'll design a modern multi-tenant SaaS architecture using **Next.js** for subdomain routing and **Supabase (PostgreSQL)** for tenant isolation.

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

Row-Level Security allows you to attach access control rules directly to database tables. This acts as a fireproof barrier preventing Tenant A from reading Tenant B's data.

### Step A: Enable RLS on the Table

\`\`\`sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
\`\`\`

### Step B: Create a User Tenant Mapping Table

\`\`\`sql
CREATE TABLE tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'admin', 'member'))
);
\`\`\`

### Step C: Define the Access Policy

\`\`\`sql
CREATE POLICY "Users can only access their tenant's data"
ON public.projects
FOR ALL
USING (
  tenant_id IN (
    SELECT tenant_id 
    FROM public.tenant_members 
    WHERE user_id = auth.uid()
  )
);
\`\`\`

Now, any client query generated by Supabase client libraries (e.g., \`supabase.from('projects').select('*')\`) automatically appends this filter on the database server.

---

## 3. Subdomain and Domain Routing in Next.js

A premium B2B SaaS needs to serve tenants on custom subdomains (e.g., \`client-a.yourdomain.com\`) or dedicated custom domains (e.g., \`app.client-a.com\`). 

Next.js Middleware intercepts incoming requests and rewrites the path based on the host header.

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Exclude assets
  if (url.pathname.startsWith('/_next') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  // Detect subdomains
  const currentHost = hostname.replace('.localhost:3000', '').replace('.sanzox.com', '');
  
  if (currentHost && currentHost !== 'www' && currentHost !== 'app') {
    // Rewrite internal route to dynamic folder structure
    url.pathname = \`/_tenants/\${currentHost}\${url.pathname}\`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
\`\`\`

---

## Conclusion

By combining **Supabase's Row-Level Security (RLS)** with **Next.js Middleware routing**, you get a highly secure, scalable, and cost-efficient B2B SaaS boilerplate. You can onboard new customers instantly with dynamic subdomains and guaranteed database isolation.
    `,
    author: 'SANZOX Team',
    tags: ['SaaS', 'Web Engineering'],
    published_at: '2026-05-25',
    readTime: '9 min read',
  },
  'stripe-saas-subscription-billing': {
    title: 'Stripe Subscription Billing for SaaS: Pitfalls and Best Practices',
    excerpt: 'A complete software engineering guide to implementing Stripe billing, webhook handlers, and coupon systems in B2B SaaS platforms.',
    content: `
## Introduction

A SaaS product is only as good as its billing infrastructure. While Stripe makes payment processing simple, engineering a robust subscription engine with coupon codes, billing portals, webhook handlers, and multi-tier pricing requires careful architectural planning.

In this guide, we'll design a reliable, production-ready Stripe integration workflow for subscription-based B2B platforms.

---

## 1. The Stripe Subscription Lifecycle

A common mistake is updating user subscription states directly in response to API requests. Payments can fail, cards expire, and trials expire asynchronously. You must synchronize your database states solely through **Stripe Webhooks**.

\`\`\`
[Client] ──> Upgrade Plan ──> [SaaS App]
[SaaS App] ──> Create Checkout ──> [Stripe API]
[Stripe API] ──> Redirect to Checkout ──> [Client]
[Client] ──> Complete Payment ──> [Stripe Checkout]
[Stripe Checkout] ──> Webhook: subscription.created ──> [SaaS App Webhook]
[SaaS App Webhook] ──> Update DB ──> [Database]
\`\`\`

---

## 2. Implementing a Secure Stripe Webhook Handler

Webhooks must be protected against tampering and payload spoofing. Stripe provides signature validation to guarantee the event originated from their servers.

\`\`\`typescript
// pages/api/webhooks/stripe.ts
import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
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
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscriptionStatus(subscription);
      break;
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }

  res.json({ received: true });
}
\`\`\`

---

## 3. Best Practices for Stripe Subscriptions

* **Idempotency Keys:** Always pass an idempotency key (e.g. \`uuid\`) when invoking Stripe payment requests to avoid double billing clients during latency spikes.
* **Avoid Storing Card Details:** Never write raw credit card numbers to your local database. Save only the Stripe \`customer_id\`, \`subscription_id\`, and \`price_id\`.
* **Utilize Customer Portal:** Instead of coding custom UI components for card updates, plan cancellations, or receipt history, redirect users to the pre-built **Stripe Customer Portal**. It handles security compliance and updates automatically.

---

## Conclusion

By centering subscription status synchronization around Stripe webhooks, validating signatures, and decoupling card storage, you build a resilient, enterprise-grade billing machine that protects transactions and maintains accurate tenant access states.
    `,
    author: 'SANZOX Team',
    tags: ['SaaS', 'Stripe Integration'],
    published_at: '2026-05-18',
    readTime: '7 min read',
  },
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Post Not Found</h1>
            <Button asChild><Link to="/blog">View All Posts</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      <SEOHead 
        title={`${post.title} | Blog | SANZOX`}
        description={post.excerpt}
        type="article"
      />
      {/* Hero */}
      <section className="pt-20 pb-8 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{tag}</span>
              ))}
            </div>
            <h1 className="heading-xl mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {post.author[0]}
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image Placeholder */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">{post.title[0]}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="heading-md mt-12 mb-4 text-foreground">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">{children}</h3>,
                p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">{children}</ol>,
                li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Share this article:</span>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
