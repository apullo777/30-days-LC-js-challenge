/* Day2: 2620. Counter
Given an integer n, return a counter function. 
This counter function initially returns n 
and then returns 1 more than the previous value 
every subsequent time it is called (n, n + 1, n + 2, etc). */


// closure
var createCounter = function(n, step = 1) {
    var count = n - 1;
    return function increaseCount() {
        count = count + step;
        return count
    };
};

// postfix + arrow
var createCounter = (n) => () => n++

// prefix + arrow
var createCounter = (n) => {
    --n;
    return () => ++n
}