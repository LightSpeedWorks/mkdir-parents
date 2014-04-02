// require dependencies
var co = require('co');
try {
  var mkdirParents = require('mkdir-parents');
} catch (err) {
  var mkdirParents = require('../lib/mkdir-parents');
}

// co generator
co(function *() {
  var dir = '/tmp/deep/dir';
  var mode = 0777;
  try {
    yield mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
})();
