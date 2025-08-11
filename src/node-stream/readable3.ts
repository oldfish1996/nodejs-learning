import { Readable } from 'node:stream';

class Read extends Readable {
  private _iterator: Iterator<any>;
  constructor(iterator: Iterator<any>) {
    super();
    this._iterator = iterator;
  }

  _read() {
    const next = this._iterator.next();
    if (next.done) {
      this.push(null);
    } else {
      this.push(next.value);
    }
  }
}

function* gen(): Generator<string> {
  yield 'hello';
  yield ',';
  yield 'world';
}

const genIter = gen();

const readStream = new Read(genIter);

readStream.on('data', (data) => {
  console.log(data.toString());
});

readStream.on('end', () => {
  console.log('end');
});
