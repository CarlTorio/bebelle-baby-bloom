
CREATE POLICY "Allow anonymous order reads"
  ON public.orders
  FOR SELECT
  TO anon
  USING (true);
