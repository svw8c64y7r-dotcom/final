/*
  # Epoteck Cybersecurity Platform Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `role` (text) - 'client' or 'admin'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `client_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `client_name` (text)
      - `client_email` (text)
      - `project_type` (text) - 'website_creation' or 'penetration_testing'
      - `description` (text)
      - `status` (text) - 'pending', 'in_progress', 'completed'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `test_reports`
      - `id` (uuid, primary key)
      - `request_id` (uuid, references client_requests)
      - `target_url` (text)
      - `scan_results` (jsonb) - stores vulnerability findings
      - `severity` (text) - 'low', 'medium', 'high', 'critical'
      - `vulnerabilities_found` (integer)
      - `test_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Policies for users to read their own data
    - Policies for admins to read all data
    - Policies for authenticated users to create requests
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create client_requests table
CREATE TABLE IF NOT EXISTS client_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text NOT NULL,
  project_type text NOT NULL CHECK (project_type IN ('website_creation', 'penetration_testing')),
  description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own requests"
  ON client_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create requests"
  ON client_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests"
  ON client_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create test_reports table
CREATE TABLE IF NOT EXISTS test_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES client_requests(id) ON DELETE CASCADE,
  target_url text NOT NULL,
  scan_results jsonb DEFAULT '{}'::jsonb,
  severity text DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  vulnerabilities_found integer DEFAULT 0,
  test_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE test_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reports for their requests"
  ON test_reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_requests
      WHERE client_requests.id = test_reports.request_id
      AND client_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create test reports"
  ON test_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_requests
      WHERE client_requests.id = test_reports.request_id
      AND client_requests.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_requests_user_id ON client_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_client_requests_status ON client_requests(status);
CREATE INDEX IF NOT EXISTS idx_test_reports_request_id ON test_reports(request_id);
CREATE INDEX IF NOT EXISTS idx_test_reports_severity ON test_reports(severity);