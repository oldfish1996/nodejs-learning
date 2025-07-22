import ansiEscape from 'ansi-escapes';
import chalk from 'chalk';

const log = process.stdout.write.bind(process.stdout);

class Bar {
  total: number = 0;
  value: number = 0;

  constructor() {}

  start(total: number, initValue: number) {
    this.total = total;
    this.value - initValue;

    log(ansiEscape.cursorHide);
    log(ansiEscape.cursorSavePosition);
    this.render();
  }

  update(value: number) {
    this.value = value;
    log(ansiEscape.cursorRestorePosition);
    this.render();
  }

  getTotal() {
    return this.total;
  }

  stop() {
    log(ansiEscape.cursorShow);
    log('\n');
  }

  render() {
    const barSize = 40;
    let progress = this.value / this.total;

    if (progress > 1) {
      progress = 1;
      this.value = this.total;
    }

    const completeSize = Math.floor(progress * barSize)

    log(chalk.green('█').repeat(completeSize));
    log(chalk.green('░').repeat(40 - completeSize));
    log(`  ${this.value} / ${this.total}`);
  }
}

const bar = new Bar();

let value = 0;

bar.start(200, 0);

const timer = setInterval(() => {
  value++;

  bar.update(value);

  if (value > bar.getTotal()) {
    clearInterval(timer);
    bar.stop();
  }
}, 20);
