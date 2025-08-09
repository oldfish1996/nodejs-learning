import os from 'node:os';

console.log('aaa' + os.EOL + 'bbb');

// console.log(os.cpus());

console.log(os.type());
console.log(os.userInfo());
console.log(os.freemem(), os.totalmem());
console.log(os.homedir());
