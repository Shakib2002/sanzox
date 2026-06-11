import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  // Velocity skew springs
  const scaleX = useSpring(1, { stiffness: 300, damping: 20 });
  const scaleY = useSpring(1, { stiffness: 300, damping: 20 });
  const rotate = useSpring(0, { stiffness: 300, damping: 20 });

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const decayTimer = useRef<number | null>(null);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastTime.current || 1;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Skew calculation (speed-based stretch and squash)
      // Speed is usually between 0 and 5 px/ms. Cap it to 4 for styling limits.
      const cappedSpeed = Math.min(speed, 4);
      const stretch = 1 + cappedSpeed * 0.15; // Up to 1.6
      const squash = 1 - cappedSpeed * 0.08;   // Down to 0.68

      scaleX.set(stretch);
      scaleY.set(squash);
      rotate.set(angle);

      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;

      // Reset skew when mouse stops moving
      if (decayTimer.current) {
        window.clearTimeout(decayTimer.current);
      }
      decayTimer.current = window.setTimeout(() => {
        scaleX.set(1);
        scaleY.set(1);
      }, 80);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track hover on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for custom cursor text attribute
      const textContainer = target.closest('[data-cursor-text]');
      if (textContainer) {
        const text = textContainer.getAttribute('data-cursor-text');
        setCursorText(text);
        setIsHovering(true);
        return;
      }

      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        !!target.closest('[role="button"]') ||
        target.classList.contains('magnetic-button');
      
      setIsHovering(isInteractive);
      setCursorText(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
      if (decayTimer.current) {
        window.clearTimeout(decayTimer.current);
      }
    };
  }, [cursorX, cursorY, scaleX, scaleY, rotate]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scaleX,
          scaleY,
          rotate,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? (cursorText ? 0 : 2.5) : 1,
            opacity: isHovering ? (cursorText ? 0 : 0.8) : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: cursorText ? 2.5 : (isHovering ? 1.5 : 1),
            opacity: cursorText ? 0.95 : (isHovering ? 0.35 : 0.15),
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="w-10 h-10 rounded-full border border-primary/50 bg-primary/10 blur-[1px]"
        />
      </motion.div>

      {/* Floating text tag */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-primary uppercase select-none drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
              {cursorText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
