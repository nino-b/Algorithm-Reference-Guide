
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

//const directAddressTable = [null, null, true, true, null, true, null];

//const maxElelemt = maxEl(directAddressTable);
//console.log('Maximum element: ', maxElelemt);





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

//const newBitVector = new BitVector(7);
//newBitVector.insert(3);
//newBitVector.insert(4);
//newBitVector.insert(5);

//console.log('Inserted 3, 4 and 5: ', newBitVector);

//const searchedFor2 = newBitVector.search(2);
//console.log('Searched for number 2: ', searchedFor2);

//newBitVector.delete(4);

//console.log('Deleted number 4: ', newBitVector);





/** 
 * #Problem
 * Suggest how to implement a direct-address table in which the keys of stored elements do not need to be distinct and 
 * the elements can have satellite data. 
 * All three dictionary operations (INSERT, DELETE, and SEARCH) should run in O(1) time. 
 * (Don’t forget that DELETE takes as an argument a pointer to an object to be deleted, not a key.)
 * 
 * # My Approach:
 * - 'keys of stored elements do not need to be distinct' - we might have same keys with different (or same) satellite data.
 *      - Here emerges a problem: 
 *      we might have two distinct elements with exact same keys and satellite data 
 *      (like: element1 = {cat: 'tabby'} and element2 = {cat: 'tabby'}) and condition does not specify that we can replace 
 *      one element with another if we encounter same elements during Direct-Address Table creation process.
 *      - To distinguish two distinct elements with same keys and satellite data we can use unique identifiers.
 * - Hash Tables are form of Direct-Address Table that can store elements with same key (when two keys hash to the same index, it is called a collision).
 * - One of the way to handle collisions is to group all elements with same hash as an array, or linked list.
 * - 'DELETE takes as an argument a pointer to an object to be deleted, not a key' - elements are connected to each other with pointers (so we use linked list).
 * - So, we need to create a Hash Table that takes element with unique id as an argument and handles collisions with chaining elements as a linked list.
*/

class Node {
    static id = 0;
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
        this.id = Node.id++;
    }
}

class HashTable {
    constructor(length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
        this.elementCount = 0;
    }
    insert(node) {
        this.elementCount++;
        if (this.elementCount >= this.length / 2) {
            this.resize();
        }
        const hashIndex = this.hashGenerator(node.key);

        if (!this.hashTable[hashIndex]) {
            this.hashTable[hashIndex] = node;
        } else {
            let current = this.hashTable[hashIndex];
            while (current) {
                if (current.nextNode) {
                    current = current.nextNode;
                } else {
                    current.nextNode = node;
                    break;
                }
            }
        }
    }
    search(key, id) {
        const index = this.hashGenerator(key);
        let current = this.hashTable[index];

        if (!current) {
            return null;
        }
        while (current) {
            if (current.key === key && current.id === id) {
                return current;
            }
            current = current.nextNode;
        }
        return null; // hash does exist but there is no element with that key
    
    }
    delete(node) {
        const index = this.hashGenerator(node.key);
        let current = this.hashTable[index];

        if (!current) {
            throw new Error('Element you are trying to delete does not exist!');
        }

        if (current === node) {
            this.hashTable[index] = node.nextNode;
            return;
        } 
        while (current) {
            if (current.nextNode === node) {
                current.nextNode = node.nextNode;
                return;
            }
            current = current.nextNode;
        }
        throw new Error('Element you are trying to delete does not exist!');
    }
    hashGenerator(key) {
        let sum = 0;
        let typePrefix;
        if (typeof key === 'string') {
            typePrefix = 'STR:';
        } else if (typeof key === 'number') {
            typePrefix = 'NUM:';
        } else if (typeof key === 'object') {
            typePrefix = 'OBJ:';
            key = JSON.stringify(key);
        } else if (typeof key === 'boolean') {
            typePrefix = 'BOOL:';
        } else {
            typePrefix = 'OTHER'
        }

        const string = typePrefix + key.toString();

        for (let i = 0; i < string.length; i++) {
            sum += string.charCodeAt(i) * 3;
        }
        return sum % this.length;
    } 
    resize() {
        const oldHashTable = this.hashTable;
        this.length *= 2;
        this.hashTable = new Array(this.length).fill(null);
        this.elementCount = 0;

        oldHashTable.forEach(node => {
            while(node) {
                const nextNode = node.nextNode;
                node.nextNode = null;
                this.insert(node);
                node = nextNode;
            }
        });
    }
}

//const node1 = new Node('cat', 'siamese');
//const node2 = new Node('cat', 'siamese');
//const node3 = new Node('dog', 'black');
//const node4 = new Node('rabbit', 'white');

//const newHashTable = new HashTable(7);
//console.log('Empty Hash Table: ', newHashTable);

//newHashTable.insert(node1);
//newHashTable.insert(node2);
//newHashTable.insert(node3);

//console.log('Populated Hash Table: ', newHashTable);

//newHashTable.insert(node4);

//console.log('Resized Hash Table: ', newHashTable);

//const firstSiameseCat = newHashTable.search('cat', 1);

//console.log('Searched first instance of "siamese cat": ', firstSiameseCat);

//newHashTable.delete(node3);

//console.log('Hash Table after I deleted node3: ', newHashTable);





/** 
 * #Problem:
 * Suppose that you want to implement a dictionary by using direct addressing on a huge array. That is, if the array size is m and the 
 * dictionary contains at most n elements at any one time, then m >> n. At the start, the array entries may contain garbage, and initializing 
 * the entire array is impractical because of its size. Describe a scheme for implementing a direct-address dictionary on a huge array. Each 
 * stored object should use O(1) space; the operations SEARCH, INSERT, and DELETE should take O(1) time each; and initializing the data 
 * structure should take O(1) time. (Hint: Use an additional array, treated somewhat like a stack, whose size is the number of keys actually 
 * stored in the dictionary, to help determine whether a given entry in the huge array is valid or not.) 
 * 
 * # My Approach:
 * - 'implement a dictionary by using direct addressing on a huge array': implement a direct address array that holds dictionary values.
 * - 'array size is m and the dictionary contains at most n elements at any one time, then m >> n': implement an array with a length of m, 
 * which is larger than actual number of entries in the array - n.
 * - Because m > n, and we don't what is the difference between those two. E.g. m = 10 000 and n = 10, it will be waste of space and time to 
 * create array with length of m and initialize values (like null) for the whole array if we won't use initialized space.
 * - To avoid that problem, initialize a Direct-Address array with length of m but won't initialize its values.
 * - I will use Set as key holder and will hold indices (from main array) that are actually occupied. This is important, because if we 
 * insert value 'undefined' at index (example location) 346 in the main array and then directly try to retrieve data from index 346, 
 * we might not distingush actually inserted 'undefined' from the result unsefined if the value was absent.
 */

class DirectAddressDictionary {
    constructor(mLength) {
        this.mainArr = new Array(mLength);
        this.keySet = new Set();
    }
    insert(key, value) {
        if (!this.keySet.has(key)) {
            this.mainArr[key] = value;
            this.keySet.add(key);
        }
    }
    search(key) {
        if (this.keySet.has(key)) {
            return this.mainArr[key];
        }
        return null;
    }
    delete(key) {
        if (this.keySet.has(key)) {
            this.mainArr[key] = undefined;
            this.keySet.delete(key);
        }
    }
}