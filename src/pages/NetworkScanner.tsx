import React from 'react';
import { NetworkScanner as NetworkScannerComponent } from '../components/NetworkScanner';

interface NetworkScannerProps {
  onNavigate: (page: string) => void;
}

const NetworkScanner: React.FC<NetworkScannerProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">Network Scanner</h1>
          <p className="text-gray-400">Scan IP addresses and domains for open ports and services</p>
        </div>
        <NetworkScannerComponent />
      </div>
    </div>
  );
};

export default NetworkScanner;
