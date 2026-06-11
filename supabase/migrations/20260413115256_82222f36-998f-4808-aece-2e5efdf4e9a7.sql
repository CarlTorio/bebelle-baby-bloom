
CREATE TABLE public.blocked_ips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL UNIQUE,
  reason TEXT,
  blocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous reads on blocked_ips" ON public.blocked_ips FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous inserts on blocked_ips" ON public.blocked_ips FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous deletes on blocked_ips" ON public.blocked_ips FOR DELETE TO anon USING (true);
