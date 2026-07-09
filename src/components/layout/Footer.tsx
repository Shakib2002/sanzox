import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook,
  Mail, 
  ArrowUpRight
} from 'lucide-react';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';
import logo from "../../assets/6092db2a-794a-45a3-a93e-8de0007250db.png"

// Custom icons for platforms not in Lucide
const FiverrIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 508.02 508.02"
    width={size}
    height={size}
  >
    <circle cx="315.97" cy="162.19" r="26.87" fill="currentColor" />
    <path 
      d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z"
      fill="currentColor"
    />
  </svg>
);

const tiktokIcon = ({ size = 18 }: { size?: number }) => (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3c.3 2.2 1.6 4 3.5 4.8V11c-1.3 0-2.5-.4-3.5-1.1V16a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a3 3 0 1 0 2 2.8V3h3z" />
          </svg>
        );

const X = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/>
      </svg>
);

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Android Development', href: '/services/android-development' },
    { name: 'SaaS Engineering', href: '/services/saas-engineering' },
    { name: 'AI & LLM Integrations', href: '/services/ai-integrations' },
    { name: 'UI/UX Design Systems', href: '/services/design-systems' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  const { data: settings } = useSiteSettings();
  const s = settings || defaultSiteSettings;

  const socialLinks = [
    { name: 'LinkedIn', href: s.social_linkedin || '#', icon: Linkedin },
    { name: 'Facebook', href: s.social_facebook || '#', icon: Facebook },
    { name: 'Twitter', href: s.social_twitter || '#', icon: X },
    { name: 'Instagram', href: s.social_instagram || '#', icon: Instagram },
    { name: 'YouTube', href: s.social_youtube || '#', icon: Youtube },
    {
      name: 'TikTok',
        href: 'https://www.tiktok.com/@sanzoxofficial',
        icon: tiktokIcon,
      },

  ];

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
            <Link to="/" className="inline-block mb-1">
              <img src={logo} alt={s.site_name} className="h-14 md:h-20 w-auto" />
              {/* {s.logo_url ? (
                
              ) : (
                <span className="font-display text-2xl font-bold gradient-text">{s.site_name}</span>
              )} */}
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {s.footer_description}
            </p>
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
              {s.footer_email && (
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                  <a 
                    href={`mailto:${s.footer_email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.footer_email}
                  </a>
                </li>
              )}
              {/* {s.footer_location && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground whitespace-pre-line">
                    {s.footer_location}
                  </span>
                </li>
              )} */}
            </ul>

            {/* Social Links - Below Contact */}
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <h5 className="text-sm font-medium text-foreground mb-3">Follow Us</h5>
                <div className="flex items-center gap-2 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            )}

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
            © {new Date().getFullYear()} {s.footer_copyright}
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
