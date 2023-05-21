/** Day 17: 2628. JSON Deep Equal
Given two objects o1 and o2, check if they are deeply equal.
For two objects to be deeply equal, they must contain the same keys, 
and the associated values must also be deeply equal. 
Two objects are also considered deeply equal if they pass the === equality check.

You may assume both objects are the output of JSON.parse. 
In other words, they are valid JSON.

Please solve it without using lodash's _.isEqual() function. */

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function(o1, o2) {
    // Your code here
    if (typeof o1 !== typeof o2) return false;
    if (typeof o1 !== 'object') return o1 === o2;
    if (o1 === null || o2 === null) return o1 === o2;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;
    if (Array.isArray(o1)) {
        if (o1.length !== o2.length) return false;
        for (let i = 0; i < o1.length; i++) {
        if (!areDeeplyEqual(o1[i], o2[i])) return false;
        }
        return true;
    }
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!areDeeplyEqual(o1[key], o2[key])) return false;
    }
    return true;
};

// stringify() + sorting

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
function helper(key, value) {
    if (value && typeof value === "object" && !Array.isArray(value))
        return Object.fromEntries(Object.entries(value).sort());
    else
        return value;
}

var areDeeplyEqual = function(o1, o2) {
    const stringifiedO1 = JSON.stringify(o1, helper);
    const stringifiedO2 = JSON.stringify(o2, helper);

    return stringifiedO1 === stringifiedO2;
};