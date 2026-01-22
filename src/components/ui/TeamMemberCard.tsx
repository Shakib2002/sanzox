import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: SocialLinks;
}

export function TeamMemberCard({ name, role, bio, image, socials }: TeamMemberCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
          <LazyImage
            src={image}
            alt={name}
            fill
            placeholderColor="hsl(var(--card))"
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Hover info overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {/* Bio */}
          <p className="text-sm text-muted-foreground text-center mb-6 line-clamp-4">
            {bio}
          </p>
          
          {/* Social links */}
          {socials && (
            <div className="flex items-center gap-3">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Twitter size={18} />
                </a>
              )}
              {socials.email && (
                <a
                  href={`mailto:${socials.email}`}
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          )}
        </motion.div>
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"
        />
      </div>
      
      {/* Info section */}
      <div className="p-5 text-center relative">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        
        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: '50%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
