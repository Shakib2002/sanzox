-- Grant admin role to codewithshakib@gmail.com
INSERT INTO public.user_roles (user_id, role) 
VALUES ('6b559871-7c00-4b08-a817-47979f73112d', 'admin') 
ON CONFLICT (user_id, role) DO NOTHING;