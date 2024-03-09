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
* A dynamic set S is represented by a direct-address table T of length m. Describe a procedure that finds the maximum element of S. What is the worst-case performance of your procedure?

* - We should take in consideration that array might not be fully populated and there might be empty slots.
* - We should look for largest non empty slot. To do so, we need to iterate backwards and first non empty slot will be largest element (because keys correspond to values).
* - Worst case scenario, there won't be any element in the array and we would have to iterate over whole array.
* - So search would be linear O(n) where n is array's length.
*/

function maxEl(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null && arr[i] !== undefined) {
            return arr[i];
        }
    };
};
