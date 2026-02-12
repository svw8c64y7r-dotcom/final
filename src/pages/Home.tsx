import { Shield, Lock, Search, Code } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-cyan-400">Epoteck</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your trusted partner in cybersecurity solutions. We provide cutting-edge web application
            penetration testing and secure website development services.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('services')}
              className="bg-cyan-500 text-gray-900 px-8 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold text-lg"
            >
              Our Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-cyan-500 text-cyan-400 px-8 py-3 rounded-md hover:bg-cyan-500/10 transition-colors font-semibold text-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300">
            <Shield className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Security First</h3>
            <p className="text-gray-400">
              We prioritize security in every aspect of our work, ensuring your digital assets are protected.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300">
            <Lock className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Penetration Testing</h3>
            <p className="text-gray-400">
              Comprehensive security assessments to identify vulnerabilities before attackers do.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300">
            <Search className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Threat Analysis</h3>
            <p className="text-gray-400">
              In-depth analysis of potential threats and vulnerabilities in your web applications.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300">
            <Code className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Secure Development</h3>
            <p className="text-gray-400">
              Build secure, robust websites with industry best practices and modern technologies.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Secure Your Digital Presence?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Epoteck with their cybersecurity needs.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="bg-cyan-500 text-gray-900 px-8 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold text-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
