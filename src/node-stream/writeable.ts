import { Writable } from 'node:stream';

class Write extends Writable {
  constructor() {
    super();
  }

  _write(
    chunk: any,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    console.log(chunk.toString());
    setTimeout(() => {
      callback();
    }, 1000);
  }
}

const writeStream = new Write();

writeStream.on('finish', () => {
  console.log('end');
});

writeStream.write('hello');
writeStream.write(',');
writeStream.write('world');
writeStream.end();
