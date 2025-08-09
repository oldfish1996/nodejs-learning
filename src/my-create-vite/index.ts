import minimist from 'minimist';
import chalk from 'chalk';
import prompts from 'prompts';

const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.yellow('vanilla-ts     vanilla')}
${chalk.green('vue-ts         vue')}
${chalk.cyan('react-ts       react')}
${chalk.cyan('react-swc-ts   react-swc')}
${chalk.magenta('preact-ts      preact')}
${chalk.redBright('lit-ts         lit')}
${chalk.red('svelte-ts      svelte')}
${chalk.blue('solid-ts       solid')}
${chalk.blueBright('qwik-ts        qwik')}`;

const argv = minimist<{
  template?: string;
  help?: boolean;
}>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template' },
  string: ['_'],
});

function formatDir(dir: string | undefined) {
  return dir?.trim().replace(/\/+/g, '');
}

const defaultDir = 'vite-project';

type FrameWork = {
  name: string;
  display: string;
  color: Function;
  variants: FrameWorkVariant[];
};

type FrameWorkVariant = {
  name: string;
  display: string;
  color: Function;
  customCommand?: string;
};

const framworks: FrameWork[] = [
  {
    name: 'Vue',
    display: 'Vue',
    color: chalk.green,
    variants: [
      {
        name: 'vue-ts',
        display: 'typescript',
        color: chalk.blue,
      },
      {
        name: 'vue',
        display: 'javascript',
        color: chalk.yellow,
      },
    ],
  },
  {
    name: 'React',
    display: 'React',
    color: chalk.green,
    variants: [
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: chalk.blue,
      },
      {
        name: 'react',
        display: 'JavaScript',
        color: chalk.yellow,
      },
      {
        name: 'react-swc',
        display: 'JavaScript + SWC',
        color: chalk.yellow,
      },
    ],
  },
];

const templates = framworks
  .map((f) => f.variants.map((v) => v.name))
  .reduce((pre, cur) => [...pre, ...cur], []);

// console.log(templates);

async function init() {
  const argTargetDir = formatDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
  }

  let targetDir = argTargetDir || defaultDir;

  let result: prompts.Answers<'projectName'> =
    {} as prompts.Answers<'projectName'>;

  try {
    result = await prompts(
      [
        {
          name: 'projectName',
          type: argTargetDir ? null : 'text',
          message: chalk.reset('Project name:'),
          initial: defaultDir,
          onState: (state) => {
            targetDir = formatDir(state.value) || defaultDir;
          },
        },
        {
          name: 'framework',
          type:
            argTemplate && templates.includes(argTemplate) ? null : 'select',
          message: chalk.reset('select a framework:'),
          initial: 0,
          choices: framworks.map((f) => ({
            title: f.color(f.display || f.name),
            value: f,
          })),
        },
        {
          name: 'variant',
          type: (f: FrameWork) => (f && f.variants ? 'select' : null),
          message: chalk.reset('select a variant:'),
          choices: (f: FrameWork) =>
            f.variants.map((v) => ({
              title: v.color(v.display || v.name),
              value: v.name,
            })),
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('x') + ' Operationcancelled');
        },
      }
    );
  } catch (e: any) {
    console.log(e.message);
  }

  console.log(result);
}

init().catch((e) => {
  console.log(e);
});
