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

const UpworkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);
const X = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/>
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
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
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
    { name: 'Twitter', href: s.social_twitter, icon: X },
    { name: 'Instagram', href: s.social_instagram, icon: Instagram },
    { name: 'YouTube', href: s.social_youtube, icon: Youtube },
    { name: 'Fiverr', href: s.social_fiverr, icon: FiverrIcon },
    { name: 'Upwork', href: s.social_upwork, icon: UpworkIcon },
  ] 

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
              Your pro team for automation-driven growth. We specialize in AI automation, YouTube growth, and digital solutions that transform brands.
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
              {s.footer_location && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground whitespace-pre-line">
                    {s.footer_location}
                  </span>
                </li>
              )}
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
