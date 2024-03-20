
/** 
 * #Problem:
 * A bit vector is simply an array of bits (each either 0 or 1). A bit vector of length m takes much less space than an array of m pointers. Describe how to use a bit vector to represent a dynamic set of distinct elements drawn from the set {0, 1, ..., m − 1} and with no satellite data. Dictionary operations should run in O(1) time.
 * 
 * # My Approach:
 * - There is a set of numbers, so we can use Direct-Address Table (values will correspond indices).
 * - Bit vector - it is an arry where if element is present, respective value to corresponding index will be 1 (true) and if does not exist - 0 (false);
 * - To solve a problem:
 *      - we need an array length of <i>m </i>.
 *      - If a value is present in the set of numbers, we set the bit at the corresponding index to 1 (true), and all other bits are set to 0 (false) to indicate their absence (for example, when there are gaps in the array).
 * - Dictionary operations (insert, search, delete) will be constant (O(1)) because values correspond to indices so we can directly access an element.
 * #Advantages of bit vector:
 * - Takes less space than regular array;
 * 
 * #Disadvantages:
 * - Can only be used with unique values;
 * - Elements can't have satellite data.
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

const newBitVector = new BitVector(7);
newBitVector.insert(3);
newBitVector.insert(4);
newBitVector.insert(5);

console.log('Inserted 3, 4 and 5: ', newBitVector);

const searchedFor2 = newBitVector.search(2);
console.log('Searched for number 2: ', searchedFor2);

newBitVector.delete(4);

console.log('Deleted number 4: ', newBitVector);