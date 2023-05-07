
/** Write a function createCounter. It should accept an initial integer init. 
* It should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it. */


/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */

// 1. Using function declaration

var createCounter = function(init) {
    let counter = init;
    return {
        increment: function() {
        return ++counter;
        },
        decrement: function() {
        return --counter;
        },
        reset: function() {
        counter = init;
        return counter
        }
    }
};

// 2. Using arrow function

var createCounter = function(init) {
    let counter = init;
    return {
        increment: () => ++counter,
        decrement: () => --counter,
        reset: () => (counter = init)
    };
};

// 3. separate functions
var createCounter = function(init) {
    let counter = init;

    function increment() {
        return ++counter;
    }
    function decrement() {
        return --counter;
    }
    function reset() {
        return (counter = init);
    }
    return { increment, decrement, reset };
};


// 4. Using class

class Counter {
    constructor(init) {
        this.init = init;
        this.counter = init;
    }

    increment() {
        return ++this.counter;
    }
    decrement() {
        return --this.counter;
    }
    reset() {
        return (this.counter = this.init);
    }
}

var createCounter = function(init) {
    return new Counter(init);
};

// 5. Using Proxy

var createCounter = function(init) {
    let counter = init;
    return new Proxy({}, {
        get: (target, key) => {
            switch(key) {
                case "increment":
                    return () => ++counter;
                case "decrement":
                    return () => --counter;
                case "reset":
                    return () => (counter = init);
                default:
                    throw Error("unexpected key")
            }
        },
    });
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */