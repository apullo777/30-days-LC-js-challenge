
/* Day1: 2667. Create Hello World Function 
Write a function createHelloWorld. 
It should return a new function that always returns "Hello World". */

/// function syntax
var createHelloWorld = function() {
    return function() {
        return "Hello World";
    };
};

/// arrow syntax 1
var createHelloWorld = function() {
    return () => "Hello World";
};

/// arrow syntax 2  
var createHelloWorld = () => () => "Hello World"
