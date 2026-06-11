export interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured: boolean;
  video_preview?: string | null;
}
