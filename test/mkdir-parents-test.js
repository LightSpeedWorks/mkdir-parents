// mkdir-parents-test.js

'use strict';

var fs = require('fs');
var path = require('path');

var mkdirParents = require('../lib/mkdir-parents').mkdirParents;
var mkdirParentsSync = require('../lib/mkdir-parents').mkdirParentsSync;

var num = 0;
var dirs = [];

function doSync(dir) {
  dirs.push(dir);
  mkdirParentsSync(dir);
}

function doAsync(dir, cb) {
  dirs.push(dir);
  mkdirParents(dir, cb);
  ++num;
}

var code = 0;
function callback(err) {
  // print errors
  if (err) {
    console.log('' + err);
    code = 1;
  }

  // finish?
  if (--num === 0) {
    finish();
    process.exit(code);
  }
}

function finish() {
  // remove all directories
  dirs.forEach(function (dir) {
    var names = dir.replace(/\\/g, '/').split('/');
    if (dir.slice(0, 2) === 'c:') {
      var delDir = 'c:/' + names[1];
    } else if (dir.slice(0, 5) === '/tmp/') {
      var delDir = '/tmp/' + names[2];
    }
    rmdirRecursiveSync(delDir);
  });
}

function rmdirRecursiveSync(dir) {
  if (!fs.existsSync(dir)) return;
  if (!fs.statSync(dir).isDirectory()) return fs.unlinkSync(dir);
  fs.readdirSync(dir).forEach(function (name) {
   rmdirRecursiveSync(path.resolve(dir, name));
  });
  return fs.rmdirSync(dir);
}


if (process.platform === 'win32') {
  doSync('c:\\xxxx1\\yyyy\\zzzz');
  doSync('c:\\wwww1\\xxxx\\yyyy\\xxxx');
  doSync('c:/xxxx2/yyyy/zzzz');
  doSync('c:/wwww2/xxxx/yyyy/xxxx');
  doSync('/tmp/xxxx1/yyyy/zzzz');
  doAsync('c:\\xxxx3\\yyyy\\zzzz', callback);
  doAsync('c:\\wwww3\\xxxx\\yyyy\\xxxx', callback);
  doAsync('c:/xxxx4/yyyy/zzzz', callback);
  doAsync('c:/wwww4/xxxx/yyyy/xxxx', callback);
}
else {
  doSync('/tmp/xxxx1/yyyy/zzzz');
  doSync('/tmp/wwww1/xxxx/yyyy/xxxx');
  doAsync('/tmp/xxxx2/yyyy/zzzz', callback);
  doAsync('/tmp/wwww2/xxxx/yyyy/xxxx', callback);
}
