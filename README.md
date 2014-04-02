mkdir-parents
=============

  **mkdir-parents** is a function like `mkdir -p`.

  This function is also yieldable, thunkified, useful with co.

Installation
------------

```bash
$ npm install mkdir-parents
```

Usage
-----

```js
var mkdirParents = require('mkdir-parents');
```

### `mkdirParents`

#### **dir** - directory path name

#### **[mode]** - {optional} permission

#### **[callback]** - {optional} function callback(err)

#### **retuns** - thunk for `co`

### `mkdirParents.sync` or `mkdirParents.mkdirParentsSync`

#### **dir** - directory path name

#### **[mode]** - {optional} permission

Examples
--------

### co example

```js
// require dependencies
var co = require('co');
var mkdirParents = require('mkdir-parents');

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
```

### async example

```js
// require dependencies
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
// require dependencies
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
