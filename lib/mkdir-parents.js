// mkdir-parents.js

'use strict';

var fs = require('fs');
var path = require('path');


//######################################################################
/**
 * Function: make directory with parents recursively (async)
 * Param   : dir: path to make directory
 *           [mode]: {optional} file mode to make directory
 *           [cb]: {optional} callback(err) function
 */
function mkdirParents(dir, mode, cb) {
  // check arguments
  if (typeof dir !== 'string')
    throw new Error('mkdirParent: directory path required');

  if (typeof mode === 'function') {
    cb = mode;
    mode = undefined;
  }

  if (mode !== undefined && typeof mode !== 'number')
    throw new Error('mkdirParent: mode must be a number');

  if (cb !== undefined && typeof cb !== 'function')
    throw new Error('mkdirParent: callback must be function');

  var ctx = this, called, results;

  // local variables
  var dirList = []; // directories that we have to make directory

  fs.exists(dir, existsCallback);

  // fs.exists callback...
  function existsCallback(exists) {
    if (exists) {
      return mkdirCallback(null);
    }

    // if dir does not exist, then we have to make directory
    dirList.push(dir), dir = path.resolve(dir, '..');

    return fs.exists(dir, existsCallback);
  } // existsCallback

  // fs.mkdir callback...
  function mkdirCallback(err) {
    if (err && err.code !== 'EEXIST') {
      return mkdirParentsCallback(err);
    }

    dir = dirList.pop();
    if (!dir) {
      return mkdirParentsCallback(null);
    }

    return fs.mkdir(dir, mode, mkdirCallback);
  } // mkdirCallback

  // mkdirParentsCallback(err)
  function mkdirParentsCallback(err) {
    if (err && err.code === 'EEXIST') arguments[0] = null;
    if (!results) results = arguments;
    if (!cb || called) return;
    called = true;
    cb.apply(ctx, results);
  } // mkdirParentsCallback

  // return mkdirParentsYieldable
  return function mkdirParentsYieldable(fn) {
    if (!cb) cb = fn;
    if (!results || called) return;
    called = true;
    cb.apply(ctx, results);
  }; // mkdirParentsYieldable

} // mkdirParents


//######################################################################
/**
 * Function: make directory with parents recursively (sync)
 * Param   : dir: path to make directory
 *           mode: file mode to make directory
 */
function mkdirParentsSync(dir, mode) {
  // check arguments
  if (typeof dir !== 'string') {
    throw new Error('mkdirParentSync: directory path required');
  }

  var dirList = [];
  while (!fs.existsSync(dir)) {
    dirList.push(dir);
    dir = path.resolve(dir, '..');
  }

  while (dir = dirList.pop()) {
    fs.mkdirSync(dir, mode);
  }

} // mkdirParentsSync


exports = module.exports = mkdirParents;
exports.mkdirParents     = mkdirParents;
exports.mkdirParentsSync = mkdirParentsSync;
exports.sync             = mkdirParentsSync;
