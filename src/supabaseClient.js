import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zgegzjjxyepubqymxowq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZWd6amp4eWVwdWJxeW14b3dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTQ5ODIsImV4cCI6MjA3NzQ5MDk4Mn0.-hiEgIeT_-Ir5CUVBwP7_rJiMi2nBR8Y2EZl_Mhoxsk';

export const supabase = createClient(supabaseUrl, supabaseKey);
