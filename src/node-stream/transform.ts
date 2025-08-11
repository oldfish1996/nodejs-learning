import { Transform } from 'node:stream';
import { TransformCallback } from 'stream';

class TransformStream extends Transform {
  constructor() {
    super();
  }

  _transform(
    buf: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const res = buf.toString().split('').reverse().join('');
    this.push(res);

    callback();
  }
}

var trans = new TransformStream();

trans.on('data', (data) => {
  console.log(data.toString());
});

trans.on('end', () => {
  console.log('>>> read end >>>');
});

trans.on('finish', () => {
  console.log('>>> write finish >>>');
});

trans.write('hello');
trans.write(',');
trans.write('world');
trans.end();
