import os from 'node:os';
import { Worker } from 'node:worker_threads';

const poolSize = os.cpus().length;

const dirname = import.meta.dirname;
const path = `${dirname}/node-worker.ts`;

const start = Date.now();

let count = 0;

for (let i = 0; i < poolSize; i++) {
  const worker = new Worker(path);

  worker.postMessage({
    id: i,
    value: Math.random() * 1e9,
  });

  worker.on('message', (value) => {
    console.log(`第${i}个线程计算出结果： ${value}`);
    count++;
    if (count === poolSize) {
      const end = Date.now();
      console.log('Time cost ', end - start);
    }
    worker.terminate();
  });
}
