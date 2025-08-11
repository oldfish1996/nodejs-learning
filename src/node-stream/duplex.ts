import { Duplex } from 'node:stream';

class DuplexStream extends Duplex {
  constructor() {
    super();
  }

  _read(_size: number): void {
    this.push('hello');
    this.push(',');
    this.push('world');
    this.push(null);
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

const duplex = new DuplexStream();

duplex.on('data', (data) => {
  console.log(data.toString());
});

duplex.on('end', () => {
  console.log('>>> read end >>>');
});

duplex.on('finish', () => {
  console.log('>>> write finish >>>');
});

duplex.write('hello');
duplex.write(',');
duplex.write('node');
duplex.end();
