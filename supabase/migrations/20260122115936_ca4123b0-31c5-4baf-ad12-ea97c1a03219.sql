-- Add video preview URL column to works table
ALTER TABLE public.works 
ADD COLUMN video_preview text DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN public.works.video_preview IS 'URL to a short video preview clip (5-10 seconds) for hover autoplay';