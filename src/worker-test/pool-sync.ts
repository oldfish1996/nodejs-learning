import os from 'node:os';

function calc(num: number) {
  let total = 0;
  for (let i = 0; i < num; i++) {
    total += i;
  }
  return total;
}

const poolSize = os.cpus().length;

const start = Date.now();

for (let i = 0; i < poolSize; i++) {
  const value = Math.random() * 1e9;
  const res = calc(value);
  console.log(`第${i}个线程计算出结果： ${res}`);
}

const end = Date.now();

console.log('Time cost ', end - start);
