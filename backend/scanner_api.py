from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import concurrent.futures
import time

app = Flask(__name__)
CORS(app)

def resolve_host(host):
    try:
        return socket.gethostbyname(host)
    except Exception as e:
        return None

def scan_port(host, port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(1)
            result = sock.connect_ex((host, port))
            if result == 0:
                try:
                    sock.sendall(b'HEAD / HTTP/1.0\r\n\r\n')
                    banner = sock.recv(1024).decode().strip()
                except:
                    banner = None
                return port, banner
    except:
        return None

def get_service_name(port):
    try:
        return socket.getservbyport(port)
    except:
        return "unknown"

@app.route('/api/scan', methods=['POST'])
def scan():
    data = request.json
    host_input = data.get('host', '').strip()
    scan_type = data.get('scan_type', 'basic').strip().lower()
    
    if not host_input:
        return jsonify({'error': 'Host is required'}), 400
    
    ip = resolve_host(host_input)
    if not ip:
        return jsonify({'error': 'Could not resolve host'}), 400
    
    if scan_type == 'basic':
        ports = range(1, 1025)
    elif scan_type == 'aggressive':
        ports = range(1, 65536)
    else:
        ports = range(1, 1025)
    
    start_time = time.time()
    open_ports = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=200) as executor:
        futures = [executor.submit(scan_port, ip, port) for port in ports]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result:
                port, banner = result
                service_name = get_service_name(port)
                open_ports.append({
                    'port': port,
                    'service': service_name,
                    'banner': banner if banner else '-'
                })
    
    elapsed = time.time() - start_time
    
    return jsonify({
        'ip': ip,
        'host': host_input,
        'scan_type': scan_type,
        'elapsed_time': round(elapsed, 2),
        'open_ports': sorted(open_ports, key=lambda x: x['port']),
        'total_ports_scanned': len(ports),
        'open_ports_count': len(open_ports)
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
