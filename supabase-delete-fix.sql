-- Fix: Add ON DELETE CASCADE to users table
ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;
ALTER TABLE public.users 
  ADD CONSTRAINT users_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Add RLS policy for deletion
CREATE POLICY "Users can delete own profile" 
  ON public.users 
  FOR DELETE 
  USING (auth.uid() = id);

-- Function to delete user account (deletes from auth.users which cascades to public.users)
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;
