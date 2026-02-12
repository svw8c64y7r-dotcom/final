import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="ml-2 text-2xl font-bold text-white">Epoteck</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`${
                currentPage === 'home' ? 'text-cyan-400' : 'text-gray-300'
              } hover:text-cyan-400 transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`${
                currentPage === 'about' ? 'text-cyan-400' : 'text-gray-300'
              } hover:text-cyan-400 transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`${
                currentPage === 'services' ? 'text-cyan-400' : 'text-gray-300'
              } hover:text-cyan-400 transition-colors`}
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`${
                currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-300'
              } hover:text-cyan-400 transition-colors`}
            >
              Contact
            </button>
            
            {/* NEW SCANNER BUTTON */}
            <button
              onClick={() => onNavigate('scanner')}
              className={`${
                currentPage === 'scanner' ? 'text-cyan-400' : 'text-gray-300'
              } hover:text-cyan-400 transition-colors`}
            >
              Scanner
            </button>

            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`${
                    currentPage === 'dashboard' ? 'text-cyan-400' : 'text-gray-300'
                  } hover:text-cyan-400 transition-colors`}
                >
                  Dashboard
                </button>
                <button
                  onClick={signOut}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className={`${
                    currentPage === 'login' ? 'text-cyan-400' : 'text-gray-300'
                  } hover:text-cyan-400 transition-colors`}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-cyan-500 text-gray-900 px-4 py-2 rounded-md hover:bg-cyan-400 transition-colors font-semibold"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
