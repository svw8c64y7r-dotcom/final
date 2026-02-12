import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'website_creation',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage('Please login to submit a request');
      setTimeout(() => onNavigate('login'), 2000);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('client_requests').insert({
        user_id: user.id,
        client_name: formData.name,
        client_email: formData.email,
        project_type: formData.projectType,
        description: formData.description,
        status: 'pending',
      });

      if (error) throw error;

      setMessage('Request submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        projectType: 'website_creation',
        description: '',
      });
    } catch (error) {
      setMessage('Error submitting request. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Contact <span className="text-cyan-400">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to secure your digital assets? Get in touch with our team today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-cyan-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-300">sriragavsurya@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-cyan-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">+91 8870726999</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-cyan-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-300">2/478, d-3,karunya nagar, Coimbatore</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Submit a Request</h2>
            {!user && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-md p-4 mb-6">
                <p className="text-cyan-400">
                  Please{' '}
                  <button onClick={() => onNavigate('login')} className="underline font-semibold">
                    login
                  </button>{' '}
                  to submit a request
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  disabled={!user}
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
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  disabled={!user}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="projectType" className="block text-gray-300 mb-2">
                  Service Type
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  disabled={!user}
                >
                  <option value="website_creation">Website Creation</option>
                  <option value="penetration_testing">Penetration Testing</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-300 mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Tell us about your project requirements..."
                  disabled={!user}
                />
              </div>

              {message && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    message.includes('success')
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !user}
                className="w-full bg-cyan-500 text-gray-900 px-6 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
