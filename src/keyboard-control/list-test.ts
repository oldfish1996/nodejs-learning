import anisEscape from 'ansi-escapes';
import readline from 'node:readline';
import chalk from 'chalk';

interface Position {
  x: number;
  y: number;
}

abstract class BaseUI {
  readonly stdout = process.stdout;
  readonly write = process.stdout.write.bind(process.stdout);
  protected print(text: string) {
    this.write(text);
  }
  protected setCursorAt({ x, y }: Position) {
    this.print(anisEscape.cursorTo(x, y));
  }
  protected printAt(text: string, { x, y }: Position) {
    this.setCursorAt({ x, y });
    this.write(text);
  }
  protected clearLine(row: number) {
    this.printAt(anisEscape.eraseLine, { x: 0, y: row });
  }

  get getSize() {
    return {
      rows: this.stdout.rows,
      columns: this.stdout.columns,
    };
  }
}

class ScrollList extends BaseUI {
  curIndex = 0;
  topIndex = 0;
  constructor(private list: string[] = []) {
    super();
    this.render();
  }

  private render() {
    const viewList = this.list.slice(
      this.topIndex,
      this.topIndex + this.getSize.rows
    );
    viewList.forEach((li, idx) => {
      const text =
        this.curIndex === this.topIndex + idx ? chalk.bgBlue(li) : li;
      this.clearLine(idx);
      this.printAt(text, { x: 0, y: idx });
    });
  }

  private moveCursor(index: number) {
    this.curIndex += index;
    if (this.curIndex < 0) {
      this.curIndex = 0;
    }
    if (this.curIndex >= this.list.length) {
      this.curIndex = this.list.length - 1;
    }

    // 判断是否移动到边界
    if (this.curIndex >= this.topIndex + this.getSize.rows) {
      this.topIndex += 1;
    }
    if (this.curIndex < this.topIndex) {
      this.topIndex -= 1;
    }
    this.clear();
  }

  protected clear() {
    for (let row = 0; row < this.getSize.rows; row++) {
      this.clearLine(row);
    }
  }

  onKeyInput(name: string) {
    if (name !== 'up' && name !== 'down') {
      return;
    }
    if (name === 'up') {
      this.moveCursor(-1);
    }
    if (name === 'down') {
      this.moveCursor(1);
    }
    this.render();
  }
}

const list = new ScrollList([
  '红楼梦',
  '西游记',
  '水浒传',
  '三国演义',
  '儒林外史',
  '金瓶梅',
  '聊斋志异',
  '白鹿原',
  '平凡的世界',
  '围城',
  '活着',
  '百年孤独',
  '围城',
  '红高粱家族',
  '梦里花落知多少',
  '倾城之恋',
  '悲惨世界',
  '哈利波特',
  '霍乱时期的爱情',
]);

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.sequence === '\u0003') {
    process.stdout.write(anisEscape.clearTerminal);
    process.exit();
  }
  list.onKeyInput(key.name);
});
