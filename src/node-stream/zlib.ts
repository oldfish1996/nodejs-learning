import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const gzip = createGzip();
const source = createReadStream(
  import.meta.dirname.replace('dist', 'src') + '/index.html'
);

const dest = createWriteStream('data.txt.gz');

source.pipe(gzip).pipe(dest);
