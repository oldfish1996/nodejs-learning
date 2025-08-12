import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const server = http.createServer(async (req, res) => {
  const indexPath = path.resolve('./', 'public', './aaa.txt');
  const writeStream = fs.createWriteStream(indexPath, 'utf-8');
  req.pipe(writeStream);
  res.write('111');
  res.end();
});

server.listen(8000);
