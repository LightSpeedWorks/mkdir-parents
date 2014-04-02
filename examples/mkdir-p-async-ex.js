// require dependencies
var co = require('co');
try {
  var mkdirParents = require('mkdir-parents');
} catch (err) {
  var mkdirParents = require('../lib/mkdir-parents');
}

var dir = '/tmp/deep/dir';
var mode = 0777;
mkdirParents(dir, mode, function (err) {
  if (err) {
    console.log(dir + ' cant created with status ' + err);
  } else {
    console.log(dir + ' created with perm 0' + mode.toString(8));
  }
});
