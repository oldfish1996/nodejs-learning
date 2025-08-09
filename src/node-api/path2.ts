import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const file1 = path.join('../', 'node-api', './', 'path2.js');
console.log('file1', file1);

const file2 = path.resolve('../', 'node-api', './', 'path2.js');
console.log('file2', file2);

console.log(path.relative('/a/b', '/c'));

console.log(path.parse(__filename));
