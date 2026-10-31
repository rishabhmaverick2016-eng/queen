/**
 * Queen Bloom | Zero-dependency Local Server
 * Run with: node server.js
 * Automatically discovers your local Wi-Fi IP so she can connect on her phone instantly!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3001;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const localIp = getLocalIp();

server.listen(PORT, '0.0.0.0', () => {
  console.log('----------------------------------------------------');
  console.log('🌸 Queen Bloom Self-Care & Routine Server is Live!');
  console.log(`📱 Local PC Access:    http://localhost:${PORT}`);
  console.log(`📲 Wife Phone Access:  http://${localIp}:${PORT}`);
  console.log('----------------------------------------------------');
  console.log('To install on her phone:');
  console.log(`1. Connect her phone to your home Wi-Fi.`);
  console.log(`2. Open http://${localIp}:${PORT} in Safari (iPhone) or Chrome (Android).`);
  console.log(`3. Tap "Add to Home Screen" to install it as an app with an icon!`);
  console.log('----------------------------------------------------');
});
