import blessed from 'blessed';
import contrb from 'blessed-contrib';

const screen = blessed.screen({
  fullUnicode: true,
});

const lineChart = contrb.line({
  style: {
    line: 'yellow',
    text: 'green',
    baseline: 'blue',
  },
  label: '气温变化',
});

const data = {
  x: ['10.01', '10.02', '10.03', '10.04'],
  y: [6, 13, 8, 12],
};

screen.append(lineChart);

lineChart.setData([data]);

screen.key('C-c', () => {
  screen.destroy();
});

screen.render();
