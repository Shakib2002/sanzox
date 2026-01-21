import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin,
  ArrowUpRight
} from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Works', href: '/works' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'AI Automation', href: '/services/ai-automation' },
    { name: 'YouTube Automation', href: '/services/youtube-automation' },
    { name: 'Video Editing', href: '/services/video-editing' },
    { name: 'Website Development', href: '/services/website-development' },
    { name: 'Shopify', href: '/services/shopify' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block font-display text-2xl font-bold mb-4">
              <span className="gradient-text">SANZOX</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Your pro team for automation-driven growth. We specialize in AI, YouTube, 
              and digital solutions that transform brands.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                <a 
                  href="mailto:hello@sanzox.com" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@sanzox.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Remote-First Agency<br />
                  Serving clients worldwide
                </span>
              </li>
            </ul>

            {/* CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:underline"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SANZOX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
