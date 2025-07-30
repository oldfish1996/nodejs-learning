import prompts from 'prompts';

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: (val) => (val < 18 ? 'it is 18+ only' : true),
  });
  console.log(response);
})();
