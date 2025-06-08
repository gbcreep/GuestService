import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://stzwcwlajnbswbzgqyfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0endjd2xham5ic3diemdxeWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDU4MjcsImV4cCI6MjA2NDEyMTgyN30.zgwN6mWqcbUbKoLGhN9pZySqdhNxlwvHG1iJcxpBFdE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;