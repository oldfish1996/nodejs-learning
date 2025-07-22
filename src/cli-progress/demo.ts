import ansiEscapes from 'ansi-escapes';

const log = process.stdout.write.bind(process.stdout);

log(ansiEscapes.cursorHide);
log(ansiEscapes.cursorSavePosition);
log('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');

setTimeout(() => {
  log(ansiEscapes.cursorRestorePosition);
  log('████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 1000);

setTimeout(() => {
  log(ansiEscapes.cursorRestorePosition);
  log('████████████████░░░░░░░░░░░░░░░░░░░░░░░░');
}, 2000);

setTimeout(() => {
  log(ansiEscapes.cursorRestorePosition);
  log('████████████████████████████████████████');
}, 3000);
