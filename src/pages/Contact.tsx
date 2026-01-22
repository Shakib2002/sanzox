import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { fadeUpVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import { FAQSection } from '@/components/sections/FAQSection';
import heroContactImage from '@/assets/hero-contact.jpg';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  company: z.string().trim().max(100, 'Company must be less than 100 characters').optional(),
  service_interest: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'youtube-automation', label: 'YouTube Automation' },
  { value: 'video-editing', label: 'Video Editing' },
  { value: 'website-development', label: 'Website Development' },
  { value: 'shopify', label: 'Shopify Development' },
  { value: 'other', label: 'Other' },
];

const budgets = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: 'over-50k', label: 'Over $50,000' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service_interest: '',
      budget_range: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        service_interest: data.service_interest || null,
        budget_range: data.budget_range || null,
        message: data.message,
        source: 'contact_page',
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={heroContactImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="heading-xl mb-6">
              Let's <span className="gradient-text">Start Building</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to transform your business? Get in touch and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div variants={slideInLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-3">
              <GlassCard className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center text-success mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="heading-md mb-2">Thank you!</h3>
                    <p className="text-muted-foreground mb-6">We've received your message and will be in touch soon.</p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="service_interest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map(s => (
                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budget_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select budget" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {budgets.map(b => (
                                    <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us about your project..." rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full btn-glow" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </Form>
                )}
              </GlassCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={slideInRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <a href="mailto:hello.sanzox@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello.sanzox@gmail.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Remote-First Agency<br />
                      Serving clients worldwide
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="bg-gradient-to-br from-primary/20 to-primary/5">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24 hours during business days. For urgent matters, 
                  please indicate in your message.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
    </Layout>
  );
}
