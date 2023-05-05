
/* Day1: 2667. Create Hello World Function 
Write a function createHelloWorld. 
It should return a new function that always returns "Hello World". */

/// function syntax
var createHelloWorld = function() {
    return function() {
        return "Hello World";
    };
};

/// arrow syntax
var createHelloWorld = function() {
    return () => "Hello World";
};