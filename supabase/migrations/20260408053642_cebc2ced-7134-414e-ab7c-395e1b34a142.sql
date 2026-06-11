CREATE POLICY "Allow anonymous order updates"
ON public.orders
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous order deletes"
ON public.orders
FOR DELETE
TO anon
USING (true);