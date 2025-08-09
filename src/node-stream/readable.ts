import { Readable } from 'node:stream';
/*
  Readable 是 Node.js 中的基类，代表可读流。

  _read(size) 是必须实现的方法，用来控制数据的读取方式。

  this.push(data) 是往流中推送数据（null 表示流结束）。

  每次有消费者（如 .on('data')）读取数据，Node.js 会自动调用 _read()
*/

class MyReadable extends Readable {
  private text: string;
  private index: number;
  constructor(text: string) {
    super();
    this.text = text;
    this.index = 0;
  }

  _read(): void {
    // console.log('size', size);
    if (this.index < this.text.length) {
      const char = this.text[this.index++];
      this.push(char);
    } else {
      this.push(null);
    }
  }
}

const myStream = new MyReadable('hello nodejs');

myStream.on('data', (chunk) => {
  process.stdout.write(`[${chunk}]`);
});

myStream.on('end', () => {
  console.log('done');
});
