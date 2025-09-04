import { Worker, MessageChannel } from 'node:worker_threads';

// const { port1, port2 } = new MessageChannel();

const dirname = import.meta.dirname;

const worker = new Worker(`${dirname}/node-worker.ts`);

worker.postMessage({ value: 10 * 1e8 });

worker.on('message', (value) => {
  console.log('res', value);
  worker.terminate();
});
