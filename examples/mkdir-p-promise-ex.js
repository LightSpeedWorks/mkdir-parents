'use strict';

// require dependencies
try {
  var mkdirParents = require('../mkdir-parents');
} catch (err) {
  var mkdirParents = require('mkdir-parents');
}

const dir = '/tmp/deep/dir';
const mode = parseInt('0777', 8);

//mkdirParents(dir, mode)
//.then(() => console.log(dir + ' created with perm 0' + mode.toString(8)))
//.catch(err => console.log(dir + ' cant created with status ' + err));

Promise.all([
  mkdirParents(dir, mode)
  .then(() => console.log(dir + ' created with perm 0' + mode.toString(8))),
  mkdirParents(dir, mode)
  .then(() => console.log(dir + ' created with perm 0' + mode.toString(8))),
  mkdirParents(dir, mode)
  .then(() => console.log(dir + ' created with perm 0' + mode.toString(8)))
])
.then(() => console.log('end'))
.catch(err => console.log(dir + ' cant created with status ' + err));
