import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NetworkScanner from './pages/NetworkScanner';



function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();


  useEffect(() => {
    if (user && currentPage === 'login') {
      setCurrentPage('dashboard');
    } else if (!user && currentPage === 'dashboard') {
      setCurrentPage('home');
    }
  }, [user]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />


      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <About />}
      {currentPage === 'services' && <Services onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <Register onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && user && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'scanner' && <NetworkScanner onNavigate={setCurrentPage} />}
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


export default App;
