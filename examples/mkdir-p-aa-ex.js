'use strict';

// require dependencies
try {
  var mkdirParents = require('../mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}
var fs = require('fs');
var aa = require('./aa-gtor-all');

function *main() {
  var dir = '/tmp/deep/dir';
  var mode = parseInt('0777', 8);

  try {
    yield mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
}

// aa with generator
aa.all([aa(main), aa(main), aa(main)])
.then(function () {
  try { fs.rmdirSync('/tmp/deep/dir'); }
  catch (err) { console.error('ignore: ' + err); }
  try { fs.rmdirSync('/tmp/deep'); }
  catch (err) { console.error('ignore: ' + err); }
  console.log('end');
});
