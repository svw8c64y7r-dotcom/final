import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { supabase, ClientRequest, TestReport } from '../lib/supabase';
import TestingModule from '../components/TestingModule';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [reports, setReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'testing'>('overview');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    try {
      const { data: requestsData, error: requestsError } = await supabase
        .from('client_requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (requestsError) throw requestsError;
      setRequests(requestsData || []);

      const requestIds = requestsData?.map((r) => r.id) || [];
      if (requestIds.length > 0) {
        const { data: reportsData, error: reportsError } = await supabase
          .from('test_reports')
          .select('*')
          .in('request_id', requestIds)
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;
        setReports(reportsData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const pendingRequests = requests.filter((r) => r.status === 'pending').length;
  const completedRequests = requests.filter((r) => r.status === 'completed').length;
  const criticalVulnerabilities = reports.filter((r) => r.severity === 'critical').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-cyan-400">{profile?.username}</span>
          </h1>
          <p className="text-gray-300">Manage your projects and security assessments</p>
        </div>

        <div className="flex space-x-4 mb-8 border-b border-cyan-500/30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'requests'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            My Requests
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'testing'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Testing Module
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-8 w-8 text-cyan-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-white">{requests.length}</p>
              </div>

              <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-white">{pendingRequests}</p>
              </div>

              <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-white">{completedRequests}</p>
              </div>

              <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Critical Issues</p>
                <p className="text-3xl font-bold text-white">{criticalVulnerabilities}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-cyan-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-white font-semibold">{profile?.username}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="text-white font-semibold">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="text-white font-semibold capitalize">{profile?.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Test Reports</h2>
              {reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div
                      key={report.id}
                      className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white font-semibold mb-1">{report.target_url}</p>
                          <p className="text-gray-400 text-sm mb-2">
                            {new Date(report.test_date).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                report.severity === 'critical'
                                  ? 'bg-red-500/20 text-red-400'
                                  : report.severity === 'high'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : report.severity === 'medium'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-green-500/20 text-green-400'
                              }`}
                            >
                              {report.severity.toUpperCase()}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {report.vulnerabilities_found} vulnerabilities found
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No test reports yet</p>
              )}
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">My Requests</h2>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {request.client_name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">{request.client_email}</p>
                        <p className="text-gray-300 mb-3">{request.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-cyan-400 text-sm font-semibold">
                            {request.project_type.replace('_', ' ').toUpperCase()}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              request.status === 'completed'
                                ? 'bg-green-500/20 text-green-400'
                                : request.status === 'in_progress'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {request.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No requests yet</p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-md hover:bg-cyan-400 transition-colors font-semibold"
                >
                  Submit a Request
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'testing' && <TestingModule onRefresh={fetchData} />}
      </div>
    </div>
  );
}
