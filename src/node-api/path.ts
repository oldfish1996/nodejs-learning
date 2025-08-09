import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

console.log('0', __dirname);
console.log('1', __filename);
console.log('2', path.dirname(__filename));
console.log('3', path.basename(__filename));
console.log('4', path.extname(__filename));
