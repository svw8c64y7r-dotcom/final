import { ScanRequest, ScanResult, ScanError } from '../types/scanner';

export class ScannerApi {
  private baseUrl = import.meta.env.VITE_API_URL || '/api';

  async scan(request: ScanRequest): Promise<ScanResult> {
    try {
      const response = await fetch(`${this.baseUrl}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error: ScanError = await response.json();
        throw new Error(error.error || 'Scan failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const scannerApi = new ScannerApi();
