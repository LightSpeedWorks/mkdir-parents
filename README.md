mkdir-parents
=============

  **mkdir-parents** is a function like `mkdir -p`.

Usage
-----

### async example

```js
var mkdirParents = require('mkdir-parents');

var dir = '/tmp/deep/dir';
var mode = 0777;
mkdirParents(dir, mode, function (err) {
  if (err) {
    console.log(dir + ' cant created with status ' + err);
  } else {
    console.log(dir + ' created with perm 0' + mode.toString(8));
  }
});
```

### sync example

```js
var mkdirParentsSync = require('mkdir-parents').sync;

var dir = '/tmp/deep/dir';
var mode = 0777;
try {
  mkdirParentsSync(dir, mode);
  console.log(dir + ' created with perm 0' + mode.toString(8));
} catch (err) {
  console.log(dir + ' cant created with status ' + err);
}
```

License
-------

  MIT
