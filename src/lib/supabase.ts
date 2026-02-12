import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ClientRequest {
  id: string;
  user_id: string;
  client_name: string;
  client_email: string;
  project_type: 'website_creation' | 'penetration_testing';
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface TestReport {
  id: string;
  request_id: string;
  target_url: string;
  scan_results: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities_found: number;
  test_date: string;
  created_at: string;
}
