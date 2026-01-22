import { StarField } from './StarField';

export function SpaceParallaxHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Twinkling Stars Layer */}
      <div className="absolute inset-0 -z-25">
        <StarField count={100} />
      </div>
    </div>
  );
}
