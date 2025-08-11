import { Duplex } from 'node:stream';

class MyDuplex extends Duplex {
  constructor(private data: any[] = []) {
    super();
  }

  _write(
    chunk: any,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    console.log('写入：', chunk.toString());
    this.data.push(chunk);
    setTimeout(() => {
      callback();
      this.push(chunk);
    }, 1000);
  }

  _read(_size: number): void {
    // if (this.data.length > 0) {
    //   const chunk = this.data.shift();
    //   this.push(chunk);
    //   console.log('读取：', chunk.toString());
    // }
    // if (this.data.length === 0) {
    //   this.push(null);
    // }
  }
}

const duplex = new MyDuplex();

duplex.on('data', (chunk) => {
  console.log('接收到数据：', chunk.toString());
});

// duplex.on('end', () => {
//   console.log('>>>> 读取完毕 >>>>');
// });

// duplex.on('finish', () => {
//   console.log('>>>> 写入完毕 >>>>');
// });

duplex.write('h');
duplex.write('e');
duplex.write('l');
duplex.write('l');
duplex.write('o');

duplex.end();
