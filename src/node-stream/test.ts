import http from 'node:http';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
  // const data = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  // res.end(data);

  const readStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
  readStream.pipe(res);
});

server.listen(8000);
