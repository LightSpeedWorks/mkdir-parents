// require dependencies
var co = require('co');
try {
  var mkdirParentsSync = require('mkdir-parents').sync;
} catch (err) {
  var mkdirParentsSync = require('../lib/mkdir-parents').sync;
}

var dir = '/tmp/deep/dir';
var mode = 0777;
try {
  mkdirParentsSync(dir, mode);
  console.log(dir + ' created with perm 0' + mode.toString(8));
} catch (err) {
  console.log(dir + ' cant created with status ' + err);
}
