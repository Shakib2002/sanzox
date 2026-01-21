import { motion } from 'framer-motion';

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Aurora orbs */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(280 91% 60%) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(190 91% 50%) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
