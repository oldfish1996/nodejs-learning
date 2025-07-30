import blessed, { widget } from 'blessed';

const screen = blessed.screen({
  fullUnicode: true,
});

const table = blessed.table({
  parent: screen,
  width: '50%',
  height: 'shrink',
  top: 0,
  left: 0,
  border: 'line',
  align: 'center',
  tags: true,
  data: [
    ['姓名', '性别', '年龄', '电话号码'],
    ['东东', '男', '20', '13233334444'],
    ['光光', '男', '20', '13233332222'],
    ['小红', '女', '21', '13233335555'],
    ['小刚', '男', '22', '13233336666'],
  ],
  style: {
    border: {
      fg: 'white',
    },
    header: {
      fg: 'blue',
      bold: true,
    },
    cell: {
      fg: 'green',
    },
  },
});

screen.key('C-c', function () {
  screen.destroy();
});

screen.render();
