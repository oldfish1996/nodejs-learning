import { Readable } from 'node:stream';

const readable = new Readable();

readable._read = function () {
  this.push('hello');
  this.push(',');
  this.push('world');
  this.push(null);
};

readable.on('data', (data) => {
  console.log(data.toString());
});

readable.on('end', () => {
  console.log('end');
});
