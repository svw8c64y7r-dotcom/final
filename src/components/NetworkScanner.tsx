import React, { useState } from 'react';
import { scannerApi } from '../services/scannerApi';
import { ScanResult } from '../types/scanner';

export const NetworkScanner: React.FC = () => {
  const [host, setHost] = useState('');
  const [scanType, setScanType] = useState<'basic' | 'aggressive'>('basic');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return ipv4Regex.test(input) || domainRegex.test(input);
  };

  const handleScan = async () => {
    if (!validateInput(host)) {
      setError('Please enter a valid IP address or domain name');
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const scanResult = await scannerApi.scan({ host, scan_type: scanType });
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
      {/* Input Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Enter IP address or domain (e.g., 192.168.1.1 or example.com)"
            disabled={isScanning}
            className="flex-1 px-4 py-3 bg-gray-700 border border-cyan-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />
          
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value as 'basic' | 'aggressive')}
            disabled={isScanning}
            className="px-4 py-3 bg-gray-700 border border-cyan-500 rounded text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="basic">Basic Scan (1-1024)</option>
            <option value="aggressive">Aggressive Scan (1-65535)</option>
          </select>
          
          <button
            onClick={handleScan}
            disabled={isScanning || !host}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold rounded transition"
          >
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Scan Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-600 p-4 rounded">
              <p className="text-gray-300 text-sm">Target</p>
              <p className="text-cyan-400 font-semibold">{result.host}</p>
              <p className="text-gray-400 text-sm">{result.ip}</p>
            </div>
            <div className="bg-gray-600 p-4 rounded">
              <p className="text-gray-300 text-sm">Scan Type</p>
              <p className="text-cyan-400 font-semibold capitalize">{result.scan_type}</p>
            </div>
            <div className="bg-gray-600 p-4 rounded">
              <p className="text-gray-300 text-sm">Elapsed Time</p>
              <p className="text-cyan-400 font-semibold">{result.elapsed_time}s</p>
            </div>
            <div className="bg-gray-600 p-4 rounded">
              <p className="text-gray-300 text-sm">Open Ports Found</p>
              <p className="text-cyan-400 font-semibold">{result.open_ports_count} / {result.total_ports_scanned}</p>
            </div>
          </div>

          {/* Ports Table */}
          {result.open_ports.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500">
                    <th className="text-left py-2 px-4 text-cyan-400">Port</th>
                    <th className="text-left py-2 px-4 text-cyan-400">Service</th>
                    <th className="text-left py-2 px-4 text-cyan-400">Banner</th>
                  </tr>
                </thead>
                <tbody>
                  {result.open_ports.map((port) => (
                    <tr key={port.port} className="border-b border-gray-600 hover:bg-gray-600">
                      <td className="py-2 px-4 text-white">{port.port}</td>
                      <td className="py-2 px-4 text-cyan-300">{port.service}</td>
                      <td className="py-2 px-4 text-gray-300 truncate">{port.banner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {result.open_ports.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No open ports found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
