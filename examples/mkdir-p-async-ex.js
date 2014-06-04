// require dependencies

'use strict';

var co = require('co');

try {
  var mkdirParents = require('../lib/mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}

var fs = require('fs');

var dir = '/tmp/deep/dir';
var mode = parseInt('0777', 8);
function callback(err) {
  if (err) {
    console.log(dir + ' cant created with status ' + err);
  } else {
    console.log(dir + ' created with perm 0' + mode.toString(8));
  }

  try { fs.rmdirSync('/tmp/deep/dir'); } catch (err) { /* ignore */ }
  try { fs.rmdirSync('/tmp/deep'); } catch (err) { /* ignore */ }
}
mkdirParents(dir, mode, callback);
mkdirParents(dir, mode, callback);
mkdirParents(dir, mode, callback);
