import prompts, { PromptObject } from 'prompts';

(async () => {
  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'name',
      message: 'your name',
      initial: 'oldfish',
    },
    {
      type: 'number',
      name: 'age',
      message: 'your age',
      validate: (age) => (age < 18 ? '小于18岁不能h使用' : true),
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Are you confirm?',
    },
    {
      type: 'select',
      name: 'lang',
      message: ' Choose your lang',
      choices: [
        { title: 'C', description: 'C', value: 'c' },
        { title: 'Java', description: 'Java', value: 'java' },
        { title: 'Python', value: 'python' },
        { title: 'Javascript', value: 'js' },
      ],
    },
  ];

  const response = await prompts(questions);

  console.log(response);
})();
