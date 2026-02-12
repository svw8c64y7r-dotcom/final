import { Globe, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-cyan-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Globe className="h-12 w-12 text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Website Creation</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We build secure, modern, and responsive websites that not only look great but are
              fortified against cyber threats from the ground up.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Custom web application development</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Responsive and mobile-friendly design</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Secure authentication and authorization</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Database design and implementation</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">API development and integration</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Performance optimization</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full bg-cyan-500 text-gray-900 px-6 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold"
            >
              Request Website Development
            </button>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Shield className="h-12 w-12 text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Penetration Testing</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Comprehensive security assessments to identify and help remediate vulnerabilities in
              your web applications before malicious actors can exploit them.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">OWASP Top 10 vulnerability assessment</p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">SQL injection and XSS testing</p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Authentication and session management testing</p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Business logic vulnerability testing</p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Detailed vulnerability reports</p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Remediation recommendations</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full bg-cyan-500 text-gray-900 px-6 py-3 rounded-md hover:bg-cyan-400 transition-colors font-semibold"
            >
              Request Security Assessment
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Epoteck?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Expert Team</h3>
              <p className="text-gray-300">
                Certified security professionals with years of industry experience
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Proven Track Record</h3>
              <p className="text-gray-300">
                Successfully delivered 500+ projects with 99.9% client satisfaction
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Ongoing Support</h3>
              <p className="text-gray-300">
                Continuous monitoring and support to keep your assets secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
