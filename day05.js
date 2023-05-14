/*** Day5: 2634. Filter Elements from Array
Given an integer array arr and a filtering function fn, 
return a new array with a fewer or equal number of elements.
The returned array should only contain elements where fn(arr[i], i) evaluated to a truthy value.
Please solve it without the built-in Array.filter method. */

/** Example:
Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
Output: [1]
Explanation:
fn can also accept the index of each element
In this case, the function removes elements not at index 0 */

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */

// for loop + push to new array
var filter = function(arr, fn) {
    newArr = []
    for (i= 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            newArr.push(arr[i])
        }
    }
    return newArr
};

// preallocate array
var filter = function(arr, fn) {
    const newArr = new Array(arr.length);
    let size = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (fn(arr[i], i)) {
            newArr[size] = arr[i];
            size++;
        }
    }
    // truncate the array
    while (newArr.length > size) {
        newArr.pop();
    }
    return newArr
};

// in-place filter
var filter = function(arr, fn) {
    let size = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (fn(arr[i], i)) {
            arr[size] = arr[i];
            size++;
        }
    }
    // truncate the array
    while (arr.length > size) {
        arr.pop();
    }
    return arr
}