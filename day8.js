/** Day 8: 2666. Allow One Function Call
Given a function fn, return a new function that is identical to the original function 
except that it ensures fn is called at most once.
The first time the returned function is called, it should return the same result as fn.
Every subsequent time it is called, it should return undefined. */

/**
 * @param {Function} fn
 * @return {Function}
 */

var once = function(fn) {
    return function(...args){
        if (fn) {
            let result = fn(...args);
            fn = null;
            return result;
        }
    }
};

// rest syntax
var once = function(fn) {
    let called = false;
    return function(...args){
        if (called) {
            return undefined;
        } else {
            called = true;
            return fn(...args);
        }
    }
};

// implicitly returned undefied
var once = function(fn) {
    let called = false;
    return function(...args){
        if (!called) {
            called = true;
            return fn(...args);
        }
    }
};

// bind context
var once = function(fn) {
    let called = false;
    return function(...args) {
        if (!called) {
            called = true;
            return fn.apply(this, args);
        }
    }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn