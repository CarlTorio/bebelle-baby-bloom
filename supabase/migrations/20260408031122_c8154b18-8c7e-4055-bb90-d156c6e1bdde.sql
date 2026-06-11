
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_ref TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  province TEXT,
  city TEXT,
  barangay TEXT,
  landmark TEXT,
  pack_label TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow the edge function (anon key) to insert orders
CREATE POLICY "Allow anonymous order inserts"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all orders (for admin/dashboard use)
CREATE POLICY "Service role can read all orders"
  ON public.orders
  FOR SELECT
  TO service_role
  USING (true);
