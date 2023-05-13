/** Day 9: 2623. Memoize
Given a function fn, return a memoized version of that function.
A memoized function is a function that will never be called twice with the same inputs. 
Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.
sum accepts two integers a and b and returns a + b.
fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise. */

/**
 * @param {Function} fn
 */

// Approach 1: Rest/Spread Syntax + JSON.stringify()
function memoize(fn) {
    const cache = {};
    return function(...args) {
        // convert arguments to string
        const key = JSON.stringify(args);

        // if the key exists in the cache, return the cached value
        if (key in cache) {
            return cache[key];
        }
        
        // otherwise, call the function and cache the value
        const functionOutput = fn(...args);
        cache[key] = functionOutput;
        return functionOutput;
    }
}

// Approach 2: Rest/Spread Syntax + Array.prototype.join()
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = args.join(',');
        if (key in cache) {
            return cache[key];
        }
        const functionOutput = fn(...args);
        cache[key] = functionOutput;
        return functionOutput;
    }
}

// Approach 3: Argument syntax
function memoize(fn) {
    const cache = {};
    return function() {
        // convert arguments to string
        let key = '';
        for (const arg of arguments) {
            key += ',' + arg;
        }

        if (key in cache) {
            return cache[key];
        }
        const functionOutput = fn(...arguments);
        cache[key] = functionOutput;
        return functionOutput;
    }
}

// Approach 3: Optimize Based on Numeric Constraints + Function.apply()

/*** based on the problem's constraints, 
 * there will never be more than two arguments, 
 * and the arguments will never be greater than 100,000, 
 * we can actually avoid converting them into a string. */

function memoize(fn) {
    // use a Map instead of an object
    const cache = new Map();
    return function() {
        let key = arguments[0];
        // if there is a second argument, add it to the key
        if (arguments[1]) {
            // multiply by a large prime number to avoid collisions
            key += arguments[1] * 100001;
        }

        // if the key exists in the cache, return the cached value
        if (cache.has(key)) {
            return cache.get(key);
        }
        // otherwise, call the function and cache the value
        const functionOutput = fn.apply(null, arguments);
        cache.set(key, functionOutput);
        return functionOutput;
    }
}

// Approach 4: One Liner
var memoize = (fn, cache = {}) => (...args) => cache[args.join()] ?? (cache[args.join()] = fn(...args)) 

/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */