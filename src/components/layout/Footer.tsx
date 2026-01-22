import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook,
  Mail, 
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';

// Custom icons for platforms not in Lucide
const FiverrIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.004 15.588a.995.995 0 1 0-.002-1.99.995.995 0 0 0 .002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h1.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.878-.478l1.346.617c-.41.858-1.258 1.32-2.225 1.32-1.724 0-2.66-1.178-2.66-2.563 0-1.39.936-2.563 2.537-2.563 1.527 0 2.537 1.106 2.537 2.563 0 .088-.015.175-.015.263l-.045-.017zm-1.582-.82c-.088-.5-.404-.832-.957-.832-.547 0-.87.304-.957.832h1.914zm-3.95-2.137h1.597v4.862h-1.596v-4.862zm.802-2.282a.986.986 0 1 1-.002 1.971.986.986 0 0 1 .002-1.971zM6.08 13.67l1.56-.615c.15.41.463.62.85.62.34 0 .55-.135.55-.347 0-.38-.615-.41-.992-.497-1.068-.264-1.752-.673-1.752-1.602 0-.922.79-1.656 2.02-1.656 1.073 0 1.752.468 2.05 1.19l-1.498.54c-.107-.322-.37-.483-.69-.483-.254 0-.42.117-.42.322 0 .33.566.38.942.468 1.09.264 1.8.644 1.8 1.602 0 .995-.877 1.64-2.195 1.64-1.14 0-1.965-.468-2.225-1.18z"/>
  </svg>
);

const UpworkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

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

export function Footer() {
  const { data: settings } = useSiteSettings();
  const s = settings || defaultSiteSettings;

  const socialLinks = [
    { name: 'LinkedIn', href: s.social_linkedin, icon: Linkedin },
    { name: 'Facebook', href: s.social_facebook, icon: Facebook },
    { name: 'Twitter', href: s.social_twitter, icon: Twitter },
    { name: 'Instagram', href: s.social_instagram, icon: Instagram },
    { name: 'YouTube', href: s.social_youtube, icon: Youtube },
    { name: 'Fiverr', href: s.social_fiverr, icon: FiverrIcon },
    { name: 'Upwork', href: s.social_upwork, icon: UpworkIcon },
  ].filter(link => link.href); // Only show links that have URLs

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
            <Link to="/" className="inline-block mb-4">
              {s.logo_url ? (
                <img src={s.logo_url} alt={s.site_name} className="h-8 w-auto" />
              ) : (
                <span className="font-display text-2xl font-bold gradient-text">{s.site_name}</span>
              )}
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {s.footer_description}
            </p>
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            )}
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
              {s.footer_location && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground whitespace-pre-line">
                    {s.footer_location}
                  </span>
                </li>
              )}
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
