export interface ScanRequest {
  host: string;
  scan_type: 'basic' | 'aggressive';
}

export interface OpenPort {
  port: number;
  service: string;
  banner: string;
}

export interface ScanResult {
  ip: string;
  host: string;
  scan_type: string;
  elapsed_time: number;
  open_ports: OpenPort[];
  total_ports_scanned: number;
  open_ports_count: number;
}

export interface ScanError {
  error: string;
}
