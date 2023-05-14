/** Day 10: 2632. Curry
Given a function fn, return a curried version of that function.
A curried function is a function that accepts fewer or an equal number of parameters 
as the original function and returns either another curried function 
or the same value the original function would have returned.

In practical terms, if you called the original function like sum(1,2,3), 
you would call the curried version like csum(1)(2)(3), csum(1)(2,3), csum(1,2)(3), or csum(1,2,3). 
All these methods of calling the curried function should return the same value as the original. */

/**
 * @param {Function} fn
 * @return {Function}
 */

// We implement currying by checking the availability of sufficient arguments.
// It either invokes the function or returns a curried version that can receive additional arguments.


// Implement curry() using the arguments object
var curry = function(fn) {
    return function curried() {
        // convert arguments to array
        var args = Array.prototype.slice.call(arguments);
        // if enough arguments, call fn
        if (args.length >= fn.length) {
            return fn.apply(null, args);
        }
        // otherwise, return curried function
        return function() {
            var args2 = Array.prototype.slice.call(arguments);
            return curried.apply(null, args.concat(args2));
        };
    };
};

// Implement curry() using the spread/rest and recursion
var curry = function(fn) {
   return function curried(...args) {
      // if enough arguments, call fn
      if(args.length >= fn.length) {
         return fn(...args);
      }
      // otherwise, return curried function
      return (...nextArgs) => curried(...args, ...nextArgs);
   };
};

// Implement curry() using spread/rest and bind()
var curry = function(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) {
            return fn(...args);
        }
        return curried.bind(null, ...args);
    };
};

/**
 * function sum(a, b) { return a + b; }
 * const csum = curry(sum);
 * csum(1)(2) // 3
 */