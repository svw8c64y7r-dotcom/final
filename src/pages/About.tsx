import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About <span className="text-cyan-400">Epoteck</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a team of dedicated cybersecurity professionals committed to protecting your digital assets
            and building secure web solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              At Epoteck, our mission is to empower businesses with robust cybersecurity solutions and
              secure web development services. We believe that security should never be an afterthought,
              which is why we integrate best practices into every project we undertake.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              We envision a digital world where businesses of all sizes can operate securely without fear
              of cyber threats. Through innovation, expertise, and dedication, we strive to be the leading
              provider of comprehensive cybersecurity services.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Target className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>

          <div className="text-center">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">300+</h3>
            <p className="text-gray-400">Satisfied Clients</p>
          </div>

          <div className="text-center">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
            <p className="text-gray-400">Industry Awards</p>
          </div>

          <div className="text-center">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">99.9%</h3>
            <p className="text-gray-400">Success Rate</p>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Web Application Security</h3>
              <p className="text-gray-400">
                Comprehensive penetration testing and vulnerability assessments for web applications.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Secure Development</h3>
              <p className="text-gray-400">
                Building secure, scalable websites with industry-leading security practices.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Security Consulting</h3>
              <p className="text-gray-400">
                Expert guidance on security architecture, compliance, and risk management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
