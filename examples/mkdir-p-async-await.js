'use strict';

// require dependencies
try {
  var mkdirParents = require('../mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}
var fs = require('fs');

// async await style function
async function sub() {
  var dir = '/tmp/deep/dir';
  var mode = parseInt('0777', 8);

  try {
    await mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
}

async function main() {
  await Promise.all([sub(), sub(), sub()]);

  try { fs.rmdirSync('/tmp/deep/dir'); }
  catch (err) { console.error('ignore: ' + err); }
  try { fs.rmdirSync('/tmp/deep'); }
  catch (err) { console.error('ignore: ' + err); }
}

main();
