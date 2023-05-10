/** Day 6: 2626. Array Reduce Transformation
Given an integer array nums, a reducer function fn, 
and an initial value init, return a reduced array.
A reduced array is created by applying the following operation: 

val = fn(init, nums[0]), 
val = fn(val, nums[1]), 
val = fn(val, nums[2]), 
... 
until every element in the array has been processed. 
The final value of val is returned.

If the length of the array is 0, it should return init.
Please solve it without using the built-in Array.reduce method. */

/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */

// for loop
var reduce = function(nums, fn, init) {
    let sum = init;
    for (let i = 0; i < nums.length; i++) {
        sum = fn(sum, nums[i])
    }
    return sum
};

// for...of loop
var reduce = function(nums, fn, init) {
    let sum = init;
    for (const num of nums) {
        sum = fn(sum, num);
    }
    return sum;
}

// forEach
var reduce = function(nums, fn, init) {
    let sum = init;
    nums.forEach(num => {
        sum = fn(sum, num);
    })
    return sum;
}