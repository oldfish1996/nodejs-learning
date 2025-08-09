import EventEmitter from 'node:events';

class MyEmitter extends EventEmitter {}

const em = new MyEmitter();

em.on('aaa', (data) => {
  console.log('aaa event', data);
});

em.once('bbb', (data) => {
  console.log('bbb event', data);
});

em.emit('aaa', 1);
em.emit('aaa', 2);
em.emit('bbb', 3);
em.emit('bbb', 4);
