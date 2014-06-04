// require dependencies

'use strict';

var co = require('co');
try {
  var mkdirParentsSync = require('../lib/mkdir-parents').sync;
} catch (err) {
  var mkdirParentsSync = require('mkdir-parents').sync;
}

var fs = require('fs');

var dir = '/tmp/deep/dir';
var mode = parseInt('0777', 8);
try {
  mkdirParentsSync(dir, mode);
  console.log(dir + ' created with perm 0' + mode.toString(8));
} catch (err) {
  console.log(dir + ' cant created with status ' + err);

  try { fs.rmdirSync('/tmp/deep/dir'); } catch (err) { /* ignore */ }
  try { fs.rmdirSync('/tmp/deep'); } catch (err) { /* ignore */ }
}
