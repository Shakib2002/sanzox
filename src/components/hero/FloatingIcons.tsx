import { motion } from 'framer-motion';
import { Bot, Code2, Video, ShoppingBag, Sparkles, Zap } from 'lucide-react';

const floatingIcons = [
  { Icon: Bot, x: '10%', y: '20%', delay: 0, duration: 8 },
  { Icon: Code2, x: '85%', y: '15%', delay: 1, duration: 10 },
  { Icon: Video, x: '75%', y: '70%', delay: 2, duration: 9 },
  { Icon: ShoppingBag, x: '15%', y: '75%', delay: 1.5, duration: 11 },
  { Icon: Sparkles, x: '90%', y: '45%', delay: 0.5, duration: 7 },
  { Icon: Zap, x: '5%', y: '50%', delay: 2.5, duration: 12 },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map(({ Icon, x, y, delay, duration }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration, repeat: Infinity, ease: 'easeInOut', delay },
            scale: { duration, repeat: Infinity, ease: 'easeInOut', delay },
            y: { duration: duration * 0.8, repeat: Infinity, ease: 'easeInOut', delay },
            rotate: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <div className="p-3 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/10 shadow-lg shadow-primary/5">
            <Icon className="w-5 h-5 text-primary/60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
