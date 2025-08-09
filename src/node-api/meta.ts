import url from 'node:url';

console.log(import.meta.url);
console.log(import.meta.resolve('./a.js'));

const a = new URL('https://www.aaa.com');
console.log(a);

console.log(global.URL === url.URL);
