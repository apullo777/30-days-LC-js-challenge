
/** Day4: 2635. Apply Transform Over Each Element in Array
Given an integer array arr and a mapping function fn, 
return a new array with a transformation applied to each element.
The returned array should be created such that returnedArray[i] = fn(arr[i], i).
Please solve it without the built-in Array.map method. */

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */

// for loop + empty array
var map = function(arr, fn) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = fn(arr[i], i)
    }
    return newArr
};

//  preallocate array
var map = function(arr, fn) {
    const newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        newArr[i] = fn(arr[i], i);
    }
    return newArr;
};

// In-memory transformation
var map = function(arr, fn) {
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = fn(arr[i], i);
    }
    return arr;
};

// forEach
var map = function(arr, fn) {
    const newArr = [];
    arr.forEach((item, index) => {
        newArr.push(fn(item, index))
    })
    return newArr
}

// reduce
var map = function(arr, fn) {
    return arr.reduce((acc, item, index) => {
        acc.push(fn(item, index))
        return acc
    }, [])
}

// for...in loop
var map = function(arr, fn) {
    const newArr = [];
    for (const i in arr) {
        newArr[i] = fn(arr[i], Number(i));
    }
    return newArr
}

// for...of loop
var map = function(arr, fn) {
    const newArr = [];
    for (const item of arr) {
        newArr.push(fn(item, arr.indexOf(item)))
    }
    return newArr
}

// while loop
var map = function(arr, fn) {
    const newArr = [];
    let i = 0;
    while (i < arr.length) {
        newArr.push(fn(arr[i], i))
        i++
    }
    return newArr
}

// filter
var map = function(arr, fn) {
    const newArr = [];
    arr.filter((item, index) => {
        newArr.push(fn(item, index))
    })
    return newArr
}

// recursion
var map = function(arr, fn, i = 0, newArr = []) {
    if (i === arr.length) return newArr;
    newArr.push(fn(arr[i], i));
    return map(arr, fn, ++i, newArr);
}

// do...while loop
var map = function(arr, fn) {
    const newArr = [];
    let i = 0;
    do {
        newArr.push(fn(arr[i], i))
        i++
    } while (i < arr.length);
    return newArr
}