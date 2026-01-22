-- Create team_members table
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  linkedin_url text,
  twitter_url text,
  email text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can view active team members"
  ON public.team_members
  FOR SELECT
  USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage team members"
  ON public.team_members
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for team photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('team', 'team', true);

-- Storage policies for team bucket
CREATE POLICY "Anyone can view team photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'team');

CREATE POLICY "Admins can upload team photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'team' AND is_admin());

CREATE POLICY "Admins can update team photos"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'team' AND is_admin());

CREATE POLICY "Admins can delete team photos"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'team' AND is_admin());