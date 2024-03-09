/**
 * # Direct-Address Table
 * - Values are strictly numeric.
 * - Keys are the same as values.
 * - Direct-Address Table is an array where value occupies the index (key) that is equal to value.
 * - In other words, Direct-Address Table maps set of numbers to the corresponding keys in the array. And length of the array equals to or is more than number of elements in the set.
 * - <b>O(1)</b>: search, insert and delete operations have constant time complexity, because we directly access the item.
 * 
 * ## Hash Table
 * - In JS we can mimic Direct-Address Table with <b>Map</b> or an <b>object</b> with non numeric values too, but it represents more like Hash Table or something similar, but not Direct-Address Table in classical sense (because there keys are not numeric).
 * - We can use hashing function to turn non numeric values into numeric type and generate keys this way.
  */

/**
 * # Problem:
 * A dynamic set S is represented by a direct-address table T of length m. 
 * Describe a procedure that finds the maximum element of S. 
 * What is the worst-case performance of your procedure?
 * 
 * # Solution, step by step guide:
 * - Array might not be fully populated and there might be empty slots.
 * - Look for largest non empty slot. 
 *      To do so, we need to iterate backwards and first non empty slot will be largest element 
 *      (because keys correspond to values and iterating from backwards we will encounter max element sooner).
 * - Worst case scenario, there won't be any element in the array and we would have to iterate over whole array.
 * - So search would be linear O(n) where n is array's length.
 * 
 * @param {number[]} arr - The array representing a direct-address table.
 * @returns {(number|null)} The maximum element in the array, or null if the array is empty
 * or contains only null or undefined values.
*/

function maxEl(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null && arr[i] !== undefined) {
            return arr[i];
        }
    }
    return null;
};

const array = [2, 3, 4, 5, , , , ];
console.log(maxEl(array));