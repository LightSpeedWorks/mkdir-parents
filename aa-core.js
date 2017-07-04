var aa = function () {
	'use strict';

	var nextTickTasks = [], nextTickProgress = false, nextTickCount = 1;
	var nextTickDo =
		typeof Promise === 'function' && typeof Promise.resolve === 'function' ?
			function resolvePromise(fn) { Promise.resolve().then(fn); } :
			typeof process === 'object' && typeof process.nextTick === 'function' ?
				process.nextTick :
				typeof setImmediate === 'function' ? setImmediate :
					function setTimeout_(fn) { setTimeout(fn, 0) };

	var slice = [].slice;

	return aa;

	// *** aa
	function aa(setup, cb) {
		if (setup != null) {
			if (typeof setup.then === 'function')
				return aa(function (res, rej) { setup.then(res, rej); }, cb);
		}

		if (typeof setup !== 'function')
			throw new TypeError('first argument "setup" must be a function');

		// callback mode
		if (typeof cb === 'function') {
			var last = function (err, val) {
				var args = arguments.length > 2 ? [err, slice.call(arguments, 1)] :
					arguments.length === 1 && !(err instanceof Error) ? [null, err] :
						arguments;
				cb.apply(null, args);
			};
			try {
				var r = setup(last, last);

				if (r != null && typeof r.then === 'function')
					return aa(function (res, rej) { r.then(res, rej); }, cb);

				return;
			}
			catch (err) { cb(err); return; }
		}

		// promise & thunk mode

		var called = false, bombs = [], results;

		var fire = function fire() {
			if (!results) return;
			var bomb;
			while (bomb = bombs.shift())
				bomb.apply(null, results);
		}; // fire

		var callback = function callback(err, val) {
			if (!results)
				results = arguments.length > 2 ? [err, slice.call(arguments, 1)] :
					arguments.length === 1 && !(err instanceof Error) ? [null, err] :
						arguments;
			nextTick(fire);
		}; // callback

		// pre-setup
		if (cb === true)
			try {
				called = true;
				var r = setup(callback, callback);

				if (r != null && typeof r.then === 'function')
					return aa(function (res, rej) { r.then(res, rej); }, cb);
			}
			catch (err) { callback(err); }

		var thunk = function thunk(cb) {
			var next, thunk = aa(function (cb) { next = cb; }, true);

			try {
				if (!called) {
					called = true;
					var r = setup(callback, callback);

					if (r != null && typeof r.then === 'function')
						aa(function (res, rej) { r.then(res, rej); }, callback);
				}
			} catch (err) { next(err); }

			bombs.push(function (err, val) {
				try {
					var r = cb.apply(null, arguments);
					next(null, r);
				}
				catch (err) { next(err); }
			});

			if (results) nextTick(fire);

			return thunk;
		}; // thunk

		thunk.then = function then(res, rej) {
			return thunk(function (err, val) {
				return err ?
					typeof rej === 'function' ? rej(err) : err :
					typeof res === 'function' ? res(val) : val;
			});
		}; // then

		thunk['catch'] = function (rej) {
			return thunk(function (err, val) {
				return err ?
					typeof rej === 'function' ? rej(err) : err :
					val;
			});
		}; // catch

		return thunk;
	} // aa

	// *** nextTick
	function nextTick(fn) {
		nextTickTasks.push(fn);
		if (nextTickProgress) return;
		nextTickProgress = true;
		if (--nextTickCount >= 0) return nextTickCount = 100, nextTickExecutor();
		nextTickDo(nextTickExecutor);
	} // nextTick

	// *** nextTickExecutor
	function nextTickExecutor() {
		while (nextTickTasks.length) (nextTickTasks.shift())();
		nextTickProgress = false;
	} // nextTickExecutor

}();

if (typeof module === 'object' && module && module.exports)
	module.exports = aa;
