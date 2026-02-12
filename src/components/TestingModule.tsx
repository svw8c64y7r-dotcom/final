import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { supabase, ClientRequest } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface TestingModuleProps {
  onRefresh: () => void;
}

export default function TestingModule({ onRefresh }: TestingModuleProps) {
  const { user } = useAuth();
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [scanResults, setScanResults] = useState<any>(null);
  const [requests, setRequests] = useState<ClientRequest[]>([]);

  useEffect(() => {
    fetchPenetrationTestingRequests();
  }, [user]);

  async function fetchPenetrationTestingRequests() {
    try {
      const { data, error } = await supabase
        .from('client_requests')
        .select('*')
        .eq('user_id', user?.id)
        .eq('project_type', 'penetration_testing')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setScanResults(null);

    try {
      const mockResults = {
        url: targetUrl,
        scanDate: new Date().toISOString(),
        vulnerabilities: [
          {
            type: 'SQL Injection',
            severity: 'high',
            location: '/api/users',
            description: 'Potential SQL injection vulnerability in user input validation',
          },
          {
            type: 'Cross-Site Scripting (XSS)',
            severity: 'medium',
            location: '/search',
            description: 'Unescaped user input in search results',
          },
          {
            type: 'Missing Security Headers',
            severity: 'low',
            location: 'Global',
            description: 'X-Frame-Options and Content-Security-Policy headers not set',
          },
          {
            type: 'Weak Authentication',
            severity: 'critical',
            location: '/login',
            description: 'No rate limiting on login attempts detected',
          },
        ],
        summary: {
          critical: 1,
          high: 1,
          medium: 1,
          low: 1,
        },
      };

      setScanResults(mockResults);

      if (requests.length > 0) {
        const latestRequest = requests[0];
        const { error: reportError } = await supabase.from('test_reports').insert({
          request_id: latestRequest.id,
          target_url: targetUrl,
          scan_results: mockResults,
          severity: 'critical',
          vulnerabilities_found: mockResults.vulnerabilities.length,
        });

        if (reportError) throw reportError;
        setMessage('Scan completed and report saved successfully!');
        onRefresh();
      } else {
        setMessage('Scan completed! Please submit a penetration testing request first to save reports.');
      }
    } catch (error) {
      setMessage('Error during scan. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-cyan-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Web Application Testing Module</h2>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-md p-4 mb-6">
          <p className="text-cyan-400 text-sm">
            This is a demonstration module that simulates vulnerability scanning. Real penetration
            testing requires proper authorization and should only be performed on systems you own or
            have explicit permission to test.
          </p>
        </div>

        <form onSubmit={handleScan}>
          <div className="mb-4">
            <label htmlFor="targetUrl" className="block text-gray-300 mb-2">
              Target URL
            </label>
            <input
              type="url"
              id="targetUrl"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              placeholder="https://example.com"
            />
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.includes('success')
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 text-gray-900 px-6 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Scanning...'
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Start Security Scan
              </>
            )}
          </button>
        </form>
      </div>

      {scanResults && (
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Scan Results</h3>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
              <p className="text-red-400 text-2xl font-bold">{scanResults.summary.critical}</p>
              <p className="text-gray-400 text-sm">Critical</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
              <p className="text-orange-400 text-2xl font-bold">{scanResults.summary.high}</p>
              <p className="text-gray-400 text-sm">High</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{scanResults.summary.medium}</p>
              <p className="text-gray-400 text-sm">Medium</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <p className="text-green-400 text-2xl font-bold">{scanResults.summary.low}</p>
              <p className="text-gray-400 text-sm">Low</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Vulnerabilities Found</h4>
            {scanResults.vulnerabilities.map((vuln: any, index: number) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    {vuln.severity === 'critical' || vuln.severity === 'high' ? (
                      <XCircle className="h-5 w-5 text-red-400 mr-2" />
                    ) : vuln.severity === 'medium' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    )}
                    <h5 className="text-white font-semibold">{vuln.type}</h5>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vuln.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : vuln.severity === 'high'
                        ? 'bg-orange-500/20 text-orange-400'
                        : vuln.severity === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {vuln.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Location: {vuln.location}</p>
                <p className="text-gray-300">{vuln.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
