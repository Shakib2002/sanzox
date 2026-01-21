import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="heading-xl mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="heading-md mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you fill out a contact form, 
                  request a quote, or communicate with us. This may include your name, email address, company name, 
                  and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to respond to your inquiries, provide our services, 
                  send you marketing communications (with your consent), and improve our website and services.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  information with service providers who assist us in operating our website and conducting our business.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information. However, 
                  no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, correct, or delete your personal information. 
                  Contact us at hello@sanzox.com to exercise these rights.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at hello@sanzox.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
