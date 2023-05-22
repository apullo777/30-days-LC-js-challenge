/** Day 18: 2633. Convert Object to JSON String
Given an object, return a valid JSON string of that object. 
You may assume the object only inludes strings, integers, arrays, objects, booleans, and null. 
The returned string should not include extra spaces. 
The order of keys should be the same as the order returned by Object.keys().
Please solve it without using the built-in JSON.stringify method. */

/**
 * @param {any} object
 * @return {string}
 */

// Solution 1: JSON-like String Concatenation
var jsonStringify = function(object) {
    if (object === null) {
      return 'null';
    }
  
    if (Array.isArray(object)) {
      const elements = object.map((element) => jsonStringify(element));
      return `[${elements.join(',')}]`;
    }

    if (typeof object === 'object') {
        const keys = Object.keys(object);
        const elements = keys.map((key) => {
            const value = jsonStringify(object[key]);
            return `"${key}":${value}`;
        });
        return `{${elements.join(',')}}`;
        }
    
    if (typeof object === 'string') {
        return `"${object}"`;
    }

    return String(object);
};

// Solution 2: Switch Case
var jsonStringify = function(object) {
    switch (typeof object) {
        case 'object':
            if (Array.isArray(object)) {
            const elements = object.map((element) => jsonStringify(element));
            return `[${elements.join(',')}]`;
            } else if (object) {
            const keys = Object.keys(object);
            const keyValuePairs = keys.map((key) => `"${key}":${jsonStringify(object[key])}`);
            return `{${keyValuePairs.join(',')}}`;
            } else {
            return 'null';
            }
        case 'string':
            return `"${object}"`;
        case 'number':
        case 'boolean':
            return String(object);
        case 'undefined':
            return 'undefined';
        case 'function':
            return object.toString();
        default:
            throw new Error(`Unknown type: ${typeof object}`);
    }
};

// Solution 3: Ternary Operator
var jsonStringify = function(object) {
    return typeof object === 'string' ? '"' + object + '"' :
        object === null || typeof object !== 'object' ? object :
        Array.isArray(object) ? '[' + object.reduce((acc, x) => acc + jsonStringify(x) + ',', '').slice(0, -1) + ']' :
        '{' + Object.entries(object).reduce((acc, x) => acc + jsonStringify(x[0]) + ':' + jsonStringify(x[1]) + ',', '').slice(0, -1) + '}';
};