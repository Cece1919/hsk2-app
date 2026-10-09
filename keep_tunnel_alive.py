import subprocess, time, sys, os

def run_tunnel():
    print('Starting persistent auto-reconnecting tunnel daemon...')
    while True:
        try:
            p = subprocess.Popen(
                ['ssh', '-o', 'StrictHostKeyChecking=no', '-o', 'ServerAliveInterval=10', '-o', 'ServerAliveCountMax=3', '-R', '80:localhost:8080', 'serveo.net'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True
            )
            while True:
                line = p.stdout.readline()
                if not line:
                    break
                line_str = line.strip()
                print(line_str)
                if 'serveousercontent.com' in line_str:
                    print(f'\n[ACTIVE TUNNEL URL]: {line_str}\n', flush=True)
            p.wait()
        except Exception as e:
            print(f'Tunnel exception: {e}', flush=True)
        print('Tunnel connection closed. Reconnecting in 2 seconds...', flush=True)
        time.sleep(2)

if __name__ == '__main__':
    run_tunnel()
