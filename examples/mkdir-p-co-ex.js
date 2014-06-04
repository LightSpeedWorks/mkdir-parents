// require dependencies

'use strict';

var co = require('co');

try {
  var mkdirParents = require('../lib/mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}

var fs = require('fs');

// co generator
co(function *() {
  var dir = '/tmp/deep/dir';
  var mode = parseInt('0777', 8);
  try {
    yield mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }

  try { fs.rmdirSync('/tmp/deep/dir'); } catch (err) { /* ignore */ }
  try { fs.rmdirSync('/tmp/deep'); } catch (err) { /* ignore */ }
})();
