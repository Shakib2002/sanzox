import { useState, useEffect, useCallback, useRef } from "react";
import img1 from '../../../assets/maxdrive/image-1.png'
import img2 from '../../../assets/maxdrive/image-2.png'
import img3 from '../../../assets/maxdrive/image-3.png'
import img4 from '../../../assets/maxdrive/image-4.png'

const slides = [
  { id: 1, image: img1, alt: "Slide 1" },
  { id: 2, image: img2, alt: "Slide 2" },
  { id: 3, image: img3, alt: "Slide 3" },
  { id: 4, image: img4, alt: "Slide 4" },
];

const AUTO_PLAY_INTERVAL = 3000;

function getSlideStyle(offset: number): React.CSSProperties {
  const absOffset = Math.abs(offset);

  if (absOffset >= 2) {
    return {
      transform: `translateX(${offset * 52}%) scale(0.5) rotateY(${offset > 0 ? 55 : -55}deg)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  }

  if (offset === 0) {
    return {
      transform: "translateX(0%) scale(1) rotateY(0deg)",
      opacity: 1,
      zIndex: 10,
      borderRadius: "24px",
      boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
      pointerEvents: "auto",
    };
  }

  const rotateY = offset > 0 ? 42 : -42;
  return {
    transform: `translateX(${offset * 68}%) scale(0.68) rotateY(${rotateY}deg)`,
    opacity: 0.4,
    zIndex: 5,
    borderRadius: "20px",
    filter: "brightness(0.41)",
    pointerEvents: "none",
  };
}

export default function AppSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [trackHeight, setTrackHeight] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        const w = trackRef.current.offsetWidth;
        // slide = 75% of track width, 16:9 ratio
        setTrackHeight((w * 0.75 * 9) / 16);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [current, isAnimating]
  );

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div
      className="w-full mx-auto select-none flex flex-col items-center"
      style={{ maxWidth: "720px", gap: "20px" }}
    >
      {/* Coverflow Track — height is explicit so pagination never overlaps */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{
          height: trackHeight ? `${trackHeight}px` : "auto",
          minHeight: "140px",
          perspective: "1200px",
          // NO overflow:hidden here — that kills rotateY 3D effect
          // side slides are dimmed enough that clipping isn't needed
        }}
      >
        {slides.map((slide, index) => {
          let offset = index - current;
          const half = slides.length / 2;
          if (offset > half) offset -= slides.length;
          if (offset < -half) offset += slides.length;

          const style = getSlideStyle(offset);

          return (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                // anchor from top-left, stretch to full track height
                top: 0,
                left: "12.5%",   // (100% - 75%) / 2
                width: "75%",
                height: "100%",
                transition:
                  "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease, filter 0.6s ease",
                transformStyle: "preserve-3d",
                ...style,
                overflow: "hidden",
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "inherit",
                }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination Dots — always below, never overlapped */}
      <div className="flex items-center justify-center gap-[10px]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              transition: "all 0.35s ease",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              width: index === current ? "28px" : "8px",
              height: "8px",
              background:
                index === current
                  ? "rgba(255, 255, 255, 0.90)"
                  : "rgba(255, 255, 255, 0.22)",
            }}
            onMouseEnter={(e) => {
              if (index !== current)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.42)";
            }}
            onMouseLeave={(e) => {
              if (index !== current)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.22)";
            }}
          />
        ))}
      </div>
    </div>
  );
}