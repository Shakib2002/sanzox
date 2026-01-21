import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <Layout>
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="heading-xl mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="heading-md mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using SANZOX's services, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">2. Services</h2>
                <p className="text-muted-foreground">
                  SANZOX provides digital agency services including AI automation, YouTube automation, video editing, 
                  website development, and Shopify development. Specific deliverables and timelines are agreed upon 
                  in individual project agreements.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">3. Payment Terms</h2>
                <p className="text-muted-foreground">
                  Payment terms are specified in individual project agreements. Generally, we require a deposit 
                  before work begins, with the balance due upon completion or according to agreed milestones.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  Upon full payment, clients receive ownership of the final deliverables. SANZOX retains the right 
                  to showcase work in our portfolio unless otherwise agreed in writing.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  SANZOX's liability is limited to the amount paid for the specific service in question. 
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">6. Termination</h2>
                <p className="text-muted-foreground">
                  Either party may terminate a project agreement with written notice. Payment for work 
                  completed up to the termination date is required.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">7. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, contact us at hello@sanzox.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
