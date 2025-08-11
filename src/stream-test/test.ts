import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async (req, res) => {
  // const data = fs.readFileSync(
  //   import.meta.dirname.replace('dist', 'src') + '/index.html',
  //   'utf-8'
  // );
  // res.end(data);

  const stream = fs.createReadStream(
    import.meta.dirname.replace('dist', 'src') + '/index.html',
    'utf-8'
  );
  stream.pipe(res);
});

server.listen(8000);
