/** Day 16: 2676. Throttle
Given a function fn and a time in milliseconds t, 
return a throttled version of that function.

A throttled function is first called without delay and then, 
for a time interval of t milliseconds, can't be executed 
but should store the latest function arguments 
provided to call fn with them after the end of the delay.

For instance, t = 50ms, and the function was called at 30ms, 40ms, and 60ms. 
The first function call would block calling functions for the following t milliseconds. 
The second function call would save arguments, and 
the third call arguments should overwrite currently stored arguments 
from the second call because the second and third calls are called before 80ms. 
Once the delay has passed, the throttled function should be called 
with the latest arguments provided during the delay period, 
and it should also create another delay period of 80ms + t. */

// Approach 1: Recursive setTimeout Calls
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function(fn, t) {
    let timeoutInProgress = null;
    let argsToProcess = null;
  
    // This function is called when the timeout is over.
    const timeoutFunction = () => {
        if (argsToProcess === null) {
        timeoutInProgress = null; // enter the waiting phase
        } else { // enter the looping phase
        fn(...argsToProcess);
        argsToProcess = null;
        timeoutInProgress = setTimeout(timeoutFunction, t);
        }
    };

    // This function is called when the throttled function is called.
    return function throttled(...args) {
        if (timeoutInProgress) {
        argsToProcess = args; // enter the waiting phase
        } else {
        fn(...args); // enter the looping phase
        timeoutInProgress = setTimeout(timeoutFunction, t);
        }
    }
};

// Approach 2: setInterval + clearInterval
var throttle = function(fn, t) {
    let intervalInProgress = null;
    let argsToProcess = null;
  
    const intervalFunction = () => {
        if (argsToProcess === null) {
        clearInterval(intervalInProgress);
        intervalInProgress = null; // enter the waiting phase
        } else {
        fn(...argsToProcess);
        argsToProcess = null;
        }
    };

    return function throttled(...args) {
        if (intervalInProgress) {
            argsToProcess = args;
        } else {
        fn(...args); // enter the looping phase
        intervalInProgress = setInterval(intervalFunction, t);
        }
    }
};

/**
 * const throttled = throttle(console.log, 100);
 * throttled("log"); // logged immediately.
 * throttled("log"); // logged at t=100ms.
 */




/** 
To give a concrete example of throttle in action:

const start = Date.now();
function log(id) {
  console.log(id, Date.now() - start);
}

setTimeout(() => log(1), 10); // logs: 1, 10
setTimeout(() => log(2), 15); // logs: 2, 15
setTimeout(() => log(3), 20); // logs: 3, 20
setTimeout(() => log(4), 60); // logs: 4, 60
setTimeout(() => log(5), 70); // logs: 5, 70 

However, if we throttle the log function:

const start = Date.now();
function log(id) {
  console.log(id, Date.now() - start);
}
const throttledLog = debounce(log, 20);

setTimeout(() => throttledLog(1), 10); // logs: 1, 10
setTimeout(() => throttledLog(2), 15); // cancelled
setTimeout(() => throttledLog(3), 20); // logs: 3, 30
setTimeout(() => throttledLog(4), 60); // logs: 4, 60
setTimeout(() => throttledLog(5), 70); // logs: 5, 80 

In the above example, log is immediately called at t=10ms 
because that was the first time throttledLog was called. 
The call at t=15ms is cancelled by the call at t=20ms. 
The call at t=20ms is delayed until t=10+20=30ms. 
Similar to the first call, the call at t=60ms is immediately evaluated 
because there were no recent calls before that. 
And the call at t=70ms was also delayed by 10ms.*/

