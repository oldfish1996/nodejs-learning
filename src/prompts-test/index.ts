import readline from 'node:readline';
import EventEmitter from 'node:events';
import ansiEscape from 'ansi-escapes';
import chalk from 'chalk';

interface Key {
  name: string;
  sequence: string;
}

abstract class BasePrompt extends EventEmitter {
  protected value = '';
  private rl: readline.Interface;
  private bundleKeypress: (str: string, key: Key) => void;

  constructor() {
    super();

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    this.rl = readline.createInterface({ input: process.stdin });

    this.bundleKeypress = this.onKeypress.bind(this);

    process.stdin.on('keypress', this.bundleKeypress);
  }

  abstract onKeyInput(str: string, key: Key): void;

  private onKeypress(str: string, key: Key) {
    if (key.sequence === '\u0003') {
      process.exit();
    }
    if (key.name === 'return') {
      this.close();
      return;
    }
    this.onKeyInput(str, key);
  }

  private close() {
    process.stdout.write('\n');

    process.stdin.removeListener('keypress', this.bundleKeypress);
    process.stdin.setRawMode(false);

    this.rl.close();
    this.emit('submit', this.value);
  }
}

interface TextPromptOptions {
  type: 'text';
  name: string;
  message: string;
}

function isNonPrintableChar(char: string) {
  return /^[\x00-\x1F\x7F]$/.test(char);
}

class TextPrompt extends BasePrompt {
  private write = process.stdout.write.bind(process.stdout);
  private cursor = 0;
  constructor(private options: TextPromptOptions) {
    super();
  }

  onKeyInput(str: string, key: Key): void {
    if (key.name === 'backspace') {
      this.cursor--;
      this.value = this.value.slice(0, this.cursor);
    }

    if (!isNonPrintableChar(str)) {
      this.value += str;
      this.cursor++;
    }

    this.render();
  }

  public render() {
    this.write(ansiEscape.eraseEndLine);
    this.write(ansiEscape.cursorTo(0));

    this.write(
      [
        chalk.bold(this.options.message),
        chalk.grey('>'),
        ' ',
        chalk.blue(this.value),
      ].join('')
    );

    // this.write(ansiEscape.cursorSavePosition);
    // this.write(ansiEscape.cursorDown(1) + ansiEscape.cursorTo(0));

    // if (this.value === '') {
    //   this.write(chalk.red('请输入名字'));
    // } else {
    //   this.write(ansiEscape.eraseLine);
    // }

    // this.write(ansiEscape.cursorRestorePosition);
  }
}

type PromptOptions = TextPromptOptions;
const map = {
  text: TextPrompt,
};
async function runPrompt(question: PromptOptions) {
  const promptClass = map[question.type];

  if (!promptClass) {
    return null;
  }
  return new Promise((resolve) => {
    const prompt = new promptClass(question);

    prompt.render();

    prompt.on('submit', (ans: string) => {
      resolve(ans);
    });
  });
}

async function prompt(questions: PromptOptions[]) {
  const answers: Record<string, any> = {};
  for (let i = 0; i < questions.length; i++) {
    const name = questions[i].name;
    answers[name] = await runPrompt(questions[i]);
  }
  return answers;
}

// test
(async () => {
  const questions: PromptOptions[] = [
    {
      type: 'text',
      name: 'name',
      message: '输入你的名字',
    },
    {
      type: 'text',
      name: 'age',
      message: '输入你的年龄',
    },
  ];
  const answers = await prompt(questions);
  console.log(answers);
})();
