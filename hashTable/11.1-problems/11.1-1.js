
/** 
 * # Direct-Address Table
 * 
 * - Direct-Address Table is an array where value occupies the index (key) that is equal to value.
 * - In other words, Direct-Address Table maps set of numbers to the corresponding keys in the array. And length of the array equals to or is more than number of elements in the set.
 * - O(1): search, insert and delete operations have constant time complexity, because we directly access the item.
 * 
 * ## Hash Table
 * - In JS we can mimic Direct-Address Table with Map or an object with non numeric values too.
 * - We can use hashing function to turn non numeric values into numeric type and generate keys this way.
 * 
 * ##Advantage:
 * - Time compexity is constant (O(1)), so dictionary operations (insert, search, delete) run in constant time.
 * 
 * ##Disadvantage:
 * - Not space efficient. A large table is created that has slots for each possible keys. And if actual keys are much less than 
 * slots for possible keys, than space is wasted.
 * 
 * @namespace DirectAddressTable
 */

/**
 * # Problem:
 * A dynamic set S is represented by a direct-address table T of length m. 
 * Describe a procedure that finds the maximum element of S. 
 * What is the worst-case performance of your procedure?
 * 
 * # My Approach:
 * - Array might not be fully populated and there might be empty slots.
 * - Look for largest non empty slot. 
 *      To do so, we need to iterate backwards and find first non empty slot  
 *      (because keys correspond to values and by iterating backwards, we will encounter the maximum element sooner).
 * - Worst case scenario, there won't be any element in the array and we would have to iterate over whole array.
 * - So search would be linear <b>O(n)</b> where n is array's length.
 * 
*/

function maxEl(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null && arr[i] !== undefined) {
            return i;
        }
    }
    return null;
};

const directAddressTable = [null, null, true, true, null, true, null];

const maxElelemt = maxEl(directAddressTable);
console.log('Maximum element: ', maxElelemt);