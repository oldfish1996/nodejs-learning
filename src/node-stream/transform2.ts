import { Transform } from 'node:stream';
import { TransformCallback } from 'stream';

class UpperCaseTransform extends Transform {
  constructor() {
    super();
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const trans = new UpperCaseTransform();

trans.on('data', (chunk) => {
  console.log('转换后数据：', chunk.toString());
});

trans.write('hello');
trans.write('world');
trans.end();
