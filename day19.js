/** Day 19: 2675. Array of Objects to Matrix
Write a function that converts an array of objects arr into a matrix m.
arr is an array of objects or arrays. 
Each item in the array can be deeply nested with child arrays and child objects. 
It can also contain numbers, strings, booleans, and null values.

The first row m should be the column names. 
If there is no nesting, the column names are the unique keys within the objects. 
If there is nesting, the column names are the respective paths in the object separated by ".".

Each of the remaining rows corresponds to an object in arr. 
Each value in the matrix corresponds to a value in an object. 
If a given object doesn't contain a value for a given column, 
the cell should contain an empty string "".

The colums in the matrix should be in lexographically ascending order. */

/**
 * @param {Array} arr
 * @return {Matrix}
 */
// Solution 1: recursive
var jsonToMatrix = function (arr) {
    const isObject = x => (x !== null && typeof x === 'object')
  
    const getKeys = (object) => {
        const isObject = x => (x !== null && typeof x === 'object')
        if (!isObject(object)) return [''];
        const result = [];
        for (const key of Object.keys(object)) {
            const childKeys = getKeys(object[key]);
            for (const childKey of childKeys) {
                result.push(childKey ? `${key}.${childKey}` : key);
            }
        }  
        return result;
    }
  
    const keysSet = arr.reduce((acc, curr) => {
    getKeys(curr).forEach((k) => acc.add(k));
    return acc;
    }, new Set());
  
    const keys = Array.from(keysSet).sort();
  
    const getValue = (obj, path) => {
        const paths = path.split('.')
        let i = 0;
        let value = obj
        while (i < paths.length) {
            if (!isObject(value)) break;
            value = value[paths[i++]]
        }
        if (i < paths.length || isObject(value) || value === undefined) return ''
        return value
    }
  
    const matrix = [keys]
    arr.forEach(obj => {
        matrix.push(keys.map(key => getValue(obj, key)))
    })
  
    return matrix
};

// Solution 2: backtracking
/**
 * @param {Array} arr
 * @return {Matrix}
 */
const flattenBacktracking = (ele, path, object, columns) => {
    if (ele != null && typeof ele == "object") { 
        Object.entries(ele).forEach(([key, value]) =>
            flattenBacktracking(value, path + (path ? "." : "") + key, object, columns)
        )
    } else { 
        object[path] = ele
        columns.add(path)
    }
    return object
    }
    var jsonToMatrix = function (arr) {
        const matrix = []
        const columns = new Set()
  
        arr = arr.map((ele) => flattenBacktracking(ele, "", {}, columns))
        matrix.push([...columns].sort())
  
        const columnsIdx = matrix[0].reduce(
        (acc, cur, idx) => ((acc[cur] = idx), acc),
        {}
        )
  
        arr.forEach((ele) => {
        matrix.push(Array(columns.size).fill(""))
        Object.entries(ele).forEach(([key, value]) => (matrix.at(-1)[columnsIdx[key]] = value))
        })
  
    return matrix
};

// Solution 3: stack
var jsonToMatrix = function (arr) {
    const colMap = new Map()
    const res = [[]]
  
    const sortCols = (matrix) => {
    // Copy the column names from the first row of the matrix and sort them using localeCompare
    const sortedColNames = matrix[0].slice().sort((a, b) => a.localeCompare(b));
  
    // Create a new sorted matrix based on the sorted column names
    const sortedMatrix = matrix.map((row) => {
        const sortedRow = [];
        for (let i = 0; i < sortedColNames.length; i++) {
            const colIndex = matrix[0].indexOf(sortedColNames[i]);
            sortedRow.push(row[colIndex]);
        }
        return sortedRow;
    });
  
    return sortedMatrix;
    };
  
  
    for (let i = 0; i < arr.length; i++) {
        const stack = [[arr[i], []]]
        res.push(Array(colMap.size).fill(""))
  
        while (stack.length > 0) {
            const [front, path] = stack.pop()
  
            if (typeof front === "object" && front !== null) {
                const keys = Object.keys(front)
  
                for (let j = keys.length - 1; j >= 0; j--) {
                    stack.push([front[keys[j]], path.concat(keys[j])])
                }
            } else if (Array.isArray(front)) {
                for (let j = front.length - 1; j >= 0; j--) {
                    stack.push([front[j], path.concat(j)])
                }
            } else {
                let pathStr = path.join('.')
  
                if (!colMap.has(pathStr)) {
                    res[0].push(pathStr)
                    colMap.set(pathStr, res[0].length - 1)
  
                    for (let j = 1; j < res.length; j++) {
                        res[j][res[0].length - 1] = ""
                    }
                }
  
                let j = colMap.get(pathStr)
                res[i + 1][j] = front
            }
        }
    }
    return sortCols(res)
};