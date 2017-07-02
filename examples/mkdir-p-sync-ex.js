'use strict';

// require dependencies
try {
  var mkdirParentsSync = require('../mkdir-parents').sync;
} catch (err) {
  var mkdirParentsSync = require('mkdir-parents').sync;
}
var fs = require('fs');

function main() {
  var dir = '/tmp/deep/dir';
  var mode = parseInt('0777', 8);

  try {
    mkdirParentsSync(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
}

main();
main();
main();
try { fs.rmdirSync('/tmp/deep/dir'); }
catch (err) { console.error('ignore: ' + err); }
try { fs.rmdirSync('/tmp/deep'); }
catch (err) { console.error('ignore: ' + err); }

console.log('end');
