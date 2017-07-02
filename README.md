[mkdir-parents](https://www.npmjs.com/package/mkdir-parents) - npm
=============

  **mkdir-parents** is a function like `mkdir -p`.

  This function returns promise, async/await ready,
  also yieldable, thunkified, promisified, useful with `aa` or `co`.

Installation
------------

[![NPM](https://nodei.co/npm/mkdir-parents.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mkdir-parents/)
[![NPM](https://nodei.co/npm-dl/mkdir-parents.png?height=2)](https://nodei.co/npm/mkdir-parents/)

```bash
$ npm install mkdir-parents
```

Usage
-----

```js
const mkdirParents = require('mkdir-parents');
```

### `mkdirParents(dir, [mode], [callback])`

+ **dir** - directory path name
+ **[mode]** - {optional} permission
+ **[callback]** - {optional} function callback(err)
+ **retuns** - promise, thunk for `aa` or `co`. returns undefined if callback is specified.

### `mkdirParents.sync(dir, [mode])` or `mkdirParents.mkdirParentsSync(dir, [mode])`

+ **dir** - directory path name
+ **[mode]** - {optional} permission

Examples
--------

### async await example

```js
// require dependencies
const mkdirParents = require('mkdir-parents');

// async await style function
async function main() {
  const dir = '/tmp/deep/dir';
  const mode = parseInt('0777', 8);

  try {
    await mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
}

main();
```

### promise example

```js
// require dependencies
const mkdirParents = require('mkdir-parents');

const dir = '/tmp/deep/dir';
const mode = parseInt('0777', 8);

mkdirParents(dir, mode)
.then(() => console.log(dir + ' created with perm 0' + mode.toString(8)))
.catch(err => console.log(dir + ' cant created with status ' + err));
```

### async await with `aa` or `co` example

```js
// require dependencies
const mkdirParents = require('mkdir-parents');
const aa = require('aa');

// aa with generator
aa(function *() {
  var dir = '/tmp/deep/dir';
  var mode = parseInt('0777', 8);

  try {
    yield mkdirParents(dir, mode);
    console.log(dir + ' created with perm 0' + mode.toString(8));
  } catch (err) {
    console.log(dir + ' cant created with status ' + err);
  }
}).then(function () {});
```

### async example

```js
// require dependencies
var mkdirParents = require('mkdir-parents');

var dir = '/tmp/deep/dir';
var mode = parseInt('0777', 8);

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
var mode = parseInt('0777', 8);

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
