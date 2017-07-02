'use strict';

// require dependencies
try {
  var mkdirParents = require('../mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}
var fs = require('fs');

var dir = '/tmp/deep/dir';
var mode = parseInt('0777', 8);

var n = 0;
++n; mkdirParents(dir, mode)(callback);
++n; mkdirParents(dir, mode)(callback);
++n; mkdirParents(dir, mode)(callback);

function callback(err) {
  if (err) {
    console.log(dir + ' cant created with status ' + err);
  } else {
    console.log(dir + ' created with perm 0' + mode.toString(8));
  }

  if (--n === 0) end();
}

function end() {
  try { fs.rmdirSync('/tmp/deep/dir'); }
  catch (err) { console.error('ignore: ' + err); }
  try { fs.rmdirSync('/tmp/deep'); }
  catch (err) { console.error('ignore: ' + err); }
  console.log('end');
}
