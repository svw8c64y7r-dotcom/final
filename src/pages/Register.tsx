import { useState } from 'react';
import { UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.username, formData.fullName);
      setSuccess(true);
      setTimeout(() => onNavigate('login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join Epoteck</h1>
          <p className="text-gray-300">Create your account to get started</p>
        </div>

        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
          {success ? (
            <div className="text-center">
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-400">
                Registration successful! Redirecting to login...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Choose a username"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Create a strong password"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Confirm your password"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 text-gray-900 px-6 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {loading ? (
                  'Creating account...'
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Register
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
