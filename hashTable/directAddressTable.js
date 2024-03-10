/** 
 * Suggest how to implement a direct-address table in which the keys of stored elements do not need to be distinct and the elements can have satellite data. All three dictionary operations (INSERT, DELETE, and SEARCH) should run in O(1) time. (Don’t forget that DELETE takes as an argument a pointer to an object to be deleted, not a key.)
*/

/** 
 * Suppose that you want to implement a dictionary by using direct addressing on a huge array. That is, if the array size is m and the dictionary contains at most n elements at any one time, then m >> n. At the start, the array entries may contain garbage, and initializing the entire array is impractical because of its size. Describe a scheme for implementing a direct-address dictionary on a huge array. Each stored object should use O(1) space; the operations SEARCH, INSERT, and DELETE should take O(1) time each; and initializing the data structure should take O(1) time. (Hint: Use an additional array, treated somewhat like a stack, whose size is the number of keys actually stored in the dictionary, to help determine whether a given entry in the huge array is valid or not.) 
 */

/** 
 * # Direct-Address Table
 * 
 * - Values are strictly numeric.
 * - Keys are the same as values.
 * - Direct-Address Table is an array where value occupies the index (key) that is equal to value.
 * - In other words, Direct-Address Table maps set of numbers to the corresponding keys in the array. And length of the array equals to or is more than number of elements in the set.
 * - O(1): search, insert and delete operations have constant time complexity, because we directly access the item.
 * 
 * ## Hash Table
 * - In JS we can mimic Direct-Address Table with EMap or an object with non numeric values too, but it represents more like Hash Table or something similar, but not Direct-Address Table in classical sense (because there keys are not numeric).
 * - We can use hashing function to turn non numeric values into numeric type and generate keys this way.
 * @namespace DirectAddressTable
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
 *      To do so, we need to iterate backwards and find first non empty slot  
 *      (because keys correspond to values and by iterating backwards, we will encounter the maximum element sooner).
 * - Worst case scenario, there won't be any element in the array and we would have to iterate over whole array.
 * - So search would be linear <b>O(n)</b> where n is array's length.
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





/** 
 * #Problem:
 * A bit vector is simply an array of bits (each either 0 or 1). A bit vector of length m takes much less space than an array of m pointers. Describe how to use a bit vector to represent a dynamic set of distinct elements drawn from the set {0, 1, ..., m − 1} and with no satellite data. Dictionary operations should run in O(1) time.
 * 
 * # Solution, step by step guide:
 * - There is a set of numbers, so we can use Direct-Address Table (values will correspond indices).
 * - Bit vector - it is an arry where if element is present, respective value to corresponding index will be 1 (true) and if does not exist - 0 (false);
 * - To solve a problem:
 *      - we need an array length of <i>m </i>.
 *      - If a value is present in the set of numbers, we set the bit at the corresponding index to 1 (true), and all other bits are set to 0 (false) to indicate their absence (for example, when there are gaps in the array).
 * - Dictionary operations (insert, search, delete) will be constant (O(1)) because values correspond to indices so we can directly access an element.
 * #Advantages of bit vector:
 * - Takes less space than regular array;
 * 
 * #Disadvantage:
 * - Can only be used with unique values;
 * 
 * #Example:
 * If we have a set of elements {1, 2, 3, 5}, we can generate a bit vector: [0, 1, 1, 1, 0, 1];
*/

class BitVector {
    constructor(length) {
        this.vector = new Array(length).fill(0);
    }

    insert(num) {
        this.vector[num] = 1;
    }
    search(num) {
        return this.vector[num] === 1;
    }
    delete(num) {
        this.vector[num] = 0;
    }
}