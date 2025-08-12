import fs from 'node:fs';

fs.mkdirSync('fs-sync');

setTimeout(() => {
  fs.renameSync('fs-sync', 'fs-sync-2');
}, 1000);

setTimeout(() => {
  fs.rmSync('fs-sync-2', { recursive: true, force: true });
}, 3000);
