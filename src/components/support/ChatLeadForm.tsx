import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type LeadFormData = {
  name: string;
  contact: string;
  service: string;
  deadline: string;
  budget: string;
};

type ChatLeadFormProps = {
  onSubmitSuccess: (data: LeadFormData) => void;
};

const services = [
  { value: 'ai-automation', label: '🤖 AI Automation' },
  { value: 'web-development', label: '🌐 Web Development' },
  { value: 'video-editing', label: '🎬 Video Editing' },
  { value: 'shopify', label: '🛍️ Shopify Solutions' },
  { value: 'youtube', label: '📈 YouTube Automation' },
];

const budgets = [
  { value: 'under-100', label: 'Under $100' },
  { value: '100-500', label: '$100 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-5000', label: '$1,000 - $5,000' },
  { value: '5000+', label: '$5,000+' },
];

const deadlines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-week', label: 'Within 1 week' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: 'flexible', label: 'Flexible' },
];

export function ChatLeadForm({ onSubmitSuccess }: ChatLeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    contact: '',
    service: '',
    deadline: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.contact.trim() || !formData.service) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name.trim(),
        email: formData.contact.includes('@') ? formData.contact.trim() : '',
        message: `Contact: ${formData.contact}\nDeadline: ${formData.deadline || 'Not specified'}`,
        service_interest: formData.service,
        budget_range: formData.budget || null,
        source: 'ai_chatbot',
      });

      if (error) throw error;

      setIsSubmitted(true);
      onSubmitSuccess(formData);
      toast.success('Thanks! We\'ll be in touch soon.');
    } catch (error) {
      console.error('Lead submission error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center"
      >
        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground">Thanks, {formData.name}! 🎉</p>
        <p className="text-xs text-muted-foreground mt-1">
          We'll reach out within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-muted/50 border border-border rounded-xl p-4 space-y-3"
    >
      <div className="text-center mb-3">
        <p className="text-sm font-medium text-foreground">📋 Quick Quote Request</p>
        <p className="text-xs text-muted-foreground">Fill this out and we'll get back to you fast!</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-name" className="text-xs">Name *</Label>
        <Input
          id="lead-name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="h-9 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-contact" className="text-xs">WhatsApp / Email *</Label>
        <Input
          id="lead-contact"
          placeholder="+1234567890 or email@example.com"
          value={formData.contact}
          onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
          className="h-9 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Service Needed *</Label>
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label className="text-xs">Deadline</Label>
          <Select
            value={formData.deadline}
            onValueChange={(value) => setFormData(prev => ({ ...prev, deadline: value }))}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Timeline" />
            </SelectTrigger>
            <SelectContent>
              {deadlines.map((deadline) => (
                <SelectItem key={deadline.value} value={deadline.value}>
                  {deadline.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Budget</Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-9 text-sm gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get Free Quote
          </>
        )}
      </Button>
    </motion.form>
  );
}
